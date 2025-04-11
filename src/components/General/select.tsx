import { iSelect } from "./formTypes";

const FormSelect = ({
  label,
  options,
  value,
  error,
  placeholder,
  onSelect,
  name,
  className,
  bgColor = "white",
  borderWidth,
  borderColor,
  color,
  required,
  optional,
  leftIcon,
  rightIcon,
  leftIconClick,
  rightIconClick,
  readOnly,
  paddingX,
  paddingY,
  fontSize,
  labelPosition = "block",
  requiredColor = "text-[#D42620]",
  labelGap = "gap-4",
  ...rest
}: iSelect) => {
  return (
    <div
      className={`${
        labelPosition === "flex" ? `flex items-center ${labelGap}` : ""
      }`}
    >
      {label && (
        <label
          style={{ color: (error && "#D42620") || color }}
          className={`${
            labelPosition === "flex" ? "whitespace-nowrap" : "block"
          } text-${fontSize} font-normal`}
        >
          {label}{" "}
          {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
          {optional && <span className="text-[#787486] pl-1">(Optional)</span>}
        </label>
      )}
      <div className="relative flex-1">
        {leftIcon && (
          <span
            onClick={leftIconClick}
            className="absolute left-0 px-3 bottom-0 flex items-center justify-center h-full cursor-pointer"
          >
            {leftIcon}
          </span>
        )}
        <select
          value={value}
          onChange={onSelect}
          name={name}
          disabled={readOnly}
          className={`block px-${paddingX ? paddingX : "4"} py-${
            paddingY ? paddingY : "2"
          } rounded-md border-[#D0D5DD] w-full border-[1px] ${
            error
              ? "border-[#D42620]"
              : value
              ? "border-[#FFD68F]"
              : "dark:border-borderDark border-borderLight"
          } dark:text-gray_3 text-gray_4 ${className} ${
            leftIcon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""}`}
          style={{
            backgroundColor: bgColor || "#F9FAFB",
            borderWidth: borderWidth || 1,
            borderColor: borderColor,
            color: (error && "#D42620") || color,
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" style={{ color: "#98A2B3" }}>
              {placeholder}
            </option>
          )}
          {options?.map((option, ind) => (
            <option className="" key={ind} value={option}>
              {option}
            </option>
          ))}
        </select>

        {rightIcon && (
          <span
            onClick={rightIconClick}
            className="absolute right-0 px-3 bottom-0 flex items-center justify-center h-full cursor-pointer"
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <div className="mt-1" style={{ color: "#D42620" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
