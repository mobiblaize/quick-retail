import frame from "../../assets/images/banner.png";

const Banner = () => {
  return (
    <div className="w-full relative">
      <img src={frame} alt="frame" className="w-full h-auto" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-clash-regular text-gray-800 mb-4 max-w-4xl">
          The Modern Operating System for all type and Scale of{" "}
          <span className="text-orange-500 font-clash-medium">
            Retail Business.
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Banner;