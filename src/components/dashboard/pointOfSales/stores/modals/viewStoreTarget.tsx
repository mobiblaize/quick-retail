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
            <Text size="1.5rem" c="black" fw={700}>
              Store Target
            </Text>
            <Text mt="5">You're viewing store target below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="flex flex-col space-y-6">
          <div className="px-5 rounded-xl py-4 bg-[#FFF4ED] h-auto">
            <div className="flex justify-between">
              <div className="flex gap-5">
                <Avatar src={user} alt="user" radius="md" size={50} />
                <div className="flex flex-col">
                  <Text c="#344054" fw={"700"} size="lg">
                    Palm MALL VI
                  </Text>
                  <Text size="lg">6 Months</Text>
                </div>
              </div>
              <div className="flex flex-col">
                <Text fw={400}>Date Created</Text>
                <Text c="customPrimary.10" size="lg" fw={400}>
                  April 18, 2023 12:00 PM
                </Text>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 flex-col">
              <Text>Avegrage Transaction Price</Text>
              <Text c="#101828" size="xl">
                #14, 902,000.00
              </Text>
            </div>
            <div className="flex gap-2 flex-col">
              <Text size="lg">Conversion Rate (%)</Text>
              <Text size="xl" c="#101828">
                80%
              </Text>
            </div>{" "}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              onClick={handleEditTarget}
              variant="outline-primary"
              style={{
                border: "1px solid #D0D5DD",
                color: "#344054",
              }}
            >
              Edit Target
            </Button>
            <Button variant="filled-primary">Done</Button>
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
