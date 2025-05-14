//@ts-ignore
import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import * as React from "react";

export default function FileUploader() {
  const [uploadBlocks, setUploadBlocks] = useState([
    { id: Date.now(), fileName: "No upload / Attachment" },
  ]);

  //@ts-ignore
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setUploadBlocks((prev) =>
        prev.map((block) =>
          block.id === id ? { ...block, fileName: file.name } : block
        )
      );
    }
  };

  const addAnotherUpload = () => {
    setUploadBlocks((prev) => [
      ...prev,
      { id: Date.now(), fileName: "No upload / Attachment" },
    ]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Image or Document
      </label>

      {uploadBlocks.map((block) => {
     const fileInputRef = React.createRef<HTMLInputElement>();

        return (
          <div
            key={block.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                <FileText size={16} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-500 truncate max-w-[150px]">
                {block.fileName}
              </span>
            </div>
            {/* desktop */}
<div className="md:block hidden">
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              
              className="px-4 py-1.5 text-sm font-medium text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50"
            >
              Click to Upload
            </button>
            </div>
            {/* mobile */}
            <div className="lg:hidden">
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              
              className="px-4 py-1.5 text-sm font-medium text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50"
            >
              Upload
            </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, block.id)}
              className="hidden"
            />
          </div>
        );
      })}

      {/* + Add Another */}
      <div
        className="flex items-center gap-1 mt-2 cursor-pointer text-orange-500 text-sm font-medium "
        onClick={addAnotherUpload}
      >
        <span className="text-lg font-bold">+</span>
        <span>Add Another</span>
      </div>
    </div>
  );
}
