import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors'

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors())

// File Storage Configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// In-memory storage for mock extractions and documents
const mockExtractions: Record<string, { extraction: string; page: number }[]> = {};
const uploadedDocuments: Record<string, { fileName: string; uploadDate: string }> = {};

// Routes

// Upload a document
app.post('/upload', upload.single('file'), (req: any, res: any) => {
  const file = req.file;
  if (!file || !file.mimetype.includes('pdf')) {
    return res.status(400).json({ error: 'Only PDF files are allowed.' });
  }

  const documentId = file.filename;
  const uploadDate = new Date().toLocaleDateString();

  // Store mock extractions
  mockExtractions[documentId] = Array.from({ length: 5 }, (_, i) => ({
    extraction: `Extraction ${i + 1}`,
    page: Math.floor(Math.random() * 10) + 1,
  }));

  // Store document metadata
  uploadedDocuments[documentId] = {
    fileName: file.originalname,
    uploadDate,
  };

  res.json({ documentId, fileName: file.originalname, uploadDate });
});

// Get all documents
app.get('/documents', (req: any, res: any) => {
  const documents = Object.keys(uploadedDocuments).map((documentId) => ({
    id: documentId,
    ...uploadedDocuments[documentId],
  }));
  res.json(documents);
});

// Get mock extractions for a specific document
app.get('/extractions/:documentId', (req: any, res: any) => {
  const { documentId } = req.params;
  const extractions = mockExtractions[documentId];
  if (!extractions) {
    return res.status(404).json({ error: 'Document not found.' });
  }
  res.json(extractions);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});