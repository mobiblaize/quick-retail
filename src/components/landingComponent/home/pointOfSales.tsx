import { Barchat } from "../../../assets/svg";
import frame from "../../../assets/images/frame1.png";
import frame2 from "../../../assets/images/frame2.png";
import frame3 from "../../../assets/images/frame3.png";

const PointOfSales = () => {
  const sales = [
    {
      icon: Barchat,
      label: "Sales Invoice",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Receipt",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Receipt",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
    {
      icon: Barchat,
      label: "Receipt",
      description: "Manag, Create, Share, Sales Invoice with customers.",
    },
  ];

  return (
    <main className="border-[#F8E2D8] border-t">
      <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div>
              <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                Point of Sales System
              </h2>
              <p className="mt-4 text-[#667085] font-sans">
                The point of sales system has sub-modules within the ERP that
                covers safes, inventory, products, discounts, customer
                management and so many other in-store functionalities needed for
                business
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {sales.map((item, i) => (
                <div className="flex gap-3 items-start" key={i}>
                  <item.icon />
                  <div className="flex flex-col">
                    <p className="text-sm font-clash-medium text-gray-800">
                      {item.label}
                    </p>
                    <span className="text-sm text-[#667085] mt-1">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <img src={frame} alt="frame" className="max-w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[#F8E2D8]">
        <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start order-first">
              <img src={frame2} alt="frame" className="max-w-full h-auto" />
            </div>
            <div className="flex flex-col">
              <div>
                <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                  Purchase System Functionalities
                </h2>
                <p className="mt-4 text-[#667085] font-sans">
                  The sales system functionality within the finance module is
                  connected to three (3) sub-modules within the ERP, namely, the
                  instore, Customer Relation System and E-Commerce.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                {sales.map((item, i) => (
                  <div className="flex gap-3 items-start" key={i}>
                    <item.icon />
                    <div className="flex flex-col">
                      <p className="text-sm font-clash-medium text-gray-800">
                        {item.label}
                      </p>
                      <span className="text-sm text-[#667085] mt-1">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col">
            <div>
              <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                Finance System Functionalities.
              </h2>
              <p className="mt-4 text-[#667085] font-sans">
                The sales system functionality witin the finance module is
                connected to three (3) sub-modules within the ERP, namely the
                Instore, Customer Relation System and E-Commerce.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {sales.map((item, i) => (
                <div className="flex gap-3 items-start" key={i}>
                  <item.icon />
                  <div className="flex flex-col">
                    <p className="text-sm font-clash-medium text-gray-800">
                      {item.label}
                    </p>
                    <span className="text-sm text-[#667085] mt-1">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <img src={frame3} alt="frame" className="max-w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[#F8E2D8]">
        <section className="py-8 sm:py-12 max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start order-first">
              <img src={frame3} alt="frame" className="max-w-full h-auto" />
            </div>
            <div className="flex flex-col">
              <div>
                <h2 className="text-[#101828] text-2xl sm:text-3xl font-clash-medium">
                  Asset SystemFunctionality
                </h2>
                <p className="mt-4 text-[#667085] font-sans">
                  The sales system functionality within the finance module is
                  connected to three (3) sub-modules within the ERP, namely, the
                  instore, Customer Relation System and E-Commerce.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                {sales.map((item, i) => (
                  <div className="flex gap-3 items-start" key={i}>
                    <item.icon />
                    <div className="flex flex-col">
                      <p className="text-sm font-clash-medium text-gray-800">
                        {item.label}
                      </p>
                      <span className="text-sm text-[#667085] mt-1">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default PointOfSales;
