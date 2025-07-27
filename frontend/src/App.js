import { useState } from "react";
import { Document, Page } from "react-pdf";
import UploadCard from "./components/UploadCard";
import ChatSidebar from "./components/ChatSidebar";
import axios from "axios";

export default function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      setPdfFile(file);
      setPages(res.data.pages);
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100">
      {!pdfFile ? (
        <div className="flex h-full justify-center items-center">
          <UploadCard onUpload={handleUpload} uploading={uploading} />
        </div>
      ) : (
        <div className="flex h-full">
          <ChatSidebar totalPages={pages.length} />
          {pdfFile && (
            <Document file={pdfFile}>
              {Array.from(new Array(pages.length), (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} />
              ))}
            </Document>
          )}
        </div>
      )}
    </div>
  );
}
