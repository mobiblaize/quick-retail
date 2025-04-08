import { Divider, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
import { SqrCode } from "../../../../assets/svg";

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
    </main>
  );
};

export default SearchProduct;
