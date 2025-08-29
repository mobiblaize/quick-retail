// import { useRef, useState } from "react";
// import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
// import Avatar from "../../../../assets/images/Avatar.png"

// interface CauserProfile {
//   profile_picture: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   store_name: string;
//   roles: [];
//   id: string;
// }

// interface ProfileHeaderProps {
//   profile: CauserProfile;
// }

// export default function ViewHeader({ profile }: ProfileHeaderProps) {
//   const { profile_picture, firstname, lastname, email, store_name, id, roles } =
//     profile;
//   const { mutate: updatePhoto } = useFetchPhoto();
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [localImage, setLocalImage] = useState<string | null>(null);
// console.log(profile)
//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("photo", file);
//       updatePhoto(formData);
//       const imageUrl = URL.createObjectURL(file);
//       setLocalImage(imageUrl);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow py-6 px-[3em] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//       <div className="flex items-center gap-4">
//         <div
//           className="w-20 h-20 border-4 border-orange-500 rounded-full overflow-hidden cursor-pointer"
//           onClick={handleImageClick}
//         >
//           <img
//             src={localImage || profile_picture || Avatar}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="hidden"
//         />
//         <div className="flex flex-col gap-3">
//           <div className="flex gap-4">
//             <p className="text-sm font-normal text-[#AD3307] shadow-md  py-1 px-2 bg-orange-100 rounded-lg">
//               User ID: #{id}
//             </p>
//             <p className="text-sm font-normal text-[#04326B] shadow-md  py-1 px-2 bg-[#E3EFFC] rounded-lg">
//               Role :{" "}
//               {roles.length === 0 ? (
//                 <span>No roles</span>
//               ) : (
//                 roles.map((role, index) => (
//                   <span key={index}>
//                   {/* @ts-ignore */}
//                     {typeof role === "object" && role?.name
//                       //  @ts-ignore
//                       ? role.name
//                       : String(role)}
//                   </span>
//                 ))
//               )}
//             </p>
//           </div>
//           <h2 className="text-xl font-medium text-[#101828]">
//             {firstname} {lastname}
//           </h2>
//           <p className="text-sm font-normal text-gray-500">{email}</p>
//         </div>
//       </div>
//       <div className="flex items-end text-right shadow-md bg-[#D0D5DD] py-2 px-4 rounded-md">
//         <p className="text-sm font-normal text-gray-500 ">
//           Store:{" "}
//           <span className="text-[#344054] font-medium">{store_name}</span>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import {
  Paper,
  Flex,
  Group,
  Avatar,
  Stack,
  Text,
  Box,
} from "@mantine/core";
import { useFetchPhoto } from "../../../../hooks/backendApis/admin/profile";
import AvatarImg from "../../../../assets/images/Avatar.png";

interface CauserProfile {
  profile_picture: string;
  firstname: string;
  lastname: string;
  email: string;
  store_name: string;
  roles: any[]; // kept flexible as before
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

  // Build role text exactly like original rendering:
  const roleText = (() => {
    if (!roles || roles.length === 0) return "No roles";
    return roles
      .map((role) =>
        typeof role === "object" && role?.name ? role.name : String(role)
      )
      .join(", ");
  })();


  // helper to render role(s) safely (same logic as your original)
  const renderRoles = () => {
    if (!roles || roles.length === 0) return <span>No roles</span>;

    return roles.map((role, index) => {
      // role may be object with .name or a string
      // preserve the original behavior
      const roleName =
        typeof role === "object" && role?.name ? role.name : String(role);
      return <span key={index}>{roleName}{index < roles.length - 1 ? ", " : ""}</span>;
    });
  };

  return (
    <Paper
      bg="white"
      radius="lg"
      shadow="sm"
      p="lg"
      style={(theme) => ({
        // replicate: bg-white rounded-lg shadow py-6 px-[3em] flex...
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        paddingLeft: "3em",
        paddingRight: "3em",
      })}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap="md"
      >
        {/* Left side: Avatar + details */}
        <Group align="center" gap="md">
          {/* clickable avatar wrapper */}
          <Box
            onClick={handleImageClick}
            style={{ cursor: "pointer", borderRadius: 9999, overflow: "hidden" }}
            aria-hidden
          >
            <Avatar
              src={localImage || profile_picture || AvatarImg}
              alt={`${firstname} ${lastname}`}
              size={80}
              radius="xl"
              style={{
                // border-4 border-orange-500 rounded-full overflow-hidden
                border: "4px solid #F97316", // matches tailwind border-orange-500
                objectFit: "cover",
              }}
            />
          </Box>

          {/* hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* details stack */}
          <Stack gap={6}>
            {/* top row: ID pill and role pill */}
            <Group gap="sm">
              <Box
                component="div"
                style={{
                  backgroundColor: "#FFECE5",
                  color: "#AD3307",
                  fontWeight: 500,
                  padding: "6px 10px",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              >
                User ID: #{id}
              </Box>

              <Box
                component="div"
                style={{
                  backgroundColor: "#E3EFFC",
                  color: "#04326B",
                  fontWeight: 500,
                  padding: "6px 10px",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              >
                Role: {roleText}
              </Box>
            </Group>

            {/* Name */}
            <Text fz="xl" fw={600} c="#101828">
              {firstname} {lastname}
            </Text>

            {/* Email */}
            <Text fz="sm" c="dimmed">
              {email}
            </Text>

            {/* Roles line (if you still want them under the email; comment out if not needed) */}
            <Text fz="sm" c="dimmed">
              Roles: {renderRoles()}
            </Text>
          </Stack>
        </Group>

        {/* Right side: store info */}
        <Paper
          radius="sm"
          p="xs"
          withBorder={false}
          style={{
            backgroundColor: "#D0D5DD",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            alignSelf: "flex-end",
          }}
        >
          <Text fz="sm" c="dimmed" style={{ textAlign: "right" }}>
            Store:{" "}
            <Text component="span" c="#344054" fw={600}>
              {store_name}
            </Text>
          </Text>
        </Paper>
      </Flex>
    </Paper>
  );
}
