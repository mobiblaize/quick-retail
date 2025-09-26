import { useState } from "react";
import { Button, Divider, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import FormInput from "../../../General/formInput";
import {
  useCreateDiscount,
  useFetchDiscountProduct,
} from "../../../../hooks/backendApis/pos/discount";
import DiscountSearchProduct from "./discountSearchProduct";
import Dropdown from "../../../General/dropdown";

// interface SelectedItemPayload {
//     variationId: string;
//     quantity: number;
// }

const CreateDiscountForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [redemptionCount, setRedemptionCount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [discountType, setDiscountType] = useState("Amount");
  const [discountValue, setDiscountValue] = useState("");
  const [percentage, setPercentage] = useState("");

  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  const createDiscount = useCreateDiscount();
  const { data: _productsData } = useFetchDiscountProduct();

  const handleSubmit = () => {
    if (!name || !from || !to || selectedProducts.length === 0) {
      notifications.show({
        title: "Missing Fields",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }

    const payload = {
      name,
      code: name.toLowerCase().replace(/\s+/g, "-"),
      type: discountType.toLowerCase(),
      value: Number(discountType === "Percentage" ? percentage : discountValue),
      from,
      to,
      redemption_count: Number(redemptionCount),
      products: selectedProducts.map((item: any) => {
        const productId = item.variationID && item.id;
        return {
          id: productId,
        };
      }),
    };

    createDiscount.mutate(payload, {
      onSuccess: (res) => {
        notifications.show({
          title: "Success",
          message: res?.data?.message || "Discount created successfully",
          color: "green",
        });
        navigate(-1);
      },
      onError: (err: any) => {
        notifications.show({
          title: "Error",
          message:
            err?.response?.data?.message ||
            "An error occurred while creating the discount",
          color: "red",
        });
      },
    });
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <Title order={3} fw={600} size="lg" c="dark" mb="sm">
          BASIC INFORMATION
        </Title>
        <Divider mb="md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Discount Name"
            placeholder="Enter discount name"
            paddingY={"0.7rem"}
            value={name}
            // onChange={(e: any) => setName(e.target.value)}
            onChange={(val: string) =>  setName(val)}
          />

          <FormInput
            type="text"
            label="Set User Limit"
            placeholder="Enter user limit"
            paddingY={"0.7rem"}
            value={redemptionCount}
            // onChange={(e: any) => setRedemptionCount(e.target.value)}
            onChange={(val: string) =>  setRedemptionCount(val)}
          />

          <FormInput
            type="date"
            label="Start Date"
            paddingY={"0.7rem"}
            placeholder="Select start date"
            value={from}
            // onChange={(e: any) => setFrom(e.target.value)}
            onChange={(val: string) =>  setFrom(val)}
          />

          <FormInput
            type="date"
            label="End Date"
            paddingY={"0.7rem"}
            placeholder="Select end date"
            value={to}
            // onChange={(e: any) => setTo(e.target.value)}
            onChange={(val: string) =>  setTo(val)}
          />

          {/* <Dropdown
            label="Discount Type"
            placeholder="Select discount type"
            paddingY="0.7rem"
            options={[
              { value: "Amount", label: "Amount Off" },
              { value: "Percentage", label: "Percentage Off" },
            ]}
            // name="discount-type"
            value={discountType}
            onChange={(e: any) => setDiscountType(e.target.value)}
          /> */}

          <Dropdown
            label="Discount Type"
            placeholder="Select discount type"
            paddingY="0.7rem"
            options={[
              { value: "Amount", label: "Amount Off" },
              { value: "Percentage", label: "Percentage Off" },
            ]}
            value={discountType}
            onChange={(val) => setDiscountType(String(val))}
          />

          {discountType === "Percentage" ? (
            <FormInput
              type="number"
              label="Percentage Off"
              placeholder="Enter value"
              paddingY={"0.7rem"}
              leftPrefix="%"
              value={percentage}
              // onChange={(e: any) => setPercentage(e.target.value)}
              onChange={(val: string) =>  setPercentage(val)}
            />
          ) : (
            <FormInput
              type="number"
              label="Amount Off"
              paddingY={"0.7rem"}
              placeholder="Enter value"
              leftPrefix="₦"
              value={discountValue}
              // onChange={(e: any) => setDiscountValue(e.target.value)}
              onChange={(val: string) =>  setDiscountValue(val)}
            />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <Title order={3} fw={600} size="lg" c="dark" mb="sm">
          DISCOUNT APPLICABILITY
        </Title>
        <Divider mb="md" />
        <DiscountSearchProduct
          onSelect={() => { }}
          onItemsChange={(items) => {
            setSelectedProducts(items);
          }}
        />
      </div>

      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button variant="outline-primary" onClick={() => navigate(-1)} style={{ width: 150 }}>
          Cancel
        </Button>

        <Button variant="filled-primary" onClick={handleSubmit} style={{ width: 150 }}>
          Create Discount
        </Button>
      </div>
    </div>
  );
};

export default CreateDiscountForm;
