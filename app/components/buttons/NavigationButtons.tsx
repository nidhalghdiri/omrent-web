"use client";
import React from "react";
import { Button } from "primereact/button";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className="flex pt-4 justify-content-between">
      {!isFirstStep && (
        <Button
          label="Back"
          severity="secondary"
          className="tf-btn secondary"
          icon="pi pi-arrow-left"
          onClick={onBack}
        />
      )}
      {isLastStep ? (
        <Button
          label="Publish"
          icon="pi pi-arrow-right"
          className="tf-btn primary mx-2"
          iconPos="right"
          onClick={onNext}
        />
      ) : (
        <Button
          label="Next"
          icon="pi pi-arrow-right"
          className="tf-btn primary mx-2"
          iconPos="right"
          onClick={onNext}
        />
      )}
    </div>
  );
};

export default NavigationButtons;
