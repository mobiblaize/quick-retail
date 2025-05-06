import { Modal, Button } from "@mantine/core";
import { HelpCircle } from "lucide-react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function DeactivateVendor({ opened, onClose }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      classNames={{ body: "p-6" }}
    >
      <div className="space-y-4">
        <HelpCircle className="text-red-500 bg-[#FEF3F2] w-7 h-7" />
        <div className="items-left gap-2">
          <h2 className="text-[20px] font-bold text-[#344054]">
           Deactivate Vendor?
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to deactivate this vendor
        </p>

        <p className="text-[#667085] text-[15px]">
          If deactivated you will not be able to use the vendor on the platform
          again.
        </p>

        <div
          key="search-product-buttons"
          className="flex gap-4 mt-[2em] justify-center"
        >
          <Button variant="outline-primary" onClick={onClose}>
           Cancel
          </Button>

          <Button variant="filled-primary">Deactivate</Button>
        </div>
      </div>
    </Modal>
  );
}
