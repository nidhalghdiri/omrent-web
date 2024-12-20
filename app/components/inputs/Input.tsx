"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  defaultValue,
  required,
  placeholder,
  register,
  errors,
}) => {
  return (
    <fieldset className="box box-fieldset mb-2">
      <label htmlFor={id}>
        {label}:{required && <span>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className="textarea-tinymce"
          id={id}
          defaultValue={defaultValue || ""}
          placeholder={placeholder || ""}
          {...register(id, { required })}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="form-control style-1"
          defaultValue={defaultValue || ""}
          placeholder={placeholder || ""}
          {...register(id, { required })}
        />
      )}
      <span>{errors[id] && "ERROR"}</span>
    </fieldset>
  );
};

export default Input;
