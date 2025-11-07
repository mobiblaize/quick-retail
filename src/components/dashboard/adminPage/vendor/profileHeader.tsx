import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Text } from "@mantine/core";

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
  onSave: (data: {
    firstName: string;
    lastName: string;
    avatar?: string;
  }) => void;
}

export default function ProfileHeader({ profile, onSave }: ProfileHeaderProps) {
  const { profile_pic, company_name, email, name, phone_number } = profile;
  const [opened, { open, close }] = useDisclosure(false);
  const [localImage, setLocalImage] = useState(profile_pic || "");

  // Split name into first/last parts
  const nameParts = name ? name.split(" ") : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-4">
        {/* Avatar */}
        <div className="w-32 h-32 border-4 border-orange-500 rounded-full overflow-hidden mx-auto sm:mx-0 flex items-center justify-center bg-gray-100">
          {localImage ? (
            <img
              src={localImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Text size="xl" fw={600} c="gray">
              {firstName.charAt(0).toUpperCase()}
              {lastName.charAt(0).toUpperCase()}
            </Text>
          )}
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
            radius="md"
            size="sm"
            fw={500}
            onClick={open}
            
          >
            <Text color="white">Edit Profile</Text>
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
