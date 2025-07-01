export default function ProfileHeader() {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/avatar-placeholder.jpg" // Replace with actual image path or dynamic image
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-medium text-gray-800">Victoria LLC</h2>
            <p className="text-sm font-normal text-gray-500">olivia@mailme.com</p>
            <button className="border border-gray-300 text-sm font-semibold  cursor-pointer text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
          Change profile picture
        </button>
          </div>
        
        </div>
      
      </div>
    )
  }
  