import { Modal, Button } from "@mantine/core";
import { HelpCircle } from "lucide-react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function DeletePurchaseModal({ opened, onClose }: Props) {
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
            Delete Purchase Order
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to delete this purchase order
        </p>
        <p className="text-[#667085] text-[15px] mt-2">
          Kindly note that this by deleting a purchase order, all it
          corresponding Purchase invoices alongside specific version history
          would be permanently removed.
        </p>

        <div key="search-product-buttons" className="flex gap-4 mt-[2em]">
          <Button variant="outline-primary" onClick={onClose}>
            No, Cancel
          </Button>

          <Button variant="filled-primary">Yes, Delete</Button>
        </div>
      </div>
    </Modal>
  );
}
