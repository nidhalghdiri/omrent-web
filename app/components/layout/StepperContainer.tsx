"use client";
import React from "react";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import Link from "next/link";
import "@/node_modules/primereact/resources/themes/mdc-light-indigo/theme.css";
import "@/node_modules/primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Input from "../inputs/Input";

const StepperContainer = () => {
  const stepperRef = React.useRef<any>(null);

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
                <Input
                  id="title"
                  label="Title"
                  required
                  type="text"
                  placeholder="Jony Dane"
                />
                <Input id="desc" label="Description" type="textarea" />
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                className="tf-btn primary mx-2"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 2 */}
          <StepperPanel header="Details">
            <div>
              <div className="widget-box-2">
                <h6 className="title">Property Details</h6>
                <div className="box-info-property">
                  <div className="box grid-3 gap-30">
                    <Input
                      id="address"
                      label="Full Address"
                      required
                      type="text"
                      placeholder="Enter property full address"
                    />
                    <Input
                      id="zip"
                      label="Zip Code"
                      required
                      type="text"
                      placeholder="Enter property zip code"
                    />
                    <fieldset className="box-fieldset">
                      <label htmlFor="country">
                        Country:<span>*</span>
                      </label>
                      <select className="nice-select">
                        <option data-value={1} className="option selected">
                          United States
                        </option>
                        <option data-value={2} className="option">
                          United Kingdom
                        </option>
                        <option data-value={3} className="option">
                          Russia
                        </option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="box grid-2 gap-30">
                    <fieldset className="box-fieldset">
                      <label htmlFor="state">
                        Province/State:<span>*</span>
                      </label>
                      <select className="nice-select">
                        <option data-value={1} className="option selected">
                          None
                        </option>
                        <option data-value={2} className="option">
                          Texas
                        </option>
                        <option data-value={3} className="option">
                          New York
                        </option>
                      </select>
                    </fieldset>
                    <fieldset className="box-fieldset">
                      <label htmlFor="neighborhood">
                        Neighborhood:<span>*</span>
                      </label>
                      <select className="nice-select">
                        <option data-value={1} className="option selected">
                          None
                        </option>
                        <option data-value={2} className="option">
                          Little Italy
                        </option>
                        <option data-value={3} className="option">
                          Bedford Park
                        </option>
                      </select>
                    </fieldset>
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
                <div className="box grid-3 gap-30">
                  <fieldset className="box-fieldset">
                    <label htmlFor="type">
                      Property Type:<span>*</span>
                    </label>
                    <select className="nice-select">
                      <option data-value={1} className="option">
                        Apartment
                      </option>
                      <option data-value={2} className="option">
                        Villa
                      </option>
                      <option data-value={3} className="option">
                        Studio
                      </option>
                      <option data-value={4} className="option">
                        Studio
                      </option>
                      <option data-value={5} className="option">
                        Office
                      </option>
                      <option data-value={6} className="option">
                        Townhouse
                      </option>
                    </select>
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="status">
                      Property Status:<span>*</span>
                    </label>
                    <select className="nice-select">
                      <option data-value={1} className="option">
                        For Rent
                      </option>
                      <option data-value={2} className="option">
                        For Sale
                      </option>
                    </select>
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="label">
                      Property Label:<span>*</span>
                    </label>
                    <select className="nice-select">
                      <option data-value={1} className="option">
                        New Listing
                      </option>
                      <option data-value={2} className="option">
                        Open House
                      </option>
                    </select>
                  </fieldset>
                </div>
                <div className="box grid-3 gap-30">
                  <fieldset className="box-fieldset">
                    <label htmlFor="size">
                      Size (SqFt):<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="land">
                      Land Area (SqFt):<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="id">
                      Property ID:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                </div>
                <div className="box grid-3 gap-30">
                  <fieldset className="box-fieldset">
                    <label htmlFor="rom">
                      Rooms:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="bedrooms">
                      Bedrooms:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="bathrooms">
                      Bathrooms:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                </div>
                <div className="box grid-3 gap-30">
                  <fieldset className="box-fieldset">
                    <label htmlFor="garages">
                      Garages:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="garages-size">
                      Garages Size (SqFt):<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="year">
                      Year Built:<span>*</span>
                    </label>
                    <input type="text" className="form-control style-1" />
                  </fieldset>
                </div>
              </div>
              <div className="widget-box-2">
                <h6 className="title">
                  Amenities<span>*</span>
                </h6>
                <div className="box-amenities-property">
                  <div className="box-amenities">
                    <div className="title-amenities fw-7">Home safety:</div>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb1"
                        defaultChecked
                      />
                      <label htmlFor="cb1" className="text-cb-amenities">
                        Smoke alarm
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb2"
                      />
                      <label htmlFor="cb2" className="text-cb-amenities">
                        Carbon monoxide alarm
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb3"
                        defaultChecked
                      />
                      <label htmlFor="cb3" className="text-cb-amenities">
                        First aid kit
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb4"
                        defaultChecked
                      />
                      <label htmlFor="cb4" className="text-cb-amenities">
                        Self check-in with lockbox
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb5"
                      />
                      <label htmlFor="cb5" className="text-cb-amenities">
                        Security cameras
                      </label>
                    </fieldset>
                  </div>
                  <div className="box-amenities">
                    <div className="title-amenities fw-7">Bedroom:</div>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb6"
                      />
                      <label htmlFor="cb6" className="text-cb-amenities">
                        Hangers
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb7"
                        defaultChecked
                      />
                      <label htmlFor="cb7" className="text-cb-amenities">
                        Bed linens
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb8"
                      />
                      <label htmlFor="cb8" className="text-cb-amenities">
                        Extra pillows &amp; blankets
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb9"
                      />
                      <label htmlFor="cb9" className="text-cb-amenities">
                        Iron
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb10"
                        defaultChecked
                      />
                      <label htmlFor="cb10" className="text-cb-amenities">
                        TV with standard cable
                      </label>
                    </fieldset>
                  </div>
                  <div className="box-amenities">
                    <div className="title-amenities fw-7">Kitchen:</div>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb11"
                      />
                      <label htmlFor="cb11" className="text-cb-amenities">
                        Refrigerator
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb12"
                      />
                      <label htmlFor="cb12" className="text-cb-amenities">
                        Microwave
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb13"
                      />
                      <label htmlFor="cb13" className="text-cb-amenities">
                        Dishwasher
                      </label>
                    </fieldset>
                    <fieldset className="amenities-item">
                      <input
                        type="checkbox"
                        className="tf-checkbox style-1 primary"
                        id="cb14"
                      />
                      <label htmlFor="cb14" className="text-cb-amenities">
                        Coffee maker
                      </label>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                className="tf-btn secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                className="tf-btn primary mx-2"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 3 */}
          <StepperPanel header="Availability">
            <div className="widget-box-2">
              <h6 className="title">Pricing and Availability</h6>
              <div className="box-price-property">
                <div className="box grid-2 gap-30">
                  <Input
                    id="price"
                    label="Price"
                    type="text"
                    required
                    placeholder="Example value: 12345.67"
                  />
                  <fieldset className="box-fieldset">
                    <label htmlFor="neighborhood">
                      Unit Price:<span>*</span>
                    </label>
                    <select className="nice-select">
                      <option data-value={1} className="option selected">
                        None
                      </option>
                      <option data-value={2} className="option">
                        1000
                      </option>
                      <option data-value={3} className="option">
                        2000
                      </option>
                    </select>
                  </fieldset>
                </div>
                <div className="grid-2 gap-30">
                  <Input
                    id="price"
                    label="Before Price Label"
                    type="text"
                    required
                  />
                  <Input
                    id="price"
                    label="After Price Label"
                    type="text"
                    required
                  />
                </div>
                <fieldset className="box-cb d-flex align-items-center gap-6">
                  <input type="checkbox" className="tf-checkbox" id="cb-ip" />
                  <label htmlFor="cb-ip">Price to Call</label>
                </fieldset>
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <Button
                label="Back"
                severity="secondary"
                className="tf-btn secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                className="tf-btn primary mx-2"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          {/* Placeholder for Step 4 */}
          <StepperPanel header="Upload Media">
            <div>
              <div className="widget-box-2">
                <h6 className="title">Upload Media</h6>
                <div className="box-uploadfile text-center">
                  <label className="uploadfile">
                    <span className="icon icon-img-2" />
                    <div className="btn-upload">
                      <Link href="#" className="tf-btn primary">
                        Choose Image
                      </Link>
                      <input type="file" className="ip-file" />
                    </div>
                    <p className="file-name fw-5">
                      Or drop image here to upload
                    </p>
                  </label>
                </div>
              </div>
              <div className="widget-box-2">
                <h6 className="title">Virtual Tour 360</h6>
                <div className="box-radio-check">
                  <div className="fw-7">Virtual Tour Type:</div>
                  <fieldset className="fieldset-radio">
                    <input
                      type="radio"
                      className="tf-radio"
                      name="radio"
                      id="radio1"
                    />
                    <label htmlFor="radio1" className="text-radio">
                      Embedded code
                    </label>
                  </fieldset>

                  <fieldset className="fieldset-radio">
                    <input
                      type="radio"
                      className="tf-radio"
                      name="radio"
                      id="radio2"
                    />
                    <label htmlFor="radio2" className="text-radio">
                      Upload image
                    </label>
                  </fieldset>
                </div>
                <fieldset className="box-fieldset">
                  <label htmlFor="embedded">Embedded Code Virtual 360</label>
                  <textarea className="textarea" defaultValue={""} />
                </fieldset>
              </div>
              <div className="widget-box-2">
                <h6 className="title">Videos</h6>
                <fieldset className="box-fieldset">
                  <label htmlFor="video">Video URL:</label>
                  <input
                    type="text"
                    className="form-control style-1"
                    placeholder="Youtube, vimeo url"
                  />
                </fieldset>
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <Button
                label="Back"
                severity="secondary"
                className="tf-btn secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                className="tf-btn primary mx-2"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
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
              <Button
                label="Back"
                severity="secondary"
                className="tf-btn secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Publish"
                className="tf-btn primary mx-2"
                icon="pi pi-check"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </PrimeReactProvider>
  );
};

export default StepperContainer;
