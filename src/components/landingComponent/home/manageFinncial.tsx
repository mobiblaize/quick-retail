import { Barchat } from "../../../assets/svg";

const ManageFinncial = () => {
  const Values = [
    {
      icon: Barchat,
      title: "Create sales and track inventory ",
      description:
        "Make quick business sales with your mobile phone or laptop and track ",
    },
    {
      icon: Barchat,
      title: "Multiple stores for one business",
      description:
        "Unlock the potential of your business by   creating multiple stores for your business and tracking them digitally.",
    },
    {
      icon: Barchat,
      title: "Generate reports",
      description:
        "Generating a core business reports for your retail business helps you track performance and identify trends.",
    },
  ];

  return (
    <main className="my-8 sm:my-15 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-clash-regular text-2xl sm:text-3xl lg:text-4xl">
        Manage financial transactions and <br className="hidden sm:block" />
        support{" "}
        <span className="font-clash-medium text-orange-500 tracking-tight">
          financial decision-making
        </span>
      </h1>
      <section>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {Values.map((item, index) => (
            <div
              key={index}
              className="flex max-w-sm mx-auto md:mx-0 px-3 items-start gap-4 text-left"
            >
              <div className="flex-shrink-0">
                <item.icon />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-clash-medium text-[#101828]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#667085] font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ManageFinncial;
