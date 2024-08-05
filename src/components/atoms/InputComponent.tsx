import React, { useState } from 'react';
import EyeHideIcon from './Svg/EyeHide';
import EyeSvg from './Svg/Eye';

interface InputComponentProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  readonly?: boolean;
  min?: string;
  disabled?: boolean;
  max?: string;
}

export default function InputComponent({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
  maxLength,
  minLength,
  required,
  readonly,
  min,
  disabled,
  max
}: InputComponentProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={className}>
      <label className="text-sm font-semibold text-logoColorBlue">
        {label}
      </label>
      <div className="relative">
        <input
          readOnly={readonly}
          name={name}
          required={required}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          disabled={disabled}
          className={`mt-1 w-full rounded-md border px-2 py-3 text-sm text-logoColorBlue placeholder:text-slate-400 focus:border-logoColorGreen focus:outline-none lg:py-3 ${error ? 'border-red-500' : 'border-logoColorBlue'}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 pt-1 text-sm text-logoColorBlue focus:outline-none"
          >
            {isPasswordVisible ? <EyeHideIcon /> : <EyeSvg />}
          </button>
        )}
      </div>
      {error && <p className="absolute text-xs md:text-sm text-red-500">{error}</p>}
    </div>
  );
}
