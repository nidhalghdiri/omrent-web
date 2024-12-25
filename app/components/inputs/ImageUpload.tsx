"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string | string[]) => void;
  label: string;
  value: string;
  maxFiles: number;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  maxFiles,
  multiple,
  onChange,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      if (result.event === "success") {
        if (maxFiles === 1) {
          // For single file upload
          onChange(result.info.secure_url);
        } else {
          // For multiple file uploads
          const updatedValue = Array.isArray(value)
            ? [...value, result.info.secure_url]
            : [result.info.secure_url]; // Initialize as array if needed
          onChange(updatedValue);
        }
      }
    },
    [maxFiles, onChange, value] // Include all dependencies
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
              maxFiles: maxFiles,
            }}
          >
            {({ open }) => {
              return (
                <button
                  type="button"
                  onClick={() => open?.()}
                  className="tf-btn primary"
                >
                  {label}
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        {/* <p className="file-name fw-5">Or drop image here to upload</p> */}
        {value && (
          <div style={{ marginTop: "20px" }}>
            <h3>Uploaded Image{maxFiles > 1 ? "s" : ""}:</h3>
            {Array.isArray(value) ? (
              <div className="image-gallery">
                {value.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Uploaded ${index + 1}`}
                    style={{ maxWidth: "100%", height: "auto", margin: "5px" }}
                  />
                ))}
              </div>
            ) : (
              <img
                src={value}
                alt="Uploaded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
