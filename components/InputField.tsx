"use client";

import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>

      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="
          w-full
          px-4 py-3
          rounded-xl
          border border-gray-300
          text-gray-800
          shadow-sm
          transition-all
          outline-none
          focus:ring-4 focus:ring-blue-200
          focus:border-blue-500
          bg-gray-50
          hover:border-gray-400
        "
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
}
