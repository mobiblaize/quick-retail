import { Avatar, Text } from "@mantine/core";
import imageSrc from "../../../../assets/images/productIMG.png";
import FormInput from "../../../General/formInput";
export default function SelectedProduct() {
  return (
    <>
    <div className="flex gap-[3em] justify-evenly">
      <div className="flex gap-3">
        <Avatar src={imageSrc} radius="md" size={40} />
        <div className="flex flex-col">
          <Text fw={500} c="black">
            Sleek Sneakers 24
          </Text>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              size
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              40"
            </Text>
          </div>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              color
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              black
            </Text>
          </div>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              SKU
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              AD 1235 FG
            </Text>
          </div>
        </div>
      </div>

      <div>
        <Text fw={500} c="black">
          Unit Price
        </Text>
        <Text fw={500} className="text-[#667185] text-sm">
          ₦ 30,000
        </Text>
      </div>

      <div>
        <Text fw={500} c="black">
          Quantity
        </Text>
        <FormInput type="number"     paddingY="1" />
     
      </div>

      <div>
        <Text fw={500} c="black">
          Total Price
        </Text>
        <Text fw={500} className="text-[#667185] text-sm">
          ₦ 150,000
        </Text>
      </div>

      <div className="flex gap-3 mt-3">
        <Text fw={500} c="black">
          <span className="text-red">X</span>
        </Text>
        <Text fw={500} c="red" className="text-[red] text-sm">
          Remove
        </Text>
      </div>
    </div>
    <hr className="w-100% text-gray-200"/>
    <div className="flex gap-[3em] justify-evenly mt-[1em]">
      <div className="flex gap-3">
        <Avatar src={imageSrc} radius="md" size={40} />
        <div className="flex flex-col">
          <Text fw={500} c="black">
            Sleek Sneakers 24
          </Text>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              size
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              40"
            </Text>
          </div>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              color
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              black
            </Text>
          </div>
          <div className="flex  gap-8">
            <Text fw={500} className="text-[#667185] text-sm">
              SKU
            </Text>
            <Text fw={500} c="black" className="text-[black] text-sm">
              AD 1235 FG
            </Text>
          </div>
        </div>
      </div>

      <div>
        <Text fw={500} c="black">
          Unit Price
        </Text>
        <Text fw={500} className="text-[#667185] text-sm">
          ₦ 30,000
        </Text>
      </div>

      <div>
        <Text fw={500} c="black">
          Quantity
        </Text>
        <FormInput type="number"     paddingY="1" />
     
      </div>

      <div>
        <Text fw={500} c="black">
          Total Price
        </Text>
        <Text fw={500} className="text-[#667185] text-sm">
          ₦ 150,000
        </Text>
      </div>

      <div className="flex gap-3 mt-3">
        <Text fw={500} c="black">
          <span className="text-red">X</span>
        </Text>
        <Text fw={500} c="red" className="text-[red] text-sm">
          Remove
        </Text>
      </div>
    </div>
    </>
  );
}
