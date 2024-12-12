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

const StepperContainer = () => {
  const stepperRef = React.useRef<any>(null);

  return (
    <PrimeReactProvider>
      <div style={{ flexBasis: "50rem" }}>
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
                <fieldset className="box box-fieldset mb-2">
                  <label htmlFor="title">
                    Title:<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control style-1"
                    defaultValue="Jony Dane |"
                  />
                </fieldset>
                <fieldset className="box box-fieldset mb-2">
                  <label htmlFor="desc">Description:</label>
                  <textarea
                    className="textarea-tinymce"
                    name="area"
                    defaultValue=""
                  />
                </fieldset>
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 2 */}
          <StepperPanel header="Details">
            <div className="widget-box-2">
              <h6 className="title">Property Details</h6>
              <div className="box-info-property">
                <div className="box grid-3 gap-30">
                  <fieldset className="box-fieldset">
                    <label htmlFor="address">
                      Full Address:<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control style-1"
                      placeholder="Enter property full address"
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label htmlFor="zip">
                      Zip Code:<span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control style-1"
                      placeholder="Enter property zip code"
                    />
                  </fieldset>
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
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>

          {/* Placeholder for Step 3 */}
          <StepperPanel header="Availability">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content III
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          {/* Placeholder for Step 4 */}
          <StepperPanel header="Upload Media">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content III
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
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
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
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
