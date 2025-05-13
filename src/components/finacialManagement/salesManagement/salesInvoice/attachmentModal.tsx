// SignatureUploadModal.tsx
import { useRef } from "react";
import { Button, Modal } from "@mantine/core";

export default function SignatureUploadModal({
  onClose,
  onUpload,
  opened,
}: {
  onClose: () => void;
  onUpload: (file: File) => void;
  opened: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    onClose();
  };

  return (

    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      classNames={{
        body: "p-6 bg-[#FFF4ED]",
      }}
    >
      <div className="p-6 w-[90%] max-w-md text-center relative ">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl text-orange-500">📤</div>
          <h3 className="text-lg font-semibold text-[#232A38]">
            Change / Update your Signature
          </h3>

          <Button
            variant="filled-primary"
            onClick={() => inputRef.current?.click()}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Browse to upload
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </Modal>
  );
}
