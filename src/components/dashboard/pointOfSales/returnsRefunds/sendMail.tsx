import { Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import product from "../../../../assets/images/Image.png";

const SendMail = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <div className="grid space-y-10 grid-cols-1">
        <div className="flex items-center space-x-10">
          <Text c="black" fw={500} className="w-24 shrink-0">
            From:
          </Text>
          <FormInput placeholder="victoriallc@gmail.com" className="flex-1" />
        </div>
        <div className="flex items-center space-x-10">
          <Text c="black" fw={500} className="w-24 shrink-0">
            To:
          </Text>
          <FormInput placeholder="gratefuljigs.com" className="flex-1" />
        </div>
        <div className="flex w-full space-x-6">
          <div className="flex items-center space-x-10 flex-1">
            <Text
              c="black"
              fw={500}
              className="w-24 shrink-0 whitespace-nowrap"
            >
              Order ID:
            </Text>
            <FormInput placeholder="#22543 3783" className="flex-1" />
          </div>
          <div className="flex items-center space-x-10 flex-1">
            <Text
              c="black"
              fw={500}
              className="w-24 shrink-0 whitespace-nowrap"
            >
              Product ID:
            </Text>
            <FormInput placeholder="BSD27836427LL" className="flex-1" />
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <Text c="black" fw={500} className="w-24 shrink-0">
            Subject:
          </Text>
          <FormInput
            placeholder="Reason for Declined Refund Request"
            className="flex-1"
          />
        </div>
      </div>
      <section className="mt-8">
        <Text c="black" size="lg" fw={"500"}>
          Description
        </Text>
        <Text mt={"18"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae
          ipsum adipisci inventore id. Quidem eos quam labore ea ut illum saepe,
          molestias a? Libero dolores, assumenda dicta deleniti quaerat nesciunt
          magni tempora voluptatum, eius et eos perspiciatis id suscipit!
        </Text>
        <hr className="mt-8 text-[#EAECF0]" />
        <div className="flex mt-2 gap-3">
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
        </div>
      </section>
    </main>
  );
};

export default SendMail;
