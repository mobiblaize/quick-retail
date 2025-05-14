import { Text } from "@mantine/core";

export default function PaymentDetails() {
  return (
    <div className="flex flex-col">
     <div className="flex gap-[7em]">
     <Text fw={500} className="text-[#667185] text-sm">
     Subtotal (1 item)
          </Text>
          <Text fw={500} className="text-[#667185] text-sm">
          ₦ 30,000
          </Text>
    </div> 

    <div className="flex gap-[13em]">
    <Text fw={500} className="text-[#667185] text-sm">
    Discount
          </Text>
          <Text fw={500} className="text-[#667185] text-sm">
        -
          </Text>
    </div>

    <div className="flex gap-[8em]">
    <Text fw={500} className="text-[#667185] text-sm">
    Tax (7.5%VAT)
          </Text>
          <Text fw={500} className="text-[#667185] text-sm">
          ₦ 2,250
          </Text>
    </div>

    <div className="flex gap-[9em]">
    <Text fw={500} className="text-[#667185] text-sm">
    Service fee
          </Text>
          <Text fw={500} className="text-[#667185] text-sm">
          ₦ 1,000
          </Text>
    </div>
    <div className="flex gap-[12em] mt-[2em]">
    <Text fw={500} c="black" className="text-[#667185] text-sm">
    Total
          </Text>
          <Text fw={500} c="black" className="text-[#667185] text-sm">
          ₦ 33,250
          </Text>
    </div>
    </div>


  );
}
