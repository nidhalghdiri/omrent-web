"use client";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  options: {
    value: string;
    text: string;
  }[];
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  defaultValue,
  required,
  options,
  register,
  errors,
}) => {
  return (
    <fieldset className="box-fieldset">
      <label htmlFor={id}>
        {label}:{required && <span>*</span>}
      </label>
      <select
        className="nice-select"
        id={id}
        defaultValue={defaultValue}
        {...register(id, { required })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className={`option`}>
            {option.text}
          </option>
        ))}
      </select>
      <span>{errors[id] && "ERROR"}</span>
    </fieldset>
  );
};

export default Select;
