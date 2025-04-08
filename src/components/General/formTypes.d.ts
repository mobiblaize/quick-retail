interface iOTP {
  OTP: string;
  setOTP: Dispatch<string>;
  length?: number;
  width?: string;
  height?: string;
  textColor?: string;
  bgColor?: string;
  borderWidth?: number;
  borderColor?: string;
  inputType?: "text" | "password" | "tel" | "number";
}

interface iFormProps {
  label?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  requiredColor?: string;
  optional?: boolean;
  name?: string;
  readOnly?: boolean;
  bgColor?: string;
  borderWidth?: number;
  borderColor?: string;
  className?: string;
  color?: string;
  inputRef?: RefObject<HTMLInputElement> | null;
  fontSize?: string;
  min?: number;
  max?: number;
  paddingX?: string;
  paddingY?: string;
  labelPosition?: "block" | "flex";
  id?: string;
}

interface iInputField extends iFormProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
}

interface iCheckForm extends iFormProps {
  checked?: boolean;
  setChecked?: boolean;
  callback?: () => void;
}

interface iSelect extends iFormProps {
  onSelect?: ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
  labelPosition?: "flex" | "block";
  labelGap?: string;
}

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

export interface OrderCreationContextType {
  currentStep: OrderCreationStep;
  nextStep: () => void;
  prevStep: () => void;
}
