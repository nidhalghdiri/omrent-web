import { CldUploadWidget } from "next-cloudinary";
import React, { useCallback, useState } from "react";

const SimpleImageUpload = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleUpload = useCallback((result: any) => {
    const url = result.info.secure_url;
    console.log("Uploaded URL:", url); // Log the uploaded URL
    setUploadedUrl(url); // Update state with the uploaded URL
  }, []);

  return (
    <div>
      <h1>Simple Image Upload</h1>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset="lu4elq6v" // Replace with your Cloudinary upload preset
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open?.()}
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleImageUpload;
