import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ForwardRefRenderFunction,
  useEffect,
} from "react";
import { Text, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import FormInput from "../../../General/formInput";
import { useSendMail } from "../../../../hooks/backendApis/pos/returns";
import { shortenTransactionId } from "../../../../utils/helpers";
import AttachIcon from "../../../../assets/svg";

const mailSchema = z.object({
  from: z
    .string()
    .email("Invalid sender email address")
    .refine((val) => val.includes(".com"), {
      message: "Sender email must include '.com'",
    })
    .refine((val) => val.includes("@"), {
      message: "Sender email must include '@'",
    }),

  to: z
    .string()
    .email("Invalid recipient email address")
    .refine((val) => val.includes(".com"), {
      message: "Recipient email must include '.com'",
    })
    .refine((val) => val.includes("@"), {
      message: "Recipient email must include '@'",
    }),

  orderID: z.string().min(1, "Order ID is required"),
  productID: z.string().min(1, "Product ID is required"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});


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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setOrderID(initialOrderID || "");
  }, [initialOrderID]);

  useEffect(() => {
    setProductID(initialProductID || "");
  }, [initialProductID]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useSendMail();

  // ✅ Validate all fields before saving
  const handleSave = () => {
    const validation = mailSchema.safeParse({
      from,
      to,
      orderID,
      productID,
      subject,
      description,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      notifications.show({
        title: "Validation Error",
        message: "Please correct the highlighted fields.",
        color: "red",
      });
      return;
    }

    setErrors({}); // clear errors if validation passes

    const payload = new FormData();
    payload.append("from", from);
    payload.append("to", to);
    payload.append("orderID", orderID);
    payload.append("productID", productID);
    payload.append("subject", subject);
    payload.append("description", description);

    attachments.forEach((file) => payload.append("attachments", file));

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
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="w-full h-auto rounded-lg bg-white px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid space-y-6 sm:space-y-10 grid-cols-1">
        {/* FROM FIELD */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            From:
          </Text>
          <div className="flex-1">
            <FormInput
              placeholder="Enter email"
              value={from}
              onChange={(val: string) => setFrom(val)}
              className={errors.from ? "border-red-500" : ""}
            />
            {errors.from && <Text c="red" size="sm">{errors.from}</Text>}
          </div>
        </div>

        {/* TO FIELD */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            To:
          </Text>
          <div className="flex-1">
            <FormInput
              placeholder="Enter email"
              value={to}
              onChange={(val: string) => setTo(val)}
              className={errors.to ? "border-red-500" : ""}
            />
            {errors.to && <Text c="red" size="sm">{errors.to}</Text>}
          </div>
        </div>

        {/* ORDER AND PRODUCT ID */}
        <div className="flex flex-col sm:flex-row w-full sm:space-x-6 space-y-6 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
              Order ID:
            </Text>
            <FormInput
              className={`flex-1 ${errors.orderID ? "border-red-500" : ""}`}
              value={shortenTransactionId(orderID)}
              onChange={(val: string) => setOrderID(val)}
              readOnly
            />
            {errors.orderID && <Text c="red" size="sm">{errors.orderID}</Text>}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0 flex-1">
            <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
              Product ID:
            </Text>
            <FormInput
              className={`flex-1 ${errors.productID ? "border-red-500" : ""}`}
              value={shortenTransactionId(productID)}
              onChange={(val: string) => setProductID(val)}
              readOnly
            />
            {errors.productID && <Text c="red" size="sm">{errors.productID}</Text>}
          </div>
        </div>

        {/* SUBJECT */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
          <Text c="black" fw={500} className="sm:w-24 sm:shrink-0">
            Subject:
          </Text>
          <div className="flex-1">
            <FormInput
              placeholder="Reason for Declined Refund Request"
              value={subject}
              onChange={(val: string) => setSubject(val)}
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && <Text c="red" size="sm">{errors.subject}</Text>}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="mt-6 sm:mt-8">
        <Text c="black" size="lg" fw={500}>
          Description
        </Text>
        <Textarea
          placeholder="Description of the issue or request"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <Text c="red" size="sm">{errors.description}</Text>}

        {/* ATTACHMENTS */}
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
            <span className="pr-3">
              <AttachIcon size={20} color="black" />
            </span>
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
