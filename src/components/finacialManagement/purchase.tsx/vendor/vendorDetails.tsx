

const VendorProfile = () => {
  const documentation = [
    {
      customerName: 'CAC Certification',
      customerID: 'Dalernet CAC Documentation.pdf',
      amount: 'February 9, 2024',
    },
    {
        customerName: 'CAC Certification',
        customerID: 'Dalernet CAC Documentation.pdf',
        amount: 'February 9, 2024',
      },
      {
        customerName: 'CAC Certification',
        customerID: 'Dalernet CAC Documentation.pdf',
        amount: 'February 9, 2024',
      },
      {
        customerName: 'CAC Certification',
        customerID: 'Dalernet CAC Documentation.pdf',
        amount: 'February 9, 2024',
      },
  ];

  const financeButtons = [
    "Purchase Order", "Purchase Invoice", "Reoccurring Order",
    "Bill Payment (Transaction)", "Purchase Returns", "Debit Note"
  ];

  return (
    <div className="p-4 lg:p-8 w-full mx-auto space-y-6">
      {/* Section Box */}
      <div className="bg-white p-6 rounded-md shadow-sm space-y-6">

        {/* Company Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem label="Registered Company Name" value="Dako Enterprise" />
            <InfoItem label="Vendor ID" value="187611" />
            <InfoItem label="Vendor Category" value="Category 01" />
            <InfoItem label="RC Number" value="878848" />
            <InfoItem label="Company Size" value="20 - 50 Employees" />
            <InfoItem label="Tax Identification Number (TIN)" value="24785" />
            <InfoItem label="Business Address" value="Lagos" />
            <InfoItem label="State/City" value="Lagos" />
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem label="Bank Name" value="Dako Enterprise" />
            <InfoItem label="Bank Code" value="187611" />
            <InfoItem label="Account Name" value="Category 01" />
            <InfoItem label="BVN" value="24785" />
            <InfoItem label="Account Number" value="2478456732" />
            <InfoItem label="Swift Code" value="5455" />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem label="Company Website" value="Dako Enterprise" />
            <InfoItem label="Company Role" value="187611" />
            <InfoItem label="Email Address" value="Category 01" />
            <InfoItem label="Account Manager Name" value="24785" />
            <InfoItem label="Mobile Number" value="2478456732" />
            <InfoItem label="Other Numbers" value="6465" />
          </div>
        </div>

        {/* Documentation Table */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Documentation</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Customer name</th>
                  <th className="px-4 py-2">Customer ID</th>
                  <th className="px-4 py-2">Invoice Amount</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {documentation.map((doc, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{doc.customerName}</td>
                    <td className="px-4 py-2">{doc.customerID}</td>
                    <td className="px-4 py-2">{doc.amount}</td>
                    <td className="px-4 py-2 text-orange-500 hover:underline cursor-pointer">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vendor Finances Buttons */}
      <div className="bg-white p-6 rounded-md shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {financeButtons.map((label, i) => (
          <button
            key={i}
            className="w-full bg-orange-100 hover:bg-orange-200 text-orange-500 py-2 px-4 rounded-md text-sm font-medium text-left"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
// @ts-ignore
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default VendorProfile;
