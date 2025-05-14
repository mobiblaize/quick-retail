import { Modal, Button } from "@mantine/core";
import FormInput from "../../../General/formInput";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function EmailModal({ opened, onClose }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      classNames={{ body: "p-6" }}
    >
      <div className="space-y-4 rounded-xl">
        {/* <HelpCircle className="text-red-500 bg-[#FEF3F2] w-7 h-7" /> */}
        <div className="flex justify-between gap-2">
          <h2 className="text-[20px] font-bold text-[black]">
          Add Email
          </h2>
          <p className="cursor-pointer" onClick={onClose}>
            X
          </p>
        </div>

        <p className="text-[#667085] text-sm">
        The email address entered will receive the invoice in their inbox
        </p>
        <FormInput
                          type="text"
                          label=""
                          paddingY={"4"}
                          placeholder="Enter email address"
                        />
        <div
          key="search-product-buttons"
          className="flex gap-4 mt-[2em] justify-center"
        >
          <Button variant="outline-primary" onClick={onClose}>
        Cancel
          </Button>

          <Button variant="filled-primary" onClick={onClose}>Add Email</Button>
        </div>
      </div>
    </Modal>
  );
}
