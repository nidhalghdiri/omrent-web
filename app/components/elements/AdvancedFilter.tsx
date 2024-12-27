"use client";
import Link from "next/link";
import { useState } from "react";
import RangeSlider from "./RangeSlider";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AdvancedFilterProps {
  sidecls: string;
}
interface SearchFormInputs {
  keyword?: string;
  location?: string;
  type?: string;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ sidecls }) => {
  const { handleSubmit, control } = useForm<SearchFormInputs>();
  const [isToggled, setToggled] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = () => setToggled(!isToggled);
  const onSubmit = (data: SearchFormInputs) => {
    // Remove undefined values and ensure all values are strings
    const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = String(value); // Convert value to string
      }
      return acc;
    }, {} as Record<string, string>);

    // Redirect to the Properties page with query parameters
    const query = new URLSearchParams(sanitizedData).toString();
    router.push(`/listings?${query}`);
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className={`wd-find-select ${sidecls ? sidecls : ""}`}>
        <div className="inner-group">
          <div className="form-group-1 search-form form-style">
            <label>Keyword</label>
            <Controller
              name="keyword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Search Keyword."
                />
              )}
            />
          </div>
          <div className="form-group-2 form-style">
            <label>Location</label>
            <div className="group-ip">
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Search Location"
                  />
                )}
              />
              <Link href="#" className="icon icon-location" />
            </div>
          </div>
          <div className="form-group-3 form-style">
            <label>Type</label>
            <div className="group-select">
              <Controller
                name="type"
                control={control}
                defaultValue="all"
                render={({ field }) => (
                  <select {...field} className="nice-select">
                    <option value="all">All</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="office">Office</option>
                  </select>
                )}
              />
            </div>
          </div>
          <div className="form-group-4 box-filter">
            <a className="filter-advanced pull-right" onClick={handleToggle}>
              <span className="icon icon-faders" />
              <span className="text-1">Advanced</span>
            </a>
          </div>
        </div>
        <button type="submit" className="tf-btn primary">
          {isLoading ? "Searching..." : <span className="icon icon-search" />}
        </button>
      </div>
      <div className={`wd-search-form ${isToggled ? "show" : ""}`}>
        <div className="grid-2 group-box group-price">
          <div className="widget-price">
            <RangeSlider />
          </div>
          <div className="widget-price">
            <RangeSlider />
          </div>
        </div>
        <div className="grid-2 group-box">
          <div className="group-select grid-2">
            <div className="box-select">
              <label className="title-select text-variant-1">Rooms</label>
              <select className="nice-select">
                <option data-value={1} className="option">
                  1
                </option>
                <option data-value={2} className="option selected">
                  2
                </option>
                <option data-value={3} className="option">
                  3
                </option>
                <option data-value={4} className="option">
                  4
                </option>
                <option data-value={5} className="option">
                  5
                </option>
                <option data-value={6} className="option">
                  6
                </option>
                <option data-value={7} className="option">
                  7
                </option>
                <option data-value={8} className="option">
                  8
                </option>
                <option data-value={9} className="option">
                  9
                </option>
                <option data-value={10} className="option">
                  10
                </option>
              </select>
            </div>
            <div className="box-select">
              <label className="title-select text-variant-1">Bathrooms</label>
              <select className="nice-select">
                <option data-value={1} className="option">
                  1
                </option>
                <option data-value={2} className="option selected">
                  2
                </option>
                <option data-value={3} className="option">
                  3
                </option>
                <option data-value={4} className="option">
                  4
                </option>
                <option data-value={5} className="option">
                  5
                </option>
                <option data-value={6} className="option">
                  6
                </option>
                <option data-value={7} className="option">
                  7
                </option>
                <option data-value={8} className="option">
                  8
                </option>
                <option data-value={9} className="option">
                  9
                </option>
                <option data-value={10} className="option">
                  10
                </option>
              </select>
            </div>
          </div>
          <div className="group-select grid-2">
            <div className="box-select">
              <label className="title-select text-variant-1">Bedrooms</label>
              <select className="nice-select">
                <option data-value={1} className="option">
                  1
                </option>
                <option data-value={2} className="option selected">
                  2
                </option>
                <option data-value={3} className="option">
                  3
                </option>
                <option data-value={4} className="option">
                  4
                </option>
                <option data-value={5} className="option">
                  5
                </option>
                <option data-value={6} className="option">
                  6
                </option>
                <option data-value={7} className="option">
                  7
                </option>
                <option data-value={8} className="option">
                  8
                </option>
                <option data-value={9} className="option">
                  9
                </option>
                <option data-value={10} className="option">
                  10
                </option>
              </select>
            </div>
            <div className="box-select">
              <label className="title-select fw-5">Type</label>
              <select className="nice-select">
                <option data-value={1} className="option">
                  1
                </option>
                <option data-value={2} className="option selected">
                  2
                </option>
                <option data-value={3} className="option">
                  3
                </option>
                <option data-value={4} className="option">
                  4
                </option>
                <option data-value={5} className="option">
                  5
                </option>
                <option data-value={6} className="option">
                  6
                </option>
                <option data-value={7} className="option">
                  7
                </option>
                <option data-value={8} className="option">
                  8
                </option>
                <option data-value={9} className="option">
                  9
                </option>
                <option data-value={10} className="option">
                  10
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="group-checkbox">
          <div className="text-1">Amenities:</div>
          <div className="group-amenities mt-8 grid-6">
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb1"
                  defaultChecked
                />
                <label htmlFor="cb1" className="text-cb-amenities">
                  Air Condition
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb2"
                />
                <label htmlFor="cb2" className="text-cb-amenities">
                  Cable TV
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb3"
                />
                <label htmlFor="cb3" className="text-cb-amenities">
                  Ceiling Height
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb4"
                />
                <label htmlFor="cb4" className="text-cb-amenities">
                  Fireplace
                </label>
              </fieldset>
            </div>
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb5"
                />
                <label htmlFor="cb5" className="text-cb-amenities">
                  Disabled Access
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb6"
                  defaultChecked
                />
                <label htmlFor="cb6" className="text-cb-amenities">
                  Elevator
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb7"
                />
                <label htmlFor="cb7" className="text-cb-amenities">
                  Fence
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb8"
                />
                <label htmlFor="cb8" className="text-cb-amenities">
                  Garden
                </label>
              </fieldset>
            </div>
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb9"
                  defaultChecked
                />
                <label htmlFor="cb9" className="text-cb-amenities">
                  Floor
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb10"
                />
                <label htmlFor="cb10" className="text-cb-amenities">
                  Furnishing
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb11"
                  defaultChecked
                />
                <label htmlFor="cb11" className="text-cb-amenities">
                  Garage
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb12"
                />
                <label htmlFor="cb12" className="text-cb-amenities">
                  Pet Friendly
                </label>
              </fieldset>
            </div>
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb13"
                />
                <label htmlFor="cb13" className="text-cb-amenities">
                  Heating
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb14"
                />
                <label htmlFor="cb14" className="text-cb-amenities">
                  Intercom
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb15"
                />
                <label htmlFor="cb15" className="text-cb-amenities">
                  Parking
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb16"
                />
                <label htmlFor="cb16" className="text-cb-amenities">
                  WiFi
                </label>
              </fieldset>
            </div>
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb17"
                />
                <label htmlFor="cb17" className="text-cb-amenities">
                  Renovation
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb18"
                />
                <label htmlFor="cb18" className="text-cb-amenities">
                  Security
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb19"
                />
                <label htmlFor="cb19" className="text-cb-amenities">
                  Swimming Pool
                </label>
              </fieldset>
            </div>
            <div className="box-amenities">
              <fieldset className="amenities-item">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb20"
                />
                <label htmlFor="cb20" className="text-cb-amenities">
                  Window Type
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb21"
                />
                <label htmlFor="cb21" className="text-cb-amenities">
                  Search property
                </label>
              </fieldset>
              <fieldset className="amenities-item mt-12">
                <input
                  type="checkbox"
                  className="tf-checkbox style-1"
                  id="cb22"
                />
                <label htmlFor="cb22" className="text-cb-amenities">
                  Construction Year
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvancedFilter;
