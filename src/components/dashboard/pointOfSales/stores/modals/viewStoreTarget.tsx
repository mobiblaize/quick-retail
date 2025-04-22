import { Avatar, Button, Modal, Text } from "@mantine/core";
import user from "../../../../../assets/images/Avatar.png";
import { useState } from "react";
import SetStoreTarget from "./setStoreTarget";

interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
}

const ViewStoreTarget = ({ opened, onClose }: AddNewStoreModalProps) => {
  const [isSetStoreOpen, setIsSetStoreOpen] = useState(false);

  const handleEditTarget = () => {
    onClose();
    setIsSetStoreOpen(true);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.25rem" c="black" fw={700}>
              Store Target
            </Text>
            <Text mt="5" size="sm">
              You're viewing store target below.
            </Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
      >
        <div className="flex flex-col space-y-6">
          <div className="px-3 sm:px-5 rounded-xl py-3 sm:py-4 bg-[#FFF4ED]">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
              <div className="flex gap-3 sm:gap-5">
                <Avatar src={user} alt="user" radius="md" />
                <div className="flex flex-col">
                  <Text c="#344054" fw={"700"} size="md">
                    Palm MALL VI
                  </Text>
                  <Text size="md">6 Months</Text>
                </div>
              </div>
              <div className="flex flex-col">
                <Text fw={400} size="sm">
                  Date Created
                </Text>
                <Text c="customPrimary.10" size="md" fw={400}>
                  April 18, 2023 12:00 PM
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div className="flex gap-1 sm:gap-2 flex-col">
              <Text size="sm">Avegrage Transaction Price</Text>
              <Text c="#101828" size="lg">
                #14, 902,000.00
              </Text>
            </div>
            <div className="flex gap-1 sm:gap-2 flex-col">
              <Text size="sm">Conversion Rate (%)</Text>
              <Text size="lg" c="#101828">
                80%
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
            <Button
              onClick={handleEditTarget}
              variant="outline-primary"
              style={{
                border: "1px solid #D0D5DD",
                color: "#344054",
              }}
              className="order-2 sm:order-1"
            >
              Edit Target
            </Button>
            <Button variant="filled-primary" className="order-1 sm:order-2">
              Done
            </Button>
          </div>
        </div>
      </Modal>
      <SetStoreTarget
        opened={isSetStoreOpen}
        onClose={() => setIsSetStoreOpen(false)}
      />
    </>
  );
};

export default ViewStoreTarget;
