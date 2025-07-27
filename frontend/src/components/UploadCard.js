import { useRef } from "react";

export default function UploadCard({ onUpload, uploading }) {
  const fileInputRef = useRef();

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl text-center w-96 transition-all">
      {/* Icon */}
      <div className="text-blue-500 text-4xl mb-4 animate-bounce">⬆️</div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        Upload PDF to start chatting
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Click or drag and drop your file here
      </p>

      {/* Button */}
      <div>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Choose PDF"}
        </button>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => onUpload(e.target.files[0])}
        />
      </div>

      {/* File name preview */}
      {uploading && (
        <div className="mt-4 text-sm text-gray-600 animate-pulse">
          Uploading your file...
        </div>
      )}
    </div>
  );
}
