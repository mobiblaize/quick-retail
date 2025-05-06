import React from "react";

const ViewPDF = () => {
  // Replace this with your actual PDF URL
  const fileUrl = "/files/ProductDetails.pdf";

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <iframe
        src={fileUrl}
        className="w-full h-[80vh] mb-4"
        title="PDF Viewer"
      />
      <a
        href={fileUrl}
        download
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Download PDF
      </a>
    </div>
  );
};

export default ViewPDF;
