import { Modal, Button } from "@mantine/core";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../../../constants/routes";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function AddNewDepreciationModal({ opened, onClose }: Props) {
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
        <HelpCircle className="text-[#0F973D] bg-[#E7F6EC] w-8 h-8 border border-[#E7F6EC] rounded-full" />
        <div className="items-left gap-2">
          <h2 className="text-[20px] font-bold text-[#344054]">
            Add New Depreciation
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to add this depreciation?
        </p>

        <div
          key="search-product-buttons"
          className="flex gap-4 mt-[2em] justify-center"
        >
          <Button variant="outline-primary" onClick={onClose}>
            No, Cancel
          </Button>

          <Link to={ROUTES.addNewDepreciation}>
            <Button variant="filled-primary">Yes, Confirm</Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
