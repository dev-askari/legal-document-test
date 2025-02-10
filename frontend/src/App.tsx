import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const [documents, setDocuments] = useState<
    {
      fileName: string;
      id: string;
      uploadDate: string;
    }[]
  >([]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/documents");
      const fetchedDocuments = response.data;

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = (id: string, fileName: string) => {
    setDocuments((prev) => ({
      ...prev,
      [id]: { fileName, uploadDate: new Date().toLocaleDateString() },
    }));
  };

  return (
    <div className="app">
      <Dashboard
        documents={documents}
        onUpload={handleUpload}
        fetchDocuments={fetchDocuments}
      />
    </div>
  );
};

export default App;
