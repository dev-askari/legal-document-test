import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import FileInput from "./FileInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileName: string) => void;
  title: string;
  fetchDocuments: () => void;
}

const UploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onUpload,
  title,
  fetchDocuments,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onUpload(response.data.fileName);
      fetchDocuments();
      onClose();
    } catch (err) {
      setError(`${err} Failed to upload file.`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Upload Modal"
      className="upload-modal"
    >
      <div className="upload-modal-content">
        <h2>Upload Document ({title})</h2>
        <div className="upload-input">
          <FileInput setFile={setFile} apiError={error} />
        </div>
        <div className="button">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
