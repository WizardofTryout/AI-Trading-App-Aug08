import React, { useRef } from 'react';
import { uploadPineScript } from '../services/api';

const PineScriptPanel: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPineScript(file);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4 text-font">Pine Script Editor</h2>
        <textarea className="w-full h-full bg-gray-900 text-white p-2 border border-gray-700 rounded"></textarea>
      </div>
      <div className="p-2 border-t border-gray-700">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pine"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUploadClick}
        >
          Upload Pine Script
        </button>
      </div>
    </div>
  );
};

export default PineScriptPanel;
