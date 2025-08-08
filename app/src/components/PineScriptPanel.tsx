import React, { useRef, useState } from 'react';
import { uploadPineScript } from '../services/api';

const PineScriptPanel: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pineScriptCode, setPineScriptCode] = useState(`//@version=5
strategy("My Strategy", overlay=true)

// Beispiel Pine Script Code
length = input.int(14, title="RSI Length")
rsi = ta.rsi(close, length)

// Long Entry
if rsi < 30
    strategy.entry("Long", strategy.long)

// Long Exit
if rsi > 70
    strategy.close("Long")
`);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const text = await file.text();
        setPineScriptCode(text);
        await uploadPineScript(file);
        console.log('Pine Script uploaded successfully');
      } catch (error) {
        console.error('Error uploading Pine Script:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSaveScript = async () => {
    setIsUploading(true);
    try {
      // Create a virtual file from the textarea content
      const blob = new Blob([pineScriptCode], { type: 'text/plain' });
      const file = new File([blob], 'strategy.pine', { type: 'text/plain' });
      await uploadPineScript(file);
      console.log('Pine Script saved successfully');
    } catch (error) {
      console.error('Error saving Pine Script:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background min-h-0 max-h-[calc(100vh-320px)]">
      <div className="border-b border-accent p-3 sm:p-4 flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-bold text-font">Pine Script Editor</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Write or upload your Pine Script trading strategy</p>
      </div>
      
      <div className="flex-1 p-3 sm:p-4 min-h-0 overflow-hidden">
        <textarea 
          className="w-full h-full bg-gray-900 text-green-400 p-3 sm:p-4 border border-gray-700 rounded font-mono text-sm resize-none focus:outline-none focus:border-blue-500 min-h-[150px] max-h-[calc(100vh-500px)]"
          value={pineScriptCode}
          onChange={(e) => setPineScriptCode(e.target.value)}
          placeholder="Enter your Pine Script code here..."
          spellCheck={false}
        />
      </div>
      
      <div className="border-t border-accent p-3 sm:p-4 flex-shrink-0">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pine,.txt,.ps"
            aria-label="Upload Pine Script file"
          />
          
          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center gap-2 min-w-[120px] sm:min-w-[140px] justify-center text-sm"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            📁 Upload
          </button>
          
          <button
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center gap-2 min-w-[120px] sm:min-w-[140px] justify-center text-sm"
            onClick={handleSaveScript}
            disabled={isUploading}
          >
            💾 Save & Compile
          </button>
          
          {isUploading && (
            <span className="text-gray-400 flex items-center">
              Processing...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PineScriptPanel;
