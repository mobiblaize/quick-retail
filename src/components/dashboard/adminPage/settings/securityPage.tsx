import { useRef, useState } from "react";
import { Text } from "@mantine/core";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import EditIcon from "../../../../assets/images/EditIcon.png";
import ChangePasswordModal from "./changePasswordModal";
import SecurityQuestionModal from "./securityModal";

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
        <div className="flex items-center gap-4">
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
      <div className="border p-3 border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-[#101928]">SECURITY</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
  className="flex items-center text-sm text-gray-600 mb-1 border border-gray-200 p-4 gap-2 cursor-pointer hover:bg-gray-50"
  onClick={() => setModalOpen(true)}
>
  <img src={EditIcon} alt="lock icon" className="w-5 h-5" />
  Change my Password
</div>


          <div className="flex items-center text-sm text-gray-600 mb-1 border border-gray-200 p-4 gap-2" 
            onClick={() => setModalOpen2(true)}>
            <img src={EditIcon} alt="lock icon" className="w-5 h-5" />
            Security Question
          </div>
        </div>
      </div>
    </div>
  );
}
