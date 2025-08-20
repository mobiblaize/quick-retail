import { TextInput } from "@mantine/core";
import { iInputField } from "./formTypes";
import { useRef } from "react";
import { DateInput } from "@mantine/dates"; 
import "dayjs/locale/en";

interface FlexibleInputField
  extends Omit<iInputField, "paddingX" | "paddingY" | "borderWidth"> {
  paddingX?: number | string;
  paddingY?: number | string;
  borderWidth?: number | string;
  leftPrefix?: string;
  onBlur?: () => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  leftIcon,
  rightIcon,
  leftIconClick,
  rightIconClick,
  required,
  optional,
  name,
  readOnly,
  bgColor = "white",
  borderWidth = "1px",
  color,
  // inputRef,
  fontSize = "16px",
  paddingX = 16,
  paddingY = "5px",
  className,
  id,
  leftPrefix,
  requiredColor = "text-red-600",
  onWheel,
  ...rest
}: FlexibleInputField) => {
  const normalizeDimension = (dimension: number | string | undefined) => {
    if (dimension === undefined) return "0.5rem";
    if (typeof dimension === "number") return `${dimension}px`;
    return dimension;
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const paddingXValue = normalizeDimension(paddingX);
  const paddingYValue = normalizeDimension(paddingY);
  const borderWidthValue = normalizeDimension(borderWidth);

  const handleWheel = () => {
    if (inputRef.current && type === "number") {
      inputRef.current.blur(); // Prevent scroll increment
    }
  };

  const sharedLabel = label && (
    <div className="flex items-center text-sm font-medium text-gray-700">
  
      {label}
      {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
      {optional && <span className="text-gray-500 pl-1">(Optional)</span>}
    </div>
  );

  const commonStyles = {
    wrapper: {
      width: "100%",
    },
    input: {
      borderWidth: borderWidthValue,
      backgroundColor: readOnly ? "#F2F4F7" : bgColor,
      color: readOnly ? "#6B7280" : error ? "#D42620" : color ?? "#111827",
      borderColor: readOnly ? "#D1D5DB" : "#E5E7EB",
      borderStyle: "solid",
      borderRadius: "0.375rem",
      paddingLeft: leftIcon || leftPrefix ? "2.5rem" : paddingXValue,
      paddingRight: rightIcon ? "2.5rem" : paddingXValue,
      paddingTop: paddingYValue,
      paddingBottom: paddingYValue,
      height: "auto",
      minHeight: "2.5rem",
      fontSize: fontSize,
      boxShadow: "none",
      outline: "none",
    },
  };

  if (type === "date") {
    return (
      <DateInput
        id={id}
        label={sharedLabel}
        value={value ? new Date(value) : undefined}
        onChange={(date) => {
          const formattedDate = date?.toISOString().split("T")[0] ?? "";
          const syntheticEvent = { target: { value: formattedDate } };
          onChange?.(syntheticEvent as any);
        }}
        placeholder={placeholder}
        required={required}
        name={name}
        error={error}
        readOnly={readOnly}
        className={className}
        styles={commonStyles}
        {...rest}
      />
    );
  }
  return (
    <TextInput
      id={id}
      ref={inputRef}
      onWheel={handleWheel}

      label={
        label && (
          <div className="flex items-center text-gray-500">
            {label}
            {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
            {optional && <span className="text-gray-500 pl-1 font-medium">(Optional)</span>}
          </div>
        )
      }
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      name={name}
      readOnly={readOnly}
      error={error}
      leftSection={
        leftIcon ? (
          <div onClick={leftIconClick} className="cursor-pointer">
            {leftIcon}
          </div>
        ) : leftPrefix ? (
          <div className="text-gray-700 text-sm px-3 flex items-center h-full  border-gray-200 rounded-l-md">
            {leftPrefix}
          </div>
        ) : undefined
      }
      rightSection={
        rightIcon && (
          <div onClick={rightIconClick} className="cursor-pointer">
            {rightIcon}
          </div>
        )
      }
      styles={{
        wrapper: {
          width: "100%",
        },
        input: {
          borderWidth: borderWidthValue,
          backgroundColor: readOnly ? "#F2F4F7" : bgColor,
          color: readOnly ? "#6B7280" : error ? "#D42620" : color ?? "#111827",
          borderColor: readOnly ? "#D1D5DB" : "#E5E7EB",
          borderStyle: "solid",
          borderRadius: "0.375rem",
          paddingLeft: leftIcon || leftPrefix ? "2.5rem" : paddingXValue,
          paddingRight: rightIcon ? "2.5rem" : paddingXValue,
          paddingTop: paddingYValue,
          paddingBottom: paddingYValue,
          height: "auto",
          minHeight: "2.5rem",
          fontSize: fontSize,
          boxShadow: "none",
          outline: "none",
          label: {
            color: error ? "#D42620" : color,
            fontSize: fontSize,
            marginBottom: "0.5rem",
          },
        },
      }}
      className={className}
      {...rest}
    />
  );
};

export default FormInput;
