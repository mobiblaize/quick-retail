interface CauserProfile {
  store_name: string;
  roles: [];
  id: string;
  created_at: string;
  log_name: string;
  action_module: string;
  ip_address: string;

  store_address: string;
  action_type: string;
}

interface ProfileHeaderProps {
  profile: CauserProfile;
}

export default function ViewDetails({ profile }: ProfileHeaderProps) {
  const {
 
    store_name,
    id,
    created_at,
    log_name,
    action_module,
    ip_address,
    store_address,
    action_type,
  } = profile;

  const profileInfo = [
    { label: "Audit ID", value: id },
    { label: "Timestamp", value: created_at },
    { label: "Activity", value: log_name },
    { label: "Activity Status", value:log_name  },
    { label: "Module", value: action_module },
    { label: "Store/Warehouse", value: store_name },
    { label: "IP Address", value: ip_address },
    { label: "Location", value: store_address },
    { label: "Browser", value: action_type },
  ];

  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="border-b px-6 py-3 border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          AUDIT TRAIL DETAILS
        </h3>
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
