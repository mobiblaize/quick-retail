import hero from "../../../assets/images/hero.png";
import heroBg from "../../../assets/images/herobg.png";

export default function HeroSection() {
  return (
    <section className="container max-w-7xl mt-4 sm:mt-6 mx-auto">
      <div className="px-4 pt-6 sm:pt-8">
        <div
          className="rounded-xl sm:rounded-2xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <section className="px-4 sm:px-6 pt-8 sm:pt-12">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-clash-regular text-gray-800">
                Manage Account, Finance all in
                <br className="hidden md:block" />
                One place with a{" "}
                <span className="text-orange-500 font-clash-medium">
                  Tailored ERP.
                </span>
              </h1>
              <p className="mt-4 text-gray-600 mb-8 sm:mb-10 max-w-2xl font-sans mx-auto text-base sm:text-lg lg:text-xl px-4 sm:px-0">
                Manage accounts payable/receivable, Generate financial
                statements, including balance sheets, general ledger, and
                banking transactions at ease.
              </p>
              <button className="bg-[#F16722] mb-12 sm:mb-18 rounded-xl px-4 sm:px-5 py-2.5 sm:py-2 text-white text-sm sm:text-base hover:bg-[#e55a1f] transition-colors">
                Get Started Now
              </button>
              <div className="mt-auto shadow-lg max-w-4xl mx-auto rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={hero}
                  alt="ERP Dashboard"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
