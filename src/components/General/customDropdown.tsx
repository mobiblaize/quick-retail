import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CustomDropdownProps {
  options: string[];
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  optional?: boolean;
  textColorClass?: string;
  fieldColorClass?: string;
  required?: boolean;
  inputSizeClass?: string;
  IconComponent?: React.ReactNode;
}

const CustomDropdown = ({
  options,
  label,
  value,
  onChange,
  placeholder = "Select an option",
  optional,
  required,
   textColorClass,
  fieldColorClass,
  inputSizeClass,
  IconComponent,
}: CustomDropdownProps) => {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (val: string) => {
    setSelected(val);
    onChange(val);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-[#D42620] pl-1">*</span>}
          {optional && <span className="text-[#787486] pl-1">(Optional)</span>}
        </label>
      )}

      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-md border border-gray-300
  ${inputSizeClass || "py-2 sm:py-[0.9em]"} 
  pl-4 pr-10 text-left shadow-sm 
  text-sm sm:text-sm text-gray-700 
  ${fieldColorClass || "bg-white"}`}
          >
            {/* <span className={`${selected ? "text-gray-700" : "text-gray-400"}`}>
              {selected || placeholder}
            </span> */}
            <span className={textColorClass || (selected ? "text-gray-700" : "text-gray-400")}>
  {selected || placeholder}
</span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {IconComponent || <ChevronDown size={16} />}
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-100 text-black" : "text-gray-700"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute left-2 inset-y-0 flex items-center text-indigo-600">
                        <Check size={16} />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomDropdown;
