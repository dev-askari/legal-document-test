import React, { useState } from "react";
import UploadModal from "./UploadModal";
import DocumentDetailsModal from "./DocumentDetailsModal";

interface Props {
  id: string;
  document?: {
    fileName?: string;
    id?: string;
    uploadDate?: string;
  };
  onUpload: (id: string, fileName: string) => void;
  fetchDocuments: () => void;
}

const DocumentBox: React.FC<Props> = ({
  id,
  document,
  onUpload,
  fetchDocuments,
}) => {
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <>
      <div
        className="document-box"
        onClick={() => (
          document ? setIsDetailsOpen(true) : setIsUploadOpen(true),
          setTitle(id as string)
        )}
      >
        <h3>{id}</h3>
        {document && (
          <div>
            <p>{document.fileName}</p>
            <p>{document.uploadDate}</p>
          </div>
        )}
      </div>

      {isUploadOpen && (
        <UploadModal
          isOpen={isUploadOpen}
          onClose={() => {
            setIsUploadOpen(false);
            console.log(isUploadOpen, "close");
          }}
          onUpload={(fileName) => onUpload(id, fileName)}
          title={title}
          fetchDocuments={fetchDocuments}
        />
      )}
      {document && (
        <DocumentDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          documentName={document.id as string}
        />
      )}
    </>
  );
};

export default DocumentBox;
