import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, FileButton, Text } from "@mantine/core";

import EditProfileModal from "./EditProfileModal";
import { Edit } from "lucide-react";
import { usePutData } from "../../../../hooks/useApis";
import { showNotification } from "@mantine/notifications";

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
  onSave: (data: { firstName: string; lastName: string }) => void;
}

export default function ProfileHeader({ profile, onSave }: ProfileHeaderProps) {
  const { profile_pic, company_name, email, name, phone_number } = profile;
  const [opened, { open, close }] = useDisclosure(false);
  const [localImage, setLocalImage] = useState(profile_pic || "");

  const changeProfileImage = usePutData(
    "profile/change-profile-image"
  );

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;

      changeProfileImage.mutate(
      { profile_image: base64 },
      {
        onSuccess: () => {
          setLocalImage(base64); // instant preview

          showNotification({
            title: "Profile Picture Updated",
            message: "Your profile photo has been changed successfully.",
            color: "green",
          });
        },

        onError: () => {
          showNotification({
            title: "Upload Failed",
            message: "Unable to update your profile picture. Please try again.",
            color: "red",
          });
        },
      }
    );
  };

    reader.readAsDataURL(file);
  };

  // Split name
  const nameParts = name ? name.split(" ") : ["", ""];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-4 relative">
        {/* Avatar */}
        <div className="relative w-32 h-32 border-4 border-orange-500 rounded-full overflow-hidden mx-auto sm:mx-0 bg-gray-100">
          {localImage ? (
            <div className="relative">
            <img
              src={localImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
             {/* Edit Avatar Button */}
          <FileButton onChange={handleFileChange} accept="image/*">
            {(props) => (
              <Button
                {...props}
                radius="xl"
                variant="subtle"
                color="orange"
                size="compact"
                className="!absolute top-20 right-2 !bg-gray-50 border border-orange-400 shadow-sm hover:!bg-orange-900 "
                p={4}
              >
                <Edit size={24} color="#FF6B00" />
              </Button>
            )}
          </FileButton>
          </div>
          ) : (
            <Text
              size="xl"
              fw={600}
              c="gray"
              className="flex items-center justify-center h-full"
            >
              {firstName?.charAt(0).toUpperCase()}
              {lastName?.charAt(0).toUpperCase()}
            </Text>
          )}

         
        </div>

        {/* Profile Info */}
        <div className="text-center sm:text-left">
          <Text size="lg" fw={600} c="textSecondary.9">
            {company_name}
          </Text>
          <Text fw={400} size="md" c="secondary" className="my-2">
            {email}
          </Text>

          <Button radius="md" size="sm" fw={500} onClick={open}>
            <Text color="white">Edit Profile</Text>
          </Button>
        </div>
      </div>

      {/* Modal (image editing removed) */}
      <EditProfileModal
        opened={opened}
        onClose={close}
        initialData={{
          localImage,
          firstName,
          lastName,
          email,
          companyName: company_name,
          phoneNumber: phone_number,
        }}
        onSave={(updatedData) => {
          onSave(updatedData); // no avatar editing here anymore
        }}
      />
    </div>
  );
}
