"use client";

import { Field } from "formik";

interface CheckBoxFieldProps {
  label: string;
  name: string;
}

export default function CheckBoxField({ label, name }: CheckBoxFieldProps) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer">
      <Field
        type="checkbox"
        name={name}
        className="
          w-4 h-4
          accent-black
          cursor-pointer
        "
      />
      {label}
    </label>
  );
}
