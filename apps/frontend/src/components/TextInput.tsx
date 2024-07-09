import React from "react";

type TextInputProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
};

const TextInput = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: TextInputProps) => (
  <div className="flex justify-center">
    <div className="w-full ">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="border p-2 w-full"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="border p-2 w-full"
        />
      )}
    </div>
  </div>
);

export default TextInput;
