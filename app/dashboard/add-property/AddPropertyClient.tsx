"use client";
import SideBarMenu from "@/app/components/layout/SideBarMenu";
import StepperContainer from "@/app/components/layout/StepperContainer";
import { SafeUser } from "@/app/types";
import Link from "next/link";
import React from "react";

interface AddPropertyClientProps {
  currentUser: SafeUser | null;
}

const AddPropertyClient: React.FC<AddPropertyClientProps> = ({
  currentUser,
}) => {
  return (
    <div>
      <div className="main-content">
        <div className="main-content-inner d-flex">
          <SideBarMenu />
          <div className="w-100  m-2">
            <StepperContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyClient;
