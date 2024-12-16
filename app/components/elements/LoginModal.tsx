"use client";
import React, { useCallback } from "react";
import Input from "./LoginInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "../layout/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../buttons/Button";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("OnSubmit Data", data);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        console.log("OnSubmit Data", "callback OK");
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        console.log("OnSubmit Data", "callback Error: " + callback.error);
        toast.error(callback.error);
      }
    });
  };
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal]);

  const bodyContent = (
    <>
      <Input
        id="email"
        label="Email"
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
      <div className="d-flex justify-content-between flex-wrap gap-12">
        <fieldset className="d-flex align-items-center gap-6">
          <input type="checkbox" className="tf-checkbox style-2" id="cb1" />
          <label htmlFor="cb1" className="caption-1 text-variant-1">
            Remember me
          </label>
        </fieldset>
        <Link href="#" className="caption-1 text-primary">
          Forgot password?
        </Link>
      </div>
      <div className="text-variant-1 auth-line">or sign up with</div>
      <div className="login-social">
        <Link href="#" className="btn-login-social">
          <img src="/images/logo/fb.jpg" alt="img" />
          Continue with Facebook
        </Link>
        <Link href="#" className="btn-login-social">
          <img src="/images/logo/google.jpg" alt="img" />
          Continue with Google
        </Link>
      </div>
      {/* <button className="tf-btn primary w-100" onClick={handleSubmit(onSubmit)}>
        Login
      </button> */}
      <Button title="Login" handleSubmit={handleSubmit(onSubmit)} />
      <div className="mt-12 text-variant-1 text-center noti">
        Not registered yet?
        <a onClick={toggle} className="text-black fw-5">
          Sign Up
        </a>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Log In"
      body={bodyContent}
      onClose={loginModal.onClose}
    />
  );
};

export default LoginModal;
