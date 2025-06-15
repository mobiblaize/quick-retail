const Consolidate = () => {
  return (
    <main className="bg-[#4D1D05] mt-8 sm:mt-14 text-white py-8 sm:py-14">
      <div className="max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8">
        <h3 className="font-clash-light text-lg sm:text-xl">
          Ready to get your{" "}
          <span className="text-[#F16722] font-clash-medium">
            Retail Business
          </span>{" "}
          Started ?
        </h3>

        <div className="mt-6 sm:mt-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-wide sm:tracking-wider font-clash-regular leading-tight sm:leading-normal">
              A Consolidated Retail ERP system where{" "}
              <br className="hidden lg:block" />
              you can operate, manage, and optimize{" "}
              <br className="hidden lg:block" />
              your retail business on the{" "}
              <span className="font-clash-bold">GO</span>
            </h1>
          </div>

          <div className="flex-shrink-0">
            <button className="bg-[#F16722] rounded-xl text-white px-4 sm:px-5 py-2.5 sm:py-2 text-base sm:text-lg font-medium font-clash-light hover:bg-[#e55a1f] transition-colors duration-300 w-full sm:w-auto sm:whitespace-nowrap">
              Get your 60 Days Free Trial
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Consolidate;
