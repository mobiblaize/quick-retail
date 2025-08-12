import { useRef, useState } from "react";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import { Button, Text } from "@mantine/core";


interface ProfileHeaderProps {
  profile: {
    profile_pic: string;
    company_name: string;
    email: string;
  };
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { profile_pic, company_name, email } = profile;
  // @ts-ignore
  const { mutate: updatePhoto, isLoading } = useFetchPhoto();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localImage, setLocalImage] = useState(profile_pic);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;

      updatePhoto(
        { profile_image: base64String },
        {
          onSuccess: (res) => {
            console.log("Upload successful:", res);
            setLocalImage(base64String);
          },
          onError: (err) => {
            console.log("Upload error:", err);
          },
        }
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="grid grid-cols-1 sm:flex sm:items-center gap-4">
        <div className="w-32 h-32 border-4 border-orange-500 rounded-full overflow-hidden mx-auto sm:mx-0">
          <img
            src={localImage || "/avatar-placeholder.jpg"}
            className="w-full h-full object-cover"
          />
        </div>

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

          <Button
            variant="outline"
            color="gray"
            radius="md"
            size="sm"
            fw={500}
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
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
            {isLoading ? "Uploading..." : "Change profile picture"}
          </Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

    </div>
  );
}