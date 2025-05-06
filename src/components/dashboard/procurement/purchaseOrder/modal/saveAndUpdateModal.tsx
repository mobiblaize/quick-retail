import { Modal, Button } from "@mantine/core";
import { HelpCircle } from "lucide-react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function SaveAndUpdateModal({ opened, onClose }: Props) {
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
            Save and update Changes
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to save and update changes.
        </p>
        <p className="text-[#667085] text-[15px] mt-2">
          Kindly note that this new changes would interlink / sync with the
          finance module, where a financial manager can preview as a new version
          history
        </p>

        <div key="search-product-buttons" className="flex gap-4 mt-[2em]">
          <Button variant="outline-primary" onClick={onClose}>
            No, Cancel
          </Button>

          <Button variant="filled-primary">Yes, Update</Button>
        </div>
      </div>
    </Modal>
  );
}
