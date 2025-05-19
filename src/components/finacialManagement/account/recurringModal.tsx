import { useState } from 'react';
import { Modal } from '@mantine/core';
import { ChevronDown, PlusIcon } from 'lucide-react';
import CustomDropdown from '../../General/customDropdown';
// import { IconPlus } from '@tabler/icons-react'; // optional icon library

interface ReoccurringJournalModalProps {
  opened: boolean;
  onClose: () => void;
}

const ReoccurringJournalModal = ({ opened, onClose }: ReoccurringJournalModalProps) => {
  const [formData, setFormData] = useState({
    repeatOption: '',
    startDate: '',
    endDate: '',
    figure: '',
    customizeSelection: '',
  });

  const [customizeEnabled, setCustomizeEnabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCustomization = () => {
    setCustomizeEnabled((prev) => !prev);
    // Optional: clear fields when removed
    if (customizeEnabled) {
      setFormData((prev) => ({
        ...prev,
        figure: '',
        customizeSelection: '',
      }));
    }
  };
  const [selectedType, setSelectedType] = useState("");
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Set Reoccurring Journal Parameters"
      size="lg"
      radius="lg" // adds rounded edges
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
    >
      <div className="space-y-6">
        {/* Repeat Option */}
        <div>
        <div
              className="curor-pointer"
            //   onClick={() => setShowAllocatedModal(true)}
            >
              <CustomDropdown
                label="Repeat Option"
                options={["Every Day", "Every 3 Days", "Every 7 Days/Week", "Every 14 Days/Week", "Every 1 month", "yearly", "customise"]}
                placeholder="Select"
                value={selectedType}
                onChange={(val) => setSelectedType(val)}
                IconComponent={<ChevronDown size={16} color="white" />}
                textColorClass="text-black"
              />
            </div>  
          
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Optional: Customization Fields */}
        {customizeEnabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter Figure</label>
              <input
                type="text"
                name="figure"
                placeholder="3 days"
                value={formData.figure}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customize Selection</label>
              <select
                name="customizeSelection"
                value={formData.customizeSelection}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        )}

        {/* Toggle Customization Button */}
        <button
          onClick={toggleCustomization}
          className={`text-sm font-medium ${
            customizeEnabled ? 'text-red-500 hover:underline' : 'text-orange-500 hover:underline'
          } flex items-center space-x-1`}
        >
          {customizeEnabled ? (
            <>— Remove Customization</>
          ) : (
            <>
              <PlusIcon size={16} />
              <span>Add Customization</span>
            </>
          )}
        </button>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md font-medium hover:bg-orange-100"
          >
            Back
          </button>
          <button className="px-6 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600">
            Set Parameters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReoccurringJournalModal;
