import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { SetStateAction, useMemo, useState } from "react";
import {
  useCreateDiscount,
  useFetchDiscountProduct,
} from "../../../../../hooks/backendApis/pos/discount";
import Dropdown from "../../../../General/dropdown";

interface CreateDiscountModalProps {
  opened: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateDiscountModal = ({
  opened,
  onClose,
  onCreated,
}: CreateDiscountModalProps) => {
  const [discountType, setDiscountType] = useState<string>("Amount");

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [redemptionCount, setRedemptionCount] = useState("");

  const resetForm = () => {
    setName("");
    setCode("");
    setFrom("");
    setTo("");
    setSelectedProducts([]);
    setRedemptionCount("");
    setDiscountType("Amount");
    setPercentage("");
    setDiscountValue("");
  };

  const createDiscount = useCreateDiscount();
  const { data: productsData } = useFetchDiscountProduct();

  const productOptions = useMemo(() => {
    return (
      productsData?.data?.map((product: any) => ({
        label: product.name,
        value: product.id,
      })) || []
    );
  }, [productsData]);

  const handleSubmit = () => {
    const payload = {
      products: selectedProducts.map((id) => ({ id })),
      name,
      code,
      type: discountType.toLowerCase(),
      value: Number(discountType === "Percentage" ? percentage : discountValue),
      from,
      to,
      redemption_count: Number(redemptionCount),
    };

    createDiscount.mutate(payload, {
      onSuccess: (res) => {
        console.log("Success:", res);
        onCreated(); // <--- this is key
        resetForm();
      },
      onError: (err) => {
        console.error("Error:", err);
      },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          resetForm();
          onClose();
        }}
        title={
          <div>
            <Text size="1.5rem" c="black" fw={700}>
              Create Discount
            </Text>
            <Text mt="5">Input discount information below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              label="Discount Name"
              placeholder="Enter discount name"
              paddingY="6px"
              value={name}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setName(e.target.value)
              }
            />

            <FormInput
              type="text"
              label="Discount Code"
              placeholder="Enter discount code"
              paddingY="6px"
              value={code}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setCode(e.target.value)
              }
            />

            <FormInput
              type="date"
              label="Date From"
              paddingY="6px"
              value={from}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setFrom(e.target.value)
              }
            />

            <FormInput
              type="date"
              label="Date To"
              paddingY="6px"
              value={to}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setTo(e.target.value)
              }
            />
            <div className="col-span-2">
              <Dropdown
                options={productOptions}
                label="Select Product"
                value={selectedProducts[0] || null}
                onChange={(val) => setSelectedProducts([Number(val)])}
                textColorClass="text-gray-800"
                required
              />
            </div>
            <div className="col-span-2">
              <FormInput
                type="text"
                label="Redemption Count"
                paddingY="6px"
                value={redemptionCount}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setRedemptionCount(e.target.value)
                }
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Discount Type
              </label>
              <select
                className="w-full p-3 border border-gray-300  rounded"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="Amount">Amount</option>
                <option value="Percentage">Percentage</option>
              </select>

              {/* <Dropdown
  label="Discount Type"
  options={discountTypeOptions}
  placeholder="Select a discount type"
  value={discountType}
  onChange={(selected) => setDiscountType(selected?.value)}
  required
  textColorClass="text-gray-800"
/> */}
            </div>

            {discountType === "Percentage" ? (
              <div className="col-span-2">
                <FormInput
                  type="text"
                  label="Percentage"
                  placeholder="%"
                  paddingY="6px"
                  value={percentage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const val = e.target.value;
                    if (
                      !isNaN(Number(val)) &&
                      Number(val) >= 0 &&
                      Number(val) <= 100
                    ) {
                      setPercentage(val);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="col-span-2 grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={discountValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!isNaN(Number(val))) {
                        setDiscountValue(val);
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="h-6 mb-1"></div>
                  <select className="w-full p-3 border border-[#EAECF0]  bg-[#EAECF0]  rounded">
                    <option value="Naira">Naira</option>
                    <option value="Dollar">Dollar</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline-primary"
              style={{
                border: "1px solid #D0D5DD",
                color: "#344054",
              }}
            >
              Cancel
            </Button>
            <Button variant="filled-primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateDiscountModal;
