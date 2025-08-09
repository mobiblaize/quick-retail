import { Text } from "@mantine/core";

interface ProfileDetailsProps {
  profile: {
    name: string;
    email: string;
    phone_number: string;
    company_name: string;
    company_size: string;
    app_selected: number;
  };
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  const {
    name,
    email,
    phone_number,
    company_name,
    company_size,
    app_selected,
  } = profile;

  const profileInfo = [
    { label: "Name", value: name },
    { label: "Email Address", value: email },
    { label: "Phone Number", value: phone_number },
    { label: "Company Name", value: company_name },
    { label: "Company Size", value: company_size },
    { label: "Apps Selected", value: app_selected },
  ];

  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="border-b px-6 py-3 border-gray-200">
        <Text size="lg" fw={600} c="secondary.9">PROFILE DETAILS</Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-sm">
        {profileInfo.map(({ label, value }) => (
          <div key={label}>
            <Text size="lg" fw={600} c="textSecondary.9">{label}</Text>
            <Text size="md" fw={600} c="secondary">{value}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
