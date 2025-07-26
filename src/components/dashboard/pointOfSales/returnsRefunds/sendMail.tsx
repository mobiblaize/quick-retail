import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ForwardRefRenderFunction,
  useEffect,
} from "react";
import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import FormInput from "../../../General/formInput";
import { useSendMail } from "../../../../hooks/backendApis/pos/returns";
import { shortenTransactionId } from "../../../../utils/helpers";
import AttachIcon from "../../../../assets/svg";



export interface SendMailRef {
  handleSave: () => void;
}

interface SendMailProps {
  initialOrderID: string;
  initialProductID: string;
}

const SendMail: ForwardRefRenderFunction<SendMailRef, SendMailProps> = (
  { initialOrderID, initialProductID },
  ref
) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [orderID, setOrderID] = useState(initialOrderID || "");
  const [productID, setProductID] = useState(initialProductID || "");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);


  useEffect(() => {
    setOrderID(initialOrderID || "");
  }, [initialOrderID]);
  
  useEffect(() => {
    setProductID(initialProductID || "");
  }, [initialProductID]);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
    const payload = new FormData();
    payload.append("from", from);
    payload.append("to", to);
    payload.append("orderID", orderID);
    payload.append("productID", productID);
    payload.append("subject", subject);
    payload.append("description", description);
  
    attachments.forEach((file) => {
      payload.append("attachments", file); // Note: use "attachments" not "attachments[]"
    });
  
    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Mail Sent",
          message: "Mail successfully sent.",
          color: "green",
        });
  
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
  
  
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setAttachments(files);
    } else {
    }
  };
  
  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };
  ;

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
            <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
              Order ID:
            </Text>
            <FormInput
              className="flex-1"
              value={shortenTransactionId(orderID)}
              onChange={(e: any) => setOrderID(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
              Product ID:
            </Text>
            <FormInput
              className="flex-1"
              value={shortenTransactionId(productID)}
              onChange={(e: any) => setProductID(e.target.value)}
              readOnly
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
        <Text c="black" size="lg" fw={500}>
          Description
        </Text>
        <textarea
          placeholder="Description of the issue or request"
          className="flex-1 w-full mt-2 p-2 border rounded"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {attachments.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {attachments.map((file, idx) => (
             <img
             key={idx}
             src={URL.createObjectURL(file)}
             alt={`attachment-${idx}`}
             className="w-full max-h-[200px] object-contain rounded border"
           />
           
            ))}
          </div>
        )}

        <div className="mt-4">
          <Text
            c="black"
            fw={500}
            className="cursor-pointer underline flex"
            onClick={handleTriggerFileInput}
          >
     <span className=" pr-3"> <AttachIcon size={20} color="black" /></span> 
            Attach File
          </Text>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </section>
    </main>
  );
};

export default forwardRef<SendMailRef, SendMailProps>(SendMail);
