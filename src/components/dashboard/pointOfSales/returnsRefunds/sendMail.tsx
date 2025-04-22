import { Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import product from "../../../../assets/images/Image.png";

const SendMail = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid space-y-6 sm:space-y-10 grid-cols-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            From:
          </Text>
          <FormInput placeholder="victoriallc@gmail.com" className="flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            To:
          </Text>
          <FormInput placeholder="gratefuljigs.com" className="flex-1" />
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:space-x-6 space-y-6 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text
              c="black"
              fw={500}
              className="sm:w-24 sm:shrink-0 whitespace-nowrap"
            >
              Order ID:
            </Text>
            <FormInput placeholder="#22543 3783" className="flex-1" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text
              c="black"
              fw={500}
              className="sm:w-24 sm:shrink-0 whitespace-nowrap"
            >
              Product ID:
            </Text>
            <FormInput placeholder="BSD27836427LL" className="flex-1" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            Subject:
          </Text>
          <FormInput
            placeholder="Reason for Declined Refund Request"
            className="flex-1"
          />
        </div>
      </div>
      <section className="mt-6 sm:mt-8">
        <Text c="black" size="lg" fw={"500"}>
          Description
        </Text>
        <Text mt={"18"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos vitae
          ipsum adipisci inventore id. Quidem eos quam labore ea ut illum saepe,
          molestias a? Libero dolores, assumenda dicta deleniti quaerat nesciunt
          magni tempora voluptatum, eius et eos perspiciatis id suscipit!
        </Text>
        <hr className="mt-6 sm:mt-8 text-[#EAECF0]" />
        <div className="flex flex-col sm:flex-row mt-2 gap-3">
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
        </div>
      </section>
    </main>
  );
};

export default SendMail;
