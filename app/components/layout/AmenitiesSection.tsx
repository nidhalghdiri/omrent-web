"use client";

import React, { useCallback, useState } from "react";
import Button from "../buttons/Button";
import { SafeAmenity, SafeAmenityCategory } from "@/app/types";

interface AmenitiesSectionProps {
  amenities: SafeAmenityCategory[];
  selectedAmenities: string[];
  handleAmenityToggle: (id: string) => void;
  onSaveAmenities: () => void;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities,
  onSaveAmenities,
  selectedAmenities,
  handleAmenityToggle,
}) => {
  return (
    <div className="widget-box-2">
      <h6 className="title">
        Amenities<span>*</span>
      </h6>
      <Button title="Add Amenities" handleSubmit={onSaveAmenities} />
      <div className="box-amenities-property">
        {amenities.map((category) => (
          <div className="box-amenities" key={category.id}>
            <div className="title-amenities fw-7">{category.name}:</div>

            {category.amenities.map((amenity) => (
              <fieldset className="amenities-item" key={amenity.id}>
                <input
                  type="checkbox"
                  className="tf-checkbox style-1 primary"
                  id={amenity.id}
                  checked={selectedAmenities?.includes(amenity.id) || false}
                  onChange={() => handleAmenityToggle(amenity.id)}
                />
                <label htmlFor={amenity.id} className="text-cb-amenities">
                  <span className={`icon ${amenity.icon}`} /> {amenity.name}
                </label>
              </fieldset>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
