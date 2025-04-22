import { Text } from "@mantine/core";

const Description = () => {
  const productFeatures = [
    "Premium Satin Fabric – Lightweight, silky-smooth, and gentle on the skin.",
    "Elegant Beige Hue – A timeless neutral shade that exudes sophistication.",
    "Relaxed Fit – Designed for ultimate comfort with a flattering silhouette.",
    "Bride & Bridesmaid Personalization – Available with embroidered or printed titles for a personalized touch.",
    "Chic Button-Down Top – Classic lapel collar with delicate piping details.",
  ];

  return (
    <main>
      <Text c="black" fw="500">
        Overview
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        temporibus possimus dolor id, laboriosam est?
      </Text>
      <section className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Location: <span className="text-black ml-1">Warehouse 1</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Brand: <span className="text-black ml-1">Africana</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Weight: <span className="text-black ml-1">6kg</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Sub-category: <span className="text-black ml-1">Nightwear</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Sizes: <span className="text-black ml-1">sm, md, lg</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Color: <span className="text-black ml-1">Beige</span>
          </Text>
        </div>
      </section>
      <section className="mt-5">
        <Text c="black" size="lg" fw={"500"}>
          Product Features
        </Text>
        <ul className="list-disc pl-5 mt-2 space-y-3">
          {productFeatures.map((feature, index) => (
            <li key={index} className="text-base">
              <Text c="#101828">{feature}</Text>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Description;
