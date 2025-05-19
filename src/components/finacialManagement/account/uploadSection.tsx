export default function UploadBox() {
    return (
        <>
        <h2 className="mt-2 font-semibold">UPLOAD CHART of ACCOUNT TEMPLATE</h2>
      <div className="mt-6 border border-dashed border-gray-400 rounded-lg p-6 text-center w-[300px]">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-[#F16722] hover:text-blue-800"
        >
          Click to upload or drag and drop<br />
          <span className="text-gray-500 text-xs">(CSV, XLSX | max. 4MB)</span>
          <input id="file-upload" type="file" className="hidden" />
        </label>
      </div>
      </>
    );
  }
  