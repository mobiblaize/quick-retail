import { TextInput, Text, Group } from "@mantine/core";
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
  labelProps?: Record<string, any>;
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
  requiredColor = "red.6",
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
    <Group gap="xs" align="center">
      <Text size="sm" fw={500} c="gray.7">
        {label}
      </Text>
      {required && (
        <Text size="sm" c={requiredColor}>
          *
        </Text>
      )}
      {optional && (
        <Text size="sm" c="gray.5">
          (Optional)
        </Text>
      )}
    </Group>
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

  // if (type === "date") {
  //   return (
  //     <DateInput
  //       id={id}
  //       label={sharedLabel}
  //       value={value ? new Date(value) : undefined}
  //       onChange={(date) => {
  //         const formattedDate = date?.toISOString().split("T")[0] ?? "";
  //         const syntheticEvent = { target: { value: formattedDate } };
  //         onChange?.(syntheticEvent as any);
  //       }}
  //       placeholder={placeholder}
  //       required={required}
  //       name={name}
  //       error={error}
  //       readOnly={readOnly}
  //       className={className}
  //       styles={commonStyles}
  //       {...rest}
  //     />
  //   );
  // }
  if (type === "date") {
    return (
      <DateInput
        id={id}
        label={sharedLabel}
        value={value ? new Date(value) : undefined}
        onChange={(date) => {
          const formattedDate = date?.toISOString().split("T")[0] ?? "";
          onChange?.(formattedDate); // send plain string, not fake event
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
          <Group gap="xs" align="center">
            <Text size="sm" c="gray.5" {...(rest.labelProps || {})}>
              {label}
            </Text>
            {required && (
              <Text size="sm" c={requiredColor}>
                *
              </Text>
            )}
            {optional && (
              <Text size="sm" c="gray.5" fw={500}>
                (Optional)
              </Text>
            )}
          </Group>
        )
      }
      value={value}
      // onChange={onChange}
      // onChange={(event) => onChange?.(event.currentTarget.value)}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      placeholder={placeholder}
      required={required}
      name={name}
      readOnly={readOnly}
      error={error}
      leftSection={
        leftIcon ? (
          <div onClick={leftIconClick} style={{ cursor: "pointer" }}>
            {leftIcon}
          </div>
        ) : leftPrefix ? (
          <div
            style={{
              color: "#374151",
              fontSize: "14px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              height: "100%",
              borderRight: "1px solid #D1D5DB",
              borderRadius: "0.375rem 0 0 0.375rem",
            }}
          >
            {leftPrefix}
          </div>
        ) : undefined
      }
      rightSection={
        rightIcon && (
          <div onClick={rightIconClick} style={{ cursor: "pointer" }}>
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
