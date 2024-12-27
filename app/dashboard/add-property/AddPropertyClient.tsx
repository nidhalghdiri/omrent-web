"use client";
import SideBarMenu from "@/app/components/layout/SideBarMenu";
import StepperContainer from "@/app/components/layout/StepperContainer";
import { SafeAmenity, SafeAmenityCategory, SafeUser } from "@/app/types";
import Link from "next/link";
import React from "react";

interface AddPropertyClientProps {
  currentUser: SafeUser | null;
  amenities: SafeAmenityCategory[];
}

const AddPropertyClient: React.FC<AddPropertyClientProps> = ({
  currentUser,
  amenities,
}) => {
  return (
    <div>
      <div className="main-content">
        <div className="main-content-inner d-flex">
          <SideBarMenu />
          <div className="w-100  mx-2">
            <StepperContainer amenities={amenities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyClient;
