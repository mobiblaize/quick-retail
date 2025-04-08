import { TextInput } from "@mantine/core";
import { iInputField } from "./formTypes";

interface FlexibleInputField
  extends Omit<iInputField, "paddingX" | "paddingY" | "borderWidth"> {
  paddingX?: number | string;
  paddingY?: number | string;
  borderWidth?: number | string;
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
  inputRef,
  fontSize = "16px",
  paddingX = 16,
  paddingY = "5px",
  className,
  id,
  requiredColor = "text-red-600",
  ...rest
}: FlexibleInputField) => {
  const normalizeDimension = (dimension: number | string | undefined) => {
    if (dimension === undefined) return "0.5rem";
    if (typeof dimension === "number") return `${dimension}px`;
    return dimension;
  };

  const paddingXValue = normalizeDimension(paddingX);
  const paddingYValue = normalizeDimension(paddingY);
  const borderWidthValue = normalizeDimension(borderWidth);

  return (
    <TextInput
      id={id}
      ref={inputRef}
      type={type}
      label={
        label && (
          <div className="flex items-center">
            {label}
            {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
            {optional && <span className="text-gray-500 pl-1">(Optional)</span>}
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
        leftIcon && (
          <div onClick={leftIconClick} className="cursor-pointer">
            {leftIcon}
          </div>
        )
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
          backgroundColor: bgColor,
          color: error ? "#D42620" : color,
          borderWidth: borderWidthValue,
          borderStyle: "solid",
          borderRadius: "0.375rem",
          paddingLeft: leftIcon ? "2.5rem" : paddingXValue,
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
