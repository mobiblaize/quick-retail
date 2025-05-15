interface MessagePreviewProps {
    name: string;
    time: string;
    active?: boolean;
  }
  

export const SendSidebar = () => (
    <div className="w-[350px] border-r bg-white p-4 overflow-y-auto">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      <div className="space-y-4">
        <MessagePreview name="Olivia Rhye" time="03:34 PM" active />
        <MessagePreview name="Kristin Watson" time="03:34 PM" active={undefined} />
        <MessagePreview name="Bessie Cooper" time="03:34 PM" active={undefined} />
        {/* Add more MessagePreview components */}
      </div>
    </div>
  );
  
  const MessagePreview: React.FC<MessagePreviewProps> = ({ name, time, active }) => (
    <div className={`p-3 rounded-md cursor-pointer ${active ? 'bg-orange-100' : 'hover:bg-gray-100'}`}>
      <div className="flex justify-between items-center">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <p className="text-sm text-gray-500">Standardisation of Written</p>
    </div>
  );
  