const profileInfo = [
    { label: "Name", value: "Grateful Ehis" },
    { label: "Email Address", value: "grateful@gmail.com" },
    { label: "Phone Number", value: "+234 7269456" },
    { label: "Company Name", value: "Victoria LLC" },
    { label: "Company Size", value: "Small" },
    { label: "Apps Selected", value: "4" },
  ]
  
  export default function ProfileDetails() {
    return (
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="border-b px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-700">PROFILE DETAILS</h3>
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
    )
  }
  