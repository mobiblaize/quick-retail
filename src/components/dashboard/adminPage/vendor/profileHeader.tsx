import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Text } from "@mantine/core";
import User from "../../../../assets/images/user.png";
import EditProfileModal from "./EditProfileModal";

interface ProfileHeaderProps {
  profile: {
    name: string;
    email: string;
    phone_number: string;
    company_name: string;
    company_size: string;
    app_selected: number;
    profile_pic: string;
  };
  onSave: (data: { firstName: string; lastName: string; avatar?: string }) => void;
}

export default function ProfileHeader({ profile, onSave }: ProfileHeaderProps) {
  const { profile_pic, company_name, email, name, phone_number } = profile;
  const [opened, { open, close }] = useDisclosure(false);
  const [localImage, setLocalImage] = useState(profile_pic || "");
  const emptyImage = User;

  // Split name into first/last parts
  const nameParts = name ? name.split(" ") : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-4">
        {/* Avatar */}
        <div className="w-32 h-32 border-4 border-orange-500 rounded-full overflow-hidden mx-auto sm:mx-0">
          <img
            src={localImage || emptyImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <div className="mb-4">
            <Text size="lg" fw={600} c="textSecondary.9">
              {company_name}
            </Text>
          </div>
          <div className="mb-4">
            <Text fw={400} size="md" c="secondary">
              {email}
            </Text>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            color="gray"
            radius="md"
            size="sm"
            fw={500}
            onClick={open}
            styles={(theme) => ({
              root: {
                cursor: "pointer",
                borderColor: theme.colors.gray[4],
                "&:hover": {
                  backgroundColor: theme.colors.gray[0],
                },
              },
            })}
          >
            <Text>Edit Profile</Text>
          </Button>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        opened={opened}
        onClose={close}
        initialData={{
          firstName,
          lastName,
          email,
          companyName: company_name,
          phoneNumber: phone_number,
          avatar: profile_pic,
        }}
        onSave={(updatedData) => {
          setLocalImage(updatedData.avatar || profile_pic);
          onSave(updatedData);
        }}
      />
    </div>
  );
}
