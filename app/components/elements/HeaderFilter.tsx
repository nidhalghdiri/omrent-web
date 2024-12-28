"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface SearchFormInputs {
  keyword?: string;
  location?: string;
  type?: string;
}
const HeaderFilter = () => {
  const { handleSubmit, control } = useForm<SearchFormInputs>();
  const router = useRouter();
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
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex justify-content-between align-items-center"
    >
      <div className="form-box box-1">
        <Controller
          name="keyword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" placeholder="Enter Keyword" />
          )}
        />
      </div>
      <div className="form-box box-2">
        <Controller
          name="location"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" placeholder="Search Location" />
          )}
        />
      </div>
      <div className="form-box box-3">
        <Controller
          name="type"
          control={control}
          defaultValue="all"
          render={({ field }) => (
            <select {...field}>
              <option value="all">All</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="office">Office</option>
            </select>
          )}
        />
      </div>
      <button type="submit" className="btn-search filter-search-canvas">
        <span className="icon icon-search" />
      </button>
    </form>
  );
};

export default HeaderFilter;
