import React from "react";
import DocumentBox from "../components/DocumentBox";

interface IProps {
  documents: {
    fileName: string;
    id: string;
    uploadDate: string;
  }[];
  onUpload: (id: string, fileName: string) => void;
  fetchDocuments: () => void;
}

const Dashboard: React.FC<IProps> = ({
  documents,
  onUpload,
  fetchDocuments,
}) => {
  const boxes = Array.from({ length: 9 }, (_, i) => `Legal Document ${i + 1}`);
  return (
    <div className="dashboard">
      <header>
        <span>📄 Legal Document Manager</span>
      </header>
      <div className="content flex-list">
        {boxes.map((box, index) => (
          <DocumentBox
            key={box}
            id={box}
            document={documents[index]}
            onUpload={onUpload}
            fetchDocuments={fetchDocuments}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
