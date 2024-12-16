"use client";
import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  defaultValue,
  required,
  placeholder,
}) => {
  return (
    <fieldset className="box box-fieldset mb-2">
      <label htmlFor={id}>
        {label}:{required && <span>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className="textarea-tinymce"
          name="area"
          id={id}
          defaultValue={defaultValue || ""}
          placeholder={placeholder || ""}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="form-control style-1"
          defaultValue={defaultValue || ""}
          placeholder={placeholder || ""}
        />
      )}
    </fieldset>
  );
};

export default Input;
