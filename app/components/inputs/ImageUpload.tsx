"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      const url = result?.info?.secure_url;
      if (url) {
        console.log("Uploaded URL:", url); // Ensure URL exists
        onChange(url);
      } else {
        console.error("Upload result does not contain URL:", result);
      }
    },
    [onChange]
  );
  return (
    <div className="box-uploadfile text-center">
      <label className="uploadfile">
        <span className="icon icon-img-2" />
        <div className="btn-upload">
          <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="lu4elq6v"
            options={{
              maxFiles: 1,
            }}
          >
            {({ open }) => {
              return (
                <button
                  type="button"
                  onClick={() => open?.()}
                  className="tf-btn primary"
                >
                  Choose Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        {/* <p className="file-name fw-5">Or drop image here to upload</p> */}
        {value && (
          <div style={{ marginTop: "20px" }}>
            <h3>Uploaded Image:</h3>
            <img
              src={value}
              alt="Uploaded"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
