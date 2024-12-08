"use client";
import SideBarMenu from "@/app/components/layout/SideBarMenu";
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
          <div className="w-100 m-4">
            <div className="widget-box-2 wd-listing">
              <h6 className="title">Add New Property</h6>
            </div>
            <div className="widget-box-2">
              <h6 className="title">Information</h6>
              <div className="box-info-property">
                <fieldset className="box box-fieldset">
                  <label htmlFor="title">
                    Title:<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control style-1"
                    defaultValue="Jony Dane |"
                  />
                </fieldset>
                <fieldset className="box box-fieldset">
                  <label htmlFor="desc">Description:</label>
                  <textarea
                    className="textarea-tinymce"
                    name="area"
                    defaultValue={"                                    "}
                  />
                </fieldset>
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
                        {" "}
                        Bedford Park
                      </option>
                    </select>
                  </fieldset>
                </div>
                <div className="box box-fieldset">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyClient;
