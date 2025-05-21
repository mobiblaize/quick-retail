import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: number;
}

interface CustomDropdownProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value: number | null;
  onChange: (val: number) => void;
  required?: boolean;
  textColorClass?: string;
}

const Dropdown = ({
  options,
  label,
  placeholder = "Select...",
  value,
  onChange,
  required,
  textColorClass,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
    <div className={`relative w-full`} ref={dropdownRef}>
      {label && (
        <label className={`block mb-1 font-medium text-gray-700`}>
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          textColorClass || "text-black"
        }`}
      >
        {selectedOption ? selectedOption.label : <span className="text-gray-400">{placeholder}</span>}
        <span className="float-right">▾</span>
      </button>

      {open && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`cursor-pointer select-none px-4 py-2 hover:bg-blue-600 hover:text-white ${
                value === opt.value ? "bg-blue-500 text-white" : "text-black"
              }`}
              role="option"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
