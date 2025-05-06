import { useRef, useState } from "react";
import { CheckCircle, FileText, UploadCloud } from "lucide-react";
import csv from "../../../../assets/images/excelimg.png";

const AddBulkUploadDoc = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only CSV or XLSX files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 4 * 1024 * 1024) {
      setError("File size must be under 4MB.");
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setUploadProgress(0);
    simulateUpload();
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          FOLLOW THE INSTRUCTIONS TO UPLOAD BULK PRODUCTS
        </h3>

        <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
          <img
            src={csv}
            alt="csvfile"
            width={800}
            height={400}
            className="w-full object-contain"
          />
        </div>

        <ul className="text-gray-700 text-sm space-y-3 list-disc pl-5">
          <li>
            Download the product template CSV file{" "}
            <a
              href="/csv/bulk_product_template.csv"
              download
              className="text-blue-600 font-medium underline"
            >
              Download here
            </a>
          </li>
          <li>Enter product details according to the columns provided</li>
          <li>Preview your CSV file for mistakes and errors</li>
          <li>Save the CSV file to your device</li>
          <li>Upload file to Quick Retail bulk product upload and submit</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full mt-[3em]">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          UPLOAD CSV FILE
        </h3>

        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition hover:bg-gray-50 w-full md:w-[20%]"
            onClick={handleClickUpload}
          >
            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-orange-600 font-medium">
              Click to upload
            </p>
            <p className="text-sm text-gray-500">or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">CSV, XLSX (max. 4MB)</p>
          </div>
        ) : (
          <div className="flex items-center gap-4 border border-gray-200 rounded-md px-4 py-3 bg-gray-50 w-[30%]">
            <FileText className="text-orange-500 w-6 h-6" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-right text-gray-500 mt-1">
                {uploadProgress}%
              </p>
            </div>
            {uploadProgress === 100 && (
              <CheckCircle className="text-orange-600 w-5 h-5" />
            )}
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
        )}

        <input
          type="file"
          accept=".csv, .xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AddBulkUploadDoc;
