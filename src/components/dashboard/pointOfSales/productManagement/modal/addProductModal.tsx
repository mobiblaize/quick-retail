import { Modal, Button, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function AddProduct({ opened, onClose }: Props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"simple" | "variable" | null>(null);

  const handleContinue = () => {
    if (selected === "simple") {
      navigate("/dashboard/product-management/add-new-product");
    } else if (selected === "variable") {
      navigate("/dashboard/product-management/add-bulk-product");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      classNames={{ body: "p-6" }}
      radius="md"
    >
      <div className="space-y-4">
        <div className="items-left gap-2">
          <h2 className="text-[20px] font-bold text-[#344054]">
            Add a product
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Add a new product with the options below
        </p>

        <div className="flex flex-col gap-4 mb-6">
          {/* Simple Product Option */}
          <div
            onClick={() => setSelected("simple")}
            className="w-full p-4 cursor-pointer transition flex gap-3 items-start"
          >
            <div className="mt-1">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selected === "simple" ? "border-[#F97316]" : "border-gray-400"
                }`}
              >
                {selected === "simple" && (
                  <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                )}
              </div>
            </div>
            <div>
              <Title order={5} className="text-[#101828] font-semibold">
                Simple product
              </Title>
              <p className="text-sm text-[#667085]">
                Select this option for a standard simple product
              </p>
            </div>
          </div>

          {/* Variable Product Option */}
          <div
            onClick={() => setSelected("variable")}
            className="w-full  p-4 cursor-pointer transition flex gap-3 items-start"
          >
            <div className="mt-1">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selected === "variable"
                    ? "border-[#F97316]"
                    : "border-gray-400"
                }`}
              >
                {selected === "variable" && (
                  <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                )}
              </div>
            </div>
            <div>
              <Title order={5} className="text-[#101828] font-semibold">
                Variable product
              </Title>
              <p className="text-sm text-[#667085]">
                Select this option for products with different colour or size.
              </p>
            </div>
          </div>
        </div>

        <div
          key="search-product-buttons"
          className="flex gap-4 mt-[2em] justify-center"
        >
          <Button variant="outline-primary" onClick={onClose}>
            No, Cancel
          </Button>

          <Button
            variant="filled-primary"
            disabled={!selected}
            onClick={handleContinue}
          >
            Yes, Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
