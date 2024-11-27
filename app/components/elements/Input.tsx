"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  defaultValue,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <fieldset className="box-fieldset">
      <label htmlFor="name">
        {label}
        {required && <span>*</span>}:
      </label>
      {type === "password" && (
        <div className="box-password">
          <input
            id={id}
            type={type}
            className={`form-contact style-1 password-field`}
            {...register(id, { required })}
            // ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          />
          <span className="show-pass">
            <i className="icon-pass icon-eye" />
            <i className="icon-pass icon-eye-off" />
          </span>
        </div>
      )}
      {(type === "email" || type === "text") && (
        <input
          id={id}
          type={type}
          className={`form-contact style-1`}
          {...register(id, { required })}
          placeholder={defaultValue}
          // ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        />
      )}
    </fieldset>
  );
};

export default Input;
