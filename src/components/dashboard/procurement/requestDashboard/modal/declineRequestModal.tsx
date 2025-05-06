import { Modal, Button, Switch } from "@mantine/core";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function DeclineRequestModal({ opened, onClose }: Props) {
    const [isEnabled, setIsEnabled] = useState(false);

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
            Decline Request?
          </h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to decline Request?
        </p>
        <p className="text-[#667085] text-[15px] mt-2">
          If declined, Requestors would be updated.
        </p>

        <div className="flex flex-col">
          <label
            htmlFor="comment"
            className="text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <input
            id="comment"
            type="text"
            placeholder="Please state the reason for your decision"
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[#667085] text-[15px]">
            Allow requestor to re-initiate request?
          </p>
          <Switch
            checked={isEnabled}
            onChange={(event) => setIsEnabled(event.target.checked)}
            className={`${
              isEnabled ? "text-[#F16722]" : "text-gray-300"
            } relative inline-flex h-6 w-12 items-center rounded-full transition`}
            size="md"
          />
        </div>

        <div
          key="search-product-buttons"
          className="flex gap-4 mt-[2em] justify-center"
        >
          <Button variant="outline-primary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="filled-primary">Decline</Button>
        </div>
      </div>
    </Modal>
  );
}
