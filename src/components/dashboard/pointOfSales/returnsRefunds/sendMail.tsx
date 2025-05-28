import {
  forwardRef,
  useImperativeHandle,
  useState,
  ForwardRefRenderFunction,
} from "react";
import { Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import product from "../../../../assets/images/Image.png";
import { useSendMail } from "../../../../hooks/backendApis/pos/returns";
import { notifications } from "@mantine/notifications";
// import { useFetchSaleOrderById } from "../../../../hooks/backendApis/pos/returns";

export interface SendMailRef {
  handleSave: () => void;
}

const SendMail: ForwardRefRenderFunction<SendMailRef> = (_, ref) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [orderID, setOrderID] = useState("");
  const [productID, setProductID] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // const { data, error } = useFetchSaleOrderById(orderId || "");

  const { mutate } = useSendMail();

  const handleSave = () => {
    if (!from || !to || !orderID || !productID || !subject || !description) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }

    const payload = {
      from,
      to,
      orderID: orderID,
      productID: productID,
      subject,
      description,
      attachments,
    };

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Mail Sent",
          message: "Mail successfully sent.",
          color: "green",
        });

        // Reset form
        setFrom("");
        setTo("");
        setOrderID("");
        setProductID("");
        setSubject("");
        setDescription("");
        setAttachments([]);
      },
      onError: (error: any) => {
        notifications.show({
          title: "Error",
          message: error?.response?.data?.message || "Failed to send mail",
          color: "red",
        });
      },
    });
  };

  // Expose handleSave to parent
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  return (
    <main className="w-full h-auto rounded-lg bg-white px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid space-y-6 sm:space-y-10 grid-cols-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            From:
          </Text>
          <FormInput
            placeholder="victoriallc@gmail.com"
            className="flex-1"
            value={from}
            onChange={(e: any) => setFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            To:
          </Text>
          <FormInput
            placeholder="gratefuljigs.com"
            className="flex-1"
            value={to}
            onChange={(e: any) => setTo(e.target.value)}
          />
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
            <FormInput
              placeholder="#22543 3783"
              className="flex-1"
              value={orderID}
              onChange={(e: any) => setOrderID(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text
              c="black"
              fw={500}
              className="sm:w-24 sm:shrink-0 whitespace-nowrap"
            >
              Product ID:
            </Text>
            <FormInput
              placeholder="BSD27836427LL"
              className="flex-1"
              value={productID}
              onChange={(e: any) => setProductID(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            Subject:
          </Text>
          <FormInput
            placeholder="Reason for Declined Refund Request"
            className="flex-1"
            value={subject}
            onChange={(e: any) => setSubject(e.target.value)}
          />
        </div>
      </div>
      <section className="mt-6 sm:mt-8">
        <Text c="black" size="lg" fw={"500"}>
          Description
        </Text>
        <FormInput
          placeholder="Description of the issue or request"
          className="flex-1"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <hr className="mt-6 sm:mt-8 text-[#EAECF0]" />
        <div className="flex flex-col sm:flex-row mt-2 gap-3">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            Attachments:
          </Text>
          <div className="flex items-center gap-3">
            <img
              src={product}
              alt="Product"
              className="w-12 h-12 object-cover rounded-md"
            />
            <Text c="black" size="sm">
              product.png
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default forwardRef(SendMail);
