import BackupIcon from '@mui/icons-material/Backup';
import './App.css'
import { useState, useRef, useCallback } from 'react';
function App() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Remove file from list
  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading files:', files);
    alert(`${files.length} file(s) uploaded successfully!`);
    setFiles([]); // Clear files after upload
  };
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mb-4">< BackupIcon sx={{ fontSize: '80px' }} className='text-green-500 text-[50px]'></BackupIcon></div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Drag & Drop Files Here
          </h3>
          {/* <p className="text-gray-500 mb-4">or</p> */}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
           {/* Conditional rendering of buttons */}
           {files.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">or</p>
              <button
                type="button"
                onClick={handleButtonClick}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Browse Files
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Upload {files.length} File{files.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>

        {/* File preview */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Selected Files</h4>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="cursor-pointer text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default App
