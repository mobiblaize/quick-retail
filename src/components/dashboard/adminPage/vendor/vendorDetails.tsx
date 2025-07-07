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
        <h3 className="text-sm font-medium text-gray-700">PROFILE DETAILS</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-sm">
        {profileInfo.map(({ label, value }) => (
          <div key={label}>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
