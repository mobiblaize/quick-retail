import { useNavigate } from "react-router-dom"; 

const reports = [
  { label: "Sales Processing Report", path: "sales-processing" },
  { label: "Product Management Report", path: "product-management" },
  { label: "Returns & Refunds Report", path: "returns-refunds" },
];

const ReportSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {reports.map((report) => (
          <button
            key={report.path}
            onClick={() =>
                navigate("/dashboard/reportsPages/report-date-input", {
                  state: {
                    reportType: report.path,
                    reportLabel: report.label,
                  },
                })
              }
            className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition px-6 py-4 rounded-lg shadow-sm text-gray-700 text-sm font-medium cursor-pointer"
          >
            {report.label}
            <span className="text-lg">➔</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportSelection;
