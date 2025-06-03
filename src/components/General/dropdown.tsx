import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: number;
}

interface CustomDropdownProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value: string | number | null;
  onChange: (val: string | number) => void;
  required?: boolean;
  textColorClass?: string;
  inputSizeClass?: string;
  bgColorClass?: string;
  hoverBgColorClass?: string;
  selectedBgColorClass?: string;
  selectedTextColorClass?: string;
  IconComponent?: React.ReactNode;
}

const Dropdown = ({
  options,
  label,
  placeholder = "Select...",
  value,
  onChange,
  required,
  textColorClass = "text-black",
  inputSizeClass = "py-2 px-4",
  bgColorClass = "bg-white",
  hoverBgColorClass = "hover:bg-gray-300",
  selectedBgColorClass = "bg-gray-300",
  selectedTextColorClass = "text-white",
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full p-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none ${inputSizeClass} ${bgColorClass} ${textColorClass}`}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <span className="">{placeholder}</span>
        )}
        {/* <span className="float-right">▾</span> */}
      </button>

      {open && (
        <ul
          className="absolute z-10 mt-1 w-full border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto bg-white"
          role="listbox"
        >
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <li
                key={opt.value}
                className={`cursor-pointer select-none px-2 py-2 ${
                  isSelected
                    ? `${selectedBgColorClass} ${selectedTextColorClass}`
                    : "text-black"
                } ${!isSelected && hoverBgColorClass}`}
                role="option"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
