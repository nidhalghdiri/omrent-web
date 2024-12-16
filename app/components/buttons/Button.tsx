"use client";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  title: string;
  link?: boolean;
  href?: string;
  handleSubmit?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, link, href, handleSubmit }) => {
  return (
    <>
      {link ? (
        <Link className="tf-btn primary" href={href || ""}>
          {title}
        </Link>
      ) : (
        <button className="tf-btn primary w-100" onClick={handleSubmit}>
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
