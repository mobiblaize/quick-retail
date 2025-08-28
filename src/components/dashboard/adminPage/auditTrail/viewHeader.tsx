import { useRef, useState } from "react";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import Avatar from "../../../../assets/images/Avatar.png"

interface CauserProfile {
  profile_picture: string;
  firstname: string;
  lastname: string;
  email: string;
  store_name: string;
  roles: [];
  id: string;
}

interface ProfileHeaderProps {
  profile: CauserProfile;
}

export default function ViewHeader({ profile }: ProfileHeaderProps) {
  const { profile_picture, firstname, lastname, email, store_name, id, roles } =
    profile;
  const { mutate: updatePhoto } = useFetchPhoto();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localImage, setLocalImage] = useState<string | null>(null);
console.log(profile)
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      updatePhoto(formData);
      const imageUrl = URL.createObjectURL(file);
      setLocalImage(imageUrl);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow py-6 px-[3em] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 border-4 border-orange-500 rounded-full overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={localImage || profile_picture || Avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <p className="text-sm font-normal text-[#AD3307] shadow-md  py-1 px-2 bg-orange-100 rounded-lg">
              User ID: #{id}
            </p>
            <p className="text-sm font-normal text-[#04326B] shadow-md  py-1 px-2 bg-[#E3EFFC] rounded-lg">
              Role :{" "}
              {roles.length === 0 ? (
                <span>No roles</span>
              ) : (
                roles.map((role, index) => (
                  <span key={index}>
                    {typeof role === "object" && "display_name" in role
                      ? role.display_name
                      : String(role)}
                  </span>
                ))
              )}
            </p>
          </div>
          <h2 className="text-xl font-medium text-[#101828]">
            {firstname} {lastname}
          </h2>
          <p className="text-sm font-normal text-gray-500">{email}</p>
        </div>
      </div>
      <div className="flex items-end text-right shadow-md bg-[#D0D5DD] py-2 px-4 rounded-md">
        <p className="text-sm font-normal text-gray-500 ">
          Store:{" "}
          <span className="text-[#344054] font-medium">{store_name}</span>
        </p>
      </div>
    </div>
  );
}
