// import { ChevronRight } from "lucide-react";
// import { Point } from "../../../assets/svg";

// const Solution = () => {
//   const softwareSolution = [
//     {
//       icon: Point,
//       label: "AssetManagement System",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//     {
//       icon: Point,
//       label: "Point of SalesManagement System",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//     {
//       icon: Point,
//       label: "Purchasing and Supplier Management",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//     {
//       icon: Point,
//       label: "Customer Relationship Management",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//     {
//       icon: Point,
//       label: "Financial Management",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//     {
//       icon: Point,
//       label: "Report Module",
//       description:
//         "Two line context here to just tell the end user what this product is for",
//       to: "#/",
//     },
//   ];
//   return (
//     <section className="mt-7">
//       <p className="font-sans text-lg font-medium my-8 text-[#344054]">
//         Learn about our wide range of retail business software solutions.
//       </p>
//       <div className="grid gap-6 grid-cols-3">
//         {softwareSolution.map((item, index) => (
//           <div
//             key={index}
//             className="bg-[#FCFCFD] border flex flex-col gap-2 rounded-xl border-gray-200 p-5"
//           >
//             <item.icon />
//             <p className="font-clash-medium">{item.label}</p>
//             <span className="text-[#667085] font-normal font-sans">
//               {item.description}
//             </span>
//             <span className="text-[#667085] font-sans mt-2 flex items-center">
//               Learn More
//               <ChevronRight size={18} />
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Solution;

import { ChevronRight } from "lucide-react";
import { Point } from "../../../assets/svg";

const Solution = () => {
  const softwareSolution = [
    {
      icon: Point,
      label: "Asset Management System",
      description:
        "Track and manage assets efficiently with real-time insights.",
      to: "#/",
    },
    {
      icon: Point,
      label: "Point of Sales Management System",
      description:
        "Streamline sales, inventory, and customer engagement seamlessly.",
      to: "#/",
    },
    {
      icon: Point,
      label: "Purchasing and Supplier Management",
      description:
        "Manage procurement and supplier relationships effortlessly.",
      to: "#/",
    },
    {
      icon: Point,
      label: "Customer Relationship Management",
      description: "Enhance customer engagement with powerful CRM tools.",
      to: "#/",
    },
    {
      icon: Point,
      label: "Financial Management",
      description: "Control and evaluate business finances with ease.",
      to: "#/",
    },
    {
      icon: Point,
      label: "Report Module",
      description: "Generate detailed reports for informed decision-making.",
      to: "#/",
    },
  ];

  return (
    <section className="mt-4 max-w-7xl  mx-auto  px-4 sm:px-6 sm:mt-6">
      <p className="font-sans text-base sm:text-lg font-medium my-4 sm:my-6 text-[#344054]">
        Learn about our wide range of retail business software solutions.
      </p>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {softwareSolution.map((item, index) => (
          <div
            key={index}
            className="bg-[#FCFCFD] border flex flex-col gap-2 rounded-md border-gray-200 p-4 sm:p-5"
          >
            <item.icon />
            <p className="font-clash-medium text-sm sm:text-base">
              {item.label}
            </p>
            <span className="text-[#667085] font-normal font-sans text-xs sm:text-sm">
              {item.description}
            </span>
            <a
              href={item.to}
              className="text-[#667085] font-sans mt-1 sm:mt-2 flex items-center text-xs sm:text-sm hover:text-[#F16722] transition-colors"
            >
              Learn More
              <ChevronRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solution;
