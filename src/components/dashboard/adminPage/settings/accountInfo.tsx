import { useRef, useState } from "react";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import {
  Badge,
  Button,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { shortenTransactionId } from "../../../../utils/helpers";
import ContactSupportModal from "../helpComponent/modal/sendMessageModal";
import FormInput from "../../../General/formInput";

interface ProfileSectionProps {
  profile: {
    user_id: string;
    profile_pic: string | null;
    company_name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    company_size: string;
    activeTab: "account" | "security";
    setActiveTab: (tab: "account" | "security") => void;
  };
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  const {
    user_id,
    profile_pic,
    company_name,
    email,
    first_name,
    last_name,
    phone_number,
    activeTab,
    company_size,
    setActiveTab,
  } = profile;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localImage, setLocalImage] = useState(profile_pic);
  const [modalOpen, setModalOpen] = useState(false);
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
          onError: (err) => console.error("Upload error:", err),
        }
      );
    };
    reader.readAsDataURL(file);
  };

  //   const [activeTab, setActiveTab] = useState<"account" | "security">("account");

  return (
    // <div className="space-y-6">
    <div className="bg-white p-6">
      {/* Profile Header */}
      <div
        className="bg-white rounded-lg p-6 w-full 
  grid gap-4 place-items-center 
  sm:flex sm:items-center sm:justify-between"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
          <div className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] border-4 border-orange-500 rounded-full overflow-hidden">
            <img
              src={localImage || "/avatar-placeholder.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center sm:text-left">
            <Badge
              color="orange"
              variant="filled"
              radius="md"
              size="sm"
              mb="md"
            >
              User ID: #{shortenTransactionId(user_id)}
            </Badge>

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
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {isLoading ? "Uploading..." : "Change profile picture"}
            </Button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
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
          className={`cursor-pointer border-b-2 pb-1 ${
            activeTab === "account"
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
          className={`cursor-pointer border-b-2 pb-1 ${
            activeTab === "security"
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
        <ContactSupportModal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <Title order={3} size="lg" fw={500} mb="md" c="#101928">
          ACCOUNT INFORMATION
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              First Name
            </Text>

            <FormInput
              type="text"
              paddingY={"0.7rem"}
              value={first_name}
              disabled
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Last Name
            </Text>

            <FormInput
              type="text"
              paddingY={"0.7rem"}
              value={last_name}
              disabled
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Email Address
            </Text>
            <FormInput
              type="email"
              paddingY={"0.7rem"}
              value={email}
              disabled
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Phone Number
            </Text>

            <FormInput
              type="tel"
              paddingY={"0.7rem"}
              value={phone_number}
              disabled
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Business Name
            </Text>

            <FormInput
              type="text"
              paddingY={"0.7rem"}
              value={company_name}
              disabled
            />
          </div>

          <div>
            {/* <label className="block text-sm text-gray-600 mb-1">Company Size</label>
            <select
              className="w-full border border-gray-200 rounded px-4 py-2"
              defaultValue={company_size}
              disabled
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> */}
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Company Size
            </Text>
            <Select
              placeholder="Select company size"
              data={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
              defaultValue={company_size}
              disabled
              styles={{
                label: {
                  fontSize: "16px",
                  color: "white",
                  marginBottom: "4px",
                },
                input: {
                  // borderWidth: borderWidthValue,
                  // borderColor: error ? "#D42620" : "#E5E7EB",
                  borderStyle: "solid",
                  borderRadius: "0.375rem",
                  backgroundColor: "#fff",
                  color: "#111827",
                  paddingLeft: "1rem",
                  paddingRight: "2.5rem",
                  paddingTop: "0.6rem",
                  paddingBottom: "0.6rem",
                  height: "auto",
                  minHeight: "2.5rem",
                  fontSize: "16px",
                  boxShadow: "none",
                  outline: "none",
                  "&::placeholder": { color: "#111827" },
                },
              }}
            />
          </div>
        </div>

        <Text
          size="sm"
          c="orange"
          mt="md"
          style={{ cursor: "pointer" }}
          onClick={() => setModalOpen(true)}
        >
          Contact support{" "}
          <Text
            component="span"
            c="black"
            inherit
            onClick={() => setModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            to edit your business profile
          </Text>
        </Text>
      </div>
    </div>
  );
}
