import React, { useState } from "react";

interface FileInputProps {
  setFile?: (file: File | null) => void;
  apiError?: string;
}

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

const FileInput: React.FC<FileInputProps> = ({ setFile, apiError }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string>(apiError || "");

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take the first file

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only PDF, Excel, and CSV files are allowed.");
      setFile?.(null);
      setFileName(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB.");
      setFile?.(null);
      setFileName(null);
      return;
    }

    setError("");
    setFileName(file.name);
    setFile?.(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("dragging");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("dragging");
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("dragging");
    handleFiles(event.dataTransfer.files);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  return (
    <div className="file-upload-container">
      <div
        className="file-box"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 16l-4-4-4 4M12 12v9M21 16a5 5 0 00-3-9h-1a7 7 0 00-13 3 4 4 0 000 8h16"></path>
        </svg>
        <p>Upload File</p>
        <p className="file-names">
          {fileName || "PDF, XLSX, XLS, CSV (Max 10MB)"}
        </p>
        {error && <p className="error-message">{error}</p>}

        <input
          type="file"
          className="file-input"
          accept=".pdf, .xls, .xlsx, .csv"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FileInput;
