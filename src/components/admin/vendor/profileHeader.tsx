import { useRef, useState } from "react";
import { useFetchPhoto } from "../../../hooks/backendApis/admin/profile";


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
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 border-4 border-orange-500 rounded-full overflow-hidden">
        <img
          src={localImage || "/avatar-placeholder.jpg"}
          // alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
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
);
}