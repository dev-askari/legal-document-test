import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

interface Extraction {
  extraction: string;
  page: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

const DocumentDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  documentName,
}) => {
  const pdfUrl = `http://localhost:5000/uploads/${documentName}`;
  const [numPages, setNumPages] = useState<number>(0);
  const [extractions, setExtractions] = useState<Extraction[]>([]);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  useEffect(() => {
    if (numPages > 0) {
      const numberOfExtractions = 3;
      const mockExtractions: Extraction[] = [];
      for (let i = 1; i <= numberOfExtractions; i++) {
        const randomPage = Math.floor(Math.random() * numPages) + 1;
        mockExtractions.push({
          extraction: `Extraction ${i}`,
          page: randomPage,
        });
      }
      setExtractions(mockExtractions);
    }
  }, [numPages, documentName]);

  const scrollToPage = (pageNumber: number) => {
    const pageElement = pageRefs.current[pageNumber];
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      contentLabel="Document Details Modal"
      style={{
        content: {
          inset: "5%",
          padding: "20px",
          overflow: "hidden",
        },
      }}
      className="detail-modal"
    >
      <div className="detail-modal-content">
        <div className="detail-head">
          <h2>{documentName}</h2>
          <button
            onClick={onClose}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            X
          </button>
        </div>

        <div className="pdf-sec">
          <div
            style={{
              flex: 1,
              height: "100%",
              minHeight: "500px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
            >
              {Array.from(new Array(numPages), (el, index) => {
                const pageNumber = index + 1;
                return (
                  <div
                    key={pageNumber}
                    ref={(el: any) => (pageRefs.current[pageNumber] = el)}
                    style={{ marginBottom: "20px" }}
                  >
                    <Page pageNumber={pageNumber} width={600} />
                  </div>
                );
              })}
            </Document>
          </div>

          <div className="extractions">
            <h3>Extractions</h3>
            {extractions.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <p>
                  {item.extraction} – Page {item.page}
                </p>
                <button
                  onClick={() => scrollToPage(item.page)}
                  style={{ cursor: "pointer" }}
                >
                  Go To Page
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentDetailsModal;
