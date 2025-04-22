import { Divider, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
import { SqrCode } from "../../../../assets/svg";
import product from "../../../../assets/images/productIMG.png";

const SearchProduct = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <div className="px-6 py-2 ">
        <Text size="lg" fw={500} c="textSecondary.9" tt={"uppercase"}>
          search product
        </Text>
      </div>
      <Divider size="sm" className="mt-3" color="#E4E7EC" />
      <div className="pt-8 pb-6 max-w-md px-6">
        <FormInput
          placeholder="Search by Name, SKU etc."
          leftIcon={<Search color="#667185" />}
          rightIcon={<SqrCode />}
        />
      </div>
      <section className="mt-3 px-6 pb-4 max-w-5xl flex flex-col md:flex-row md:justify-between">
        <div className="flex gap-4 mb-4 md:mb-0">
          <img src={product} alt="product_img" className="w-15 h-15" />
          <div className="flex flex-col space-y-1.5">
            <div>
              <Text size="lg" c="black" fw={600}>
                Sleek SNEAKERS 24
              </Text>
            </div>
            <div className="flex gap-6 items-center">
              <Text size="lg">Size: </Text>
              <Text fw="600" c="black" size="lg">
                40"
              </Text>
            </div>
            <div className="flex gap-6 items-center">
              <Text size="lg">Color: </Text>
              <Text fw="600" c="black" size="lg">
                Black
              </Text>
            </div>{" "}
            <div className="flex gap-6 items-center">
              <Text size="lg">SKU: </Text>
              <Text fw="600" c="black" size="lg">
                AD 1234 FG
              </Text>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:flex gap-6 md:gap-3">
          <div className="flex gap-3 flex-col">
            <Text size="md" c="black" fw={600}>
              Current Stock
            </Text>
            <Text>0</Text>
          </div>
          <div className="flex gap-3 flex-col">
            <Text size="md" c="black" fw={600}>
              Recorder Level
            </Text>
            <Text>100</Text>
          </div>
          <div className="flex gap-3 flex-col">
            <Text size="md" c="black" fw={600}>
              Location Warehouse
            </Text>
            <Text>100</Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchProduct;
