import { Barchat } from "../../../assets/svg";
import frame from "../../../assets/images/frame1.png";

const PointOfSales = () => {
  const sales = [
    {
      icon: Barchat,
      label: "Sales Processing",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Product and inventory management",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Returns log",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Customer management",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },

    {
      icon: Barchat,
      label: "Discounts/Promo and so much more...",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
  ];

  const purchase = [
    {
      icon: Barchat,
      label: "Inventory Tracking",
    },
    {
      icon: Barchat,
      label: "Purchase Invoice",
    },
    {
      icon: Barchat,
      label: "Supplier Management",
    },
  ]

  const finance = [
    {
      icon: Barchat,
      label: "Sales and Purchase Invoice",
    },
    {
      icon: Barchat,
      label: "Journal Entry",
    },
    {
      icon: Barchat,
      label: "Account Reconciliation",
    },
    {
      icon: Barchat,
      label: "Transaction Management",
    },
  ]

  const asset = [
    {
      icon: Barchat,
      label: "Asset Request and Register",
    },
    {
      icon: Barchat,
      label: "Procurement",
    },
    {
      icon: Barchat,
      label: "Reports",
    },
  ]

  return (
    <main className="border-[#F8E2D8] border-t">
      <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col h-full">
            <div>
              <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                Point of Sales System
              </h2>
              <p className="mt-4 text-[#667085] font-sans">
                This covers sales, inventory, products, discounts, customer management and
                so many other in-store functionalities needed for businesses to make and manage sales
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-6">
              <div className="text-[#667085] font-sans">Some features include:</div>
              {sales.map((item, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <item.icon height="20" width="20" />
                  <p className="text-sm font-clash-medium text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="h-full flex justify-center lg:justify-end">
            <img src={frame} alt="frame" className="w-full h-[500px] object-contain" />
          </div>
        </div>
      </section>


      {/* <section className="border-t border-b border-[#F8E2D8]"> */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="h-full flex justify-center lg:justify-end">
            <img src={frame} alt="frame" className="w-full h-[500px] object-contain" />
          </div>
          <div className="flex flex-col">
            <div>
              <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                Procurement  System Functionalities.
              </h2>
              <p className="mt-4 text-[#667085] font-sans">
                The procurement app in the ERP streamlines the purchasing process
                by integrating with various modules, including inventory management,
                supplier management, and order tracking, ensuring efficient procurement
                operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-6">
              <div className="text-[#667085] font-sans">Some features include:</div>
              {purchase.map((item, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <item.icon height="20" width="20" />
                  <p className="text-sm font-clash-medium text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* </section> */}

      <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div>
              <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                Finance System Functionalities.
              </h2>
              <p className="mt-4 text-[#667085] font-sans">
                The covers core accounting functions, enabling efficient tracking of sales,
                expenses, and profits. It simplifies financial reporting, inventory management,
                and customer transactions, ensuring that retailers can focus on growth while
                maintaining accurate financial oversight.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {finance.map((item, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <item.icon height="20" width="20" />
                  <p className="text-sm font-clash-medium text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full flex justify-center lg:justify-end">
            <img src={frame} alt="frame" className="w-full h-[500px] object-contain" />
          </div>
        </div>
      </section>

      {/* <section className="border-t border-b border-[#F8E2D8]"> */}
        <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="h-full flex justify-center lg:justify-end">
              <img src={frame} alt="frame" className="w-full h-[500px] object-contain" />
            </div>
            <div className="flex flex-col">
              <div>
                <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                  Asset Management System Features.
                </h2>
                <p className="mt-4 text-[#667085] font-sans">
                  This simplifies asset management for retail businesses. With real-time
                  updates and user-friendly dashboards, it boosts efficiency and keeps your
                  assets in check. Say goodbye to manual tracking and embrace smarter retail
                  management!
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                {asset.map((item, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <item.icon height="20" width="20" />
                    <p className="text-sm font-clash-medium text-gray-800">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      {/* </section> */}
    </main>
  );
};

export default PointOfSales;
