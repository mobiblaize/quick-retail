// import React, { ReactNode } from "react";

// interface PageContainerProps {
//   subHeaders?: ReactNode[];
//   subHeaderButtom?: ReactNode[];
//   children: ReactNode;
// }

// const PageContainer: React.FC<PageContainerProps> = ({
//   subHeaders = [],
//   subHeaderButtom = [],
//   children,
// }) => {
//   return (
//     <div className="relative min-h-screen flex flex-col">
//       <div className="sticky ml-0.5 top-0 z-10">
//         {subHeaders.map((header, index) => (
//           <div
//             key={index}
//             className="w-full bg-white px-6 py-3 border-b border-gray-100"
//           >
//             {header}
//           </div>
//         ))}
//       </div>

//       <div className="flex-grow p-4 md:p-6 flex flex-col gap-8 bg-[#F2F4F7] min-h-full rounded-lg">
//         {children}
//       </div>

//       <div className="sticky bottom-0 z-10 mt-auto">
//         {subHeaderButtom.map((header, index) => (
//           <div
//             key={index}
//             className="w-full bg-white px-6 py-3 border-t border-gray-100"
//           >
//             {header}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PageContainer;


import React, { ReactNode } from "react";

interface PageContainerProps {
  subHeaders?: ReactNode[];
  subHeaderButtom?: ReactNode[];
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  subHeaders = [],
  subHeaderButtom = [],
  children,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top sub-headers */}
      {subHeaders.length > 0 && (
        <div className="sticky ml-0.5 top-0 z-10">
          {subHeaders.map((header, index) => (
            <div
              key={index}
              className="w-full bg-white px-6 py-3 border-b border-gray-100"
            >
              {header}
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow p-4 md:p-6 flex flex-col gap-8 bg-[#F2F4F7] min-h-full rounded-lg">
        {children}
      </div>

      {/* Bottom sub-headers */}
      {subHeaderButtom.length > 0 && (
        <div className="sticky bottom-0 z-10 mt-auto">
          {subHeaderButtom.map((header, index) => (
            <div
              key={index}
              className="w-full bg-white px-6 py-3 border-t border-gray-100"
            >
              {header}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContainer;