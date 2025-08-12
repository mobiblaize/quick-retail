import { useRef, useState } from "react";
import { Button, Group, Paper, rem, Text, Title } from "@mantine/core";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import EditIcon from "../../../../assets/images/EditIcon.png";
import ChangePasswordModal from "./changePasswordModal";
import SecurityQuestionModal from "./securityModal";
import { IconChevronRight } from "@tabler/icons-react";

interface ProfileSectionProps {
  profile: {
    profile_pic: string | null;
    company_name: string;
    email: string;
    company_size: string;
    activeTab: "account" | "security";
    setActiveTab: (tab: "account" | "security") => void;
  };
}

export default function SecurityPage({ profile }: ProfileSectionProps) {
  const { profile_pic, company_name, email, activeTab, setActiveTab } = profile;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localImage, setLocalImage] = useState(profile_pic);

  // @ts-ignore
  const { mutate: updatePhoto, isLoading } = useFetchPhoto();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updatePhoto(
        { profile_image: base64String },
        {
          onSuccess: () => setLocalImage(base64String),
          onError: (err: any) => console.error("Upload error:", err),
        }
      );
    };
    reader.readAsDataURL(file);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  return (
    <div className="bg-white p-6">
      <ChangePasswordModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <SecurityQuestionModal
        opened={modalOpen2}
        onClose={() => setModalOpen2(false)}
      />
      {/* Profile Header */}
      <div className="bg-white  p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* <div className="flex items-center gap-4">
          <div className="w-20 h-20 border-4 border-orange-500 rounded-full overflow-hidden">
            <img
              src={localImage || "/avatar-placeholder.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-800">
              {company_name}
            </h2>
            <p className="text-sm font-normal text-gray-500">{email}</p>
            <button
              className="border border-gray-300 text-sm font-semibold text-gray-900 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Change profile picture"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-4">
  {/* Image */}
  <div className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] border-4 border-orange-500 rounded-full overflow-hidden flex items-center justify-center">
    <img
      src={localImage || "/avatar-placeholder.jpg"}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Info */}
  <div className="text-center md:text-left">
    <Title order={2} size="h3" fw={500} c="gray.8" mb="md">
      {company_name}
    </Title>

    <Text size="sm" fw={400} c="gray.6" mb="md">
      {email}
    </Text>
    <Button
      variant="outline"
      color="gray"
      size="sm"
      radius="md"
      onClick={() => fileInputRef.current?.click()}
      disabled={isLoading}
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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <Text
          unstyled
          fw={500}
          size="xl"
          className={`cursor-pointer border-b-2 pb-1 ${activeTab === "account"
            ? "text-[#F16722] border-orange-500"
            : "text-gray-400 border-transparent"
            }`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </Text>
        <Text
          unstyled
          fw={500}
          size="xl"
          className={`cursor-pointer border-b-2 pb-1 ${activeTab === "security"
            ? "text-orange-500 border-orange-500"
            : "text-gray-400 border-transparent"
            }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </Text>
      </div>

      {/* Account Info */}
      <div className="border p-3 border-gray-200 rounded-lg mt-[2em]">
        <Title order={3} size="lg" fw={500} mb="md" c="#101928">
          SECURITY
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Paper
            withBorder
            p="md"
            radius="sm"
            onClick={() => setModalOpen(true)}
            style={{
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            <Group
              justify="space-between"
              gap="sm"
              className="text-sm text-gray-600 mb-1 border border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setModalOpen(true)}
            >
              <Group gap="xs">
                <img src={EditIcon} alt="lock icon" className="w-5 h-5" />
                <Text>Change my Password</Text>
              </Group>

              <IconChevronRight size={18} className="text-gray-400 ml-2" />
            </Group>
          </Paper>

          {/* Security Question */}
          <Paper
            withBorder
            p="md"
            radius="md"
            onClick={() => setModalOpen2(true)}
            style={{
              cursor: "pointer",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb"; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Group
              justify="space-between"
              gap="sm" 
              style={{
                fontSize: rem(14),
                color: "#4B5563",
                marginBottom: rem(4),
                border: "1px solid #E5E7EB",
                padding: rem(16),
                cursor: "pointer",
              }}
              onClick={() => setModalOpen2(true)}
            >
              <Group gap="xs">
                <img src={EditIcon} alt="lock icon" style={{ width: rem(20), height: rem(20) }} />
                <Text>Security Question</Text>
              </Group>
              <IconChevronRight size={18} color="#9CA3AF" style={{ marginLeft: rem(8) }} />
            </Group>
          </Paper>

        </div>
      </div>
    </div>
  );
}
