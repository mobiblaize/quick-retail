import { useRef, useState } from "react";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import { Text } from "@mantine/core";
import { shortenTransactionId } from "../../../../utils/helpers";
import ContactSupportModal from "../helpComponent/modal/sendMessageModal";

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
      <div className="bg-white rounded-lg s p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 border-4 border-orange-500 rounded-full overflow-hidden">
            <img
              src={localImage || "/avatar-placeholder.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
          <p className="text-sm font-normal text-[#ffffff] shadow-md bg-orange-500 py-1 pl-1 pr-1 rounded-lg">
              User ID: #{shortenTransactionId(user_id)}
            </p>
            <h2 className="text-xl font-medium text-gray-800">{company_name}</h2>
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
        <div className="border p-3 border-gray-200 rounded-lg mt-[2em]">
        <ContactSupportModal opened={modalOpen} onClose={() => setModalOpen(false)} />
          <h3 className="text-lg font-medium mb-4 text-[#101928]">ACCOUNT INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={first_name}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={last_name}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={email}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={phone_number}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Business Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={company_name}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Company Size</label>
              <select
                className="w-full border border-gray-200 rounded px-4 py-2"
                defaultValue={company_size}
                disabled
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          
          </div>

          <p className="mt-4 text-sm text-orange-500 cursor-pointer"  onClick={() => setModalOpen(true)}>
            Contact support <span className="text-[#000000]"  onClick={() => setModalOpen(true)}>to edit your business profile</span>
          </p>
        </div>
      </div>

  );
}
