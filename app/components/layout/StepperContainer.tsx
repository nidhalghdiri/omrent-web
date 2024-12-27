"use client";
import React, { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Link from "next/link";
import "@/node_modules/primereact/resources/themes/mdc-light-indigo/theme.css";
import "@/node_modules/primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationButtons from "../buttons/NavigationButtons";
import Button from "../buttons/Button";
import { SafeAmenity, SafeAmenityCategory } from "@/app/types";
import AmenitiesSection from "./AmenitiesSection";

const propertyTypes = [
  { value: "apartment", text: "Apartment" },
  { value: "villa", text: "Villa" },
  { value: "commercial", text: "Commercial" },
];
const propertyCountries = [
  { value: "om", text: "Oman" },
  { value: "usa", text: " United States" },
  { value: "uk", text: "United Kingdom" },
  { value: "rus", text: "Russia" },
];
const propertyStates = [
  { value: "none", text: "None" },
  { value: "salalah", text: "Salalah" },
  { value: "texas", text: "Texas" },
  { value: "newyork", text: "New York" },
];

const rentCycles = [
  { value: "year", text: "Yearly" },
  { value: "month", text: "Monthly" },
  { value: "day", text: "Daily" },
];

interface StepperContainerProps {
  amenities: SafeAmenityCategory[];
}

const StepperContainer: React.FC<StepperContainerProps> = ({ amenities }) => {
  const stepperRef = React.useRef<any>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form Handling
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      type: "apartment",
      description: "",
      country: "om",
      state: "salalah",
      address: "",
      location: null,
      propertyId: "",
      size: "",
      roomCount: 1,
      bathroomCount: 1,
      price: 0,
      rentCycle: "year",
      guestCount: 1,
      thumbnailSrc: "",
      galleryImages: [],
      amenities: [],
    },
  });
  const thumbnailSrc = watch("thumbnailSrc");
  const galleryImages = watch("galleryImages");
  const selectedAmenities = watch("amenities");
  const setCustomValue = (id: string, value: any) => {
    if (id === "galleryImages") {
      // Append new image(s) to the existing array
      const currentImages = watch("galleryImages") || [];
      const updatedImages = Array.isArray(value)
        ? [...currentImages, ...value] // If multiple files are uploaded
        : [...currentImages, value]; // If a single file is uploaded
      setValue(id, updatedImages, { shouldValidate: true });
    } else {
      // Handle other fields normally
      setValue(id, value, { shouldValidate: true });
    }
    console.log(`Setting ${id} to`, watch(id)); // Log updated value
  };
  const handleAmenityToggle = (id: string) => {
    const currentAmenities = watch("amenities") || [];
    const updatedAmenities = currentAmenities.includes(id)
      ? currentAmenities.filter((amenityId: string) => amenityId !== id) // Deselect
      : [...currentAmenities, id]; // Select
    setValue("amenities", updatedAmenities, { shouldValidate: true });
    console.log("Selected Amenities:", updatedAmenities); // Debugging
  };
  // Submission Handler
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    const validatedData = {
      ...data,
      roomCount: parseInt(data.roomCount, 10),
      bathroomCount: parseInt(data.bathroomCount, 10),
      price: parseInt(data.price, 10),
      state: data.state || "Unknown", // Default value
      location: data.location || "Unknown", // Default value
      thumbnailSrc: data.thumbnailSrc, // Store Cloudinary URL
      galleryImages: data.galleryImages,
    };
    console.log("validated Data:", validatedData);
    axios
      .post("../api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.push("/");
        reset();
      })
      .catch(() => {
        // toast.error("Somthing went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveAmenities = () => {
    setIsLoading(true);

    var data = {
      categories: [
        {
          name: "Home safety",
          amenities: [
            { name: "Smoke alarm", icon: "icon-smoke-alarm" },
            { name: "Carbon monoxide alarm", icon: "icon-carbon" },
            { name: "First aid kit", icon: "icon-kit" },
            { name: "Self check-in with lockbox", icon: "icon-lockbox" },
            { name: "Security cameras", icon: "icon-security" },
          ],
        },
        {
          name: "Bedroom",
          amenities: [
            { name: "Hangers", icon: "icon-hanger" },
            { name: "Bed linens", icon: "icon-bed-line" },
            { name: "Extra pillows & blankets", icon: "icon-pillows" },
            { name: "Iron", icon: "icon-iron" },
            { name: "TV with standard cable", icon: "icon-tv" },
          ],
        },
        {
          name: "Kitchen",
          amenities: [
            { name: "Refrigerator", icon: "icon-refrigerator" },
            { name: "Microwave", icon: "icon-microwave" },
            { name: "Dishwasher", icon: "icon-microwave" },
            { name: "Coffee maker", icon: "icon-coffee" },
          ],
        },
      ],
    };

    // Validate and structure the data
    const validatedData = {
      categories: data.categories.map((category: any) => ({
        name: category.name,
        amenities: category.amenities.map((amenity: any) => ({
          name: amenity.name,
          icon: amenity.icon || null, // Default to null if icon is not provided
        })),
      })),
    };

    axios
      .post("../api/amenities", validatedData)
      .then(() => {
        toast.success("Categories and amenities saved successfully!");
        reset(); // Reset the form after successful submission
      })
      .catch((error) => {
        console.error("Error saving categories and amenities:", error);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PrimeReactProvider>
      <div className="main-content-inner" style={{ flexBasis: "50rem" }}>
        <Stepper
          ref={stepperRef}
          unstyled={false}
          orientation="horizontal"
          headerPosition="right"
        >
          {/* Step 1 */}
          <StepperPanel header="Basis">
            <div className="widget-box-2">
              <h6 className="title">Property Basis</h6>
              <div className="box-info-property">
                <div className="box grid-2 gap-30">
                  <Input
                    id="title"
                    label="Title"
                    required
                    type="text"
                    placeholder="Spacious 2-Bedroom Apartment"
                    register={register}
                    errors={errors}
                  />
                  <Select
                    register={register}
                    errors={errors}
                    id="type"
                    label="Property Type"
                    defaultValue="apartment"
                    options={propertyTypes}
                  />
                </div>
                <Input
                  register={register}
                  errors={errors}
                  id="description"
                  label="Description"
                  type="textarea"
                />
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <NavigationButtons
                isFirstStep
                onNext={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.nextCallback();
                }}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 2 */}
          <StepperPanel header="Details">
            <div>
              <div className="widget-box-2">
                <h6 className="title">Property Details</h6>
                <div className="box-info-property">
                  <div className="box grid-3 gap-30 mb-2">
                    <Select
                      register={register}
                      errors={errors}
                      id="country"
                      label="Country"
                      defaultValue="om"
                      options={propertyCountries}
                      required
                    />
                    <Select
                      register={register}
                      errors={errors}
                      id="state"
                      label="Province/State"
                      defaultValue="salalah"
                      options={propertyStates}
                      required
                    />
                    <Input
                      register={register}
                      errors={errors}
                      id="address"
                      label="Full Address"
                      required
                      type="text"
                      placeholder="Enter property full address"
                    />
                  </div>
                  <div className="box box-fieldset mb-2">
                    <label htmlFor="location">
                      Location:<span>*</span>
                    </label>
                    <div className="box-ip">
                      <input type="text" className="form-control style-1" />
                      <Link href="#" className="btn-location">
                        <i className="icon icon-location" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget-box-2">
                <h6 className="title">Addtional Information</h6>
                <div className="box grid-2 gap-30 mb-2">
                  <Input
                    register={register}
                    errors={errors}
                    id="propertyId"
                    label="Property ID"
                    type="text"
                  />
                  <Input
                    register={register}
                    errors={errors}
                    id="size"
                    label="Size (SqFt)"
                    type="text"
                  />
                </div>
                <div className="box grid-2 gap-30 mb-2">
                  <Input
                    register={register}
                    errors={errors}
                    id="roomCount"
                    label="Rooms"
                    type="text"
                    required
                  />
                  <Input
                    register={register}
                    errors={errors}
                    id="bathroomCount"
                    label="Bathrooms"
                    type="text"
                    required
                  />
                </div>
              </div>
              <AmenitiesSection
                amenities={amenities}
                onSaveAmenities={saveAmenities}
                selectedAmenities={selectedAmenities}
                handleAmenityToggle={handleAmenityToggle}
              />
            </div>
            <div className="flex pt-4 justify-content-between">
              <NavigationButtons
                onBack={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.prevCallback();
                }}
                onNext={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.nextCallback();
                }}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 3 */}
          <StepperPanel header="Availability">
            <div className="widget-box-2">
              <h6 className="title">Pricing and Availability</h6>
              <div className="box-price-property">
                <div className="box grid-2 gap-30 mb-2">
                  <Input
                    register={register}
                    errors={errors}
                    id="price"
                    label="Price"
                    type="text"
                    required
                    placeholder="Example value: 12345.67"
                  />

                  <Select
                    register={register}
                    errors={errors}
                    id="rentCycle"
                    label="Rent Cycle"
                    defaultValue="year"
                    options={rentCycles}
                  />
                </div>
                <fieldset className="box-cb d-flex align-items-center gap-6">
                  <input type="checkbox" className="tf-checkbox" id="cb-ip" />
                  <label htmlFor="cb-ip">Price to Call</label>
                </fieldset>
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <NavigationButtons
                onBack={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.prevCallback();
                }}
                onNext={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.nextCallback();
                }}
              />
            </div>
          </StepperPanel>
          {/* Placeholder for Step 4 */}
          <StepperPanel header="Upload Media">
            <div>
              {/* Thumbnail Upload */}
              <div className="widget-box-2">
                <h6 className="title">Thumbnail Image</h6>
                <ImageUpload
                  value={thumbnailSrc}
                  onChange={(value) => setCustomValue("thumbnailSrc", value)}
                  maxFiles={1}
                  label="Upload a single thumbnail image"
                />
              </div>

              {/* Gallery Upload */}
              <div className="widget-box-2">
                <h6 className="title">Gallery Images</h6>
                <ImageUpload
                  value={galleryImages}
                  onChange={(value) => setCustomValue("galleryImages", value)}
                  maxFiles={10} // Limit to 10 gallery images
                  label="Upload multiple gallery images"
                />
              </div>

              {/* Video URL Input */}
              <div className="widget-box-2">
                <h6 className="title">Videos</h6>
                <fieldset className="box-fieldset">
                  <label htmlFor="video">Video URL:</label>
                  <input
                    type="text"
                    id="video"
                    className="form-control style-1"
                    placeholder="Youtube, Vimeo URL"
                    value={""}
                    onChange={(e) => setCustomValue("videoUrl", e.target.value)}
                  />
                </fieldset>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex pt-4 justify-content-start">
              <NavigationButtons
                onBack={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.prevCallback();
                }}
                onNext={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  stepperRef.current.nextCallback();
                }}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 5 */}
          <StepperPanel header="Publish">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content III
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <NavigationButtons onNext={handleSubmit(onSubmit)} isLastStep />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </PrimeReactProvider>
  );
};

export default StepperContainer;
