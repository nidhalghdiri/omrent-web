"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "./Input";
import Link from "next/link";
import Modal from "../layout/Modal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("Data", data);
    axios
      .post("api/register", data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <>
      <Input
        id="name"
        label="Username"
        type="text"
        defaultValue="Nidhal Ghdiri"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label="Email address"
        type="email"
        defaultValue="Ghdiri.nidhal@gmail.com"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        required
        register={register}
        errors={errors}
      />
      <fieldset className="d-flex align-items-center gap-6">
        <input type="checkbox" className="tf-checkbox style-2" id="cb1" />
        <label htmlFor="cb1" className="caption-1 text-variant-1">
          I agree to the <span className="fw-5 text-black">Terms of User</span>
        </label>
      </fieldset>
      <button
        type="submit"
        className="tf-btn primary w-100"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
      <div className="mt-12 text-variant-1 text-center noti">
        Already have an account?
        <a onClick={toggle} className="text-black fw-5">
          Login Here
        </a>
      </div>
    </>
  );

  return (
    <>
      <Modal
        isOpen={registerModal.isOpen}
        title="Register"
        body={bodyContent}
        onClose={registerModal.onClose}
      />
    </>
  );
};

export default RegisterModal;
