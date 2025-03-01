"use client";

import type React from "react";
import { useState, useEffect } from "react";
import "./ImageUpload.scss";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: object,
        callback: (error: { message: string } | null, result: { event: string; info: { secure_url: string } } | null) => void
      ) => { open: () => void };
    };
  }
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "Image",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Cloudinary script
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = () => {
    setError(null);
    setIsUploading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpnqjes6y", 
        uploadPreset: "MovieApp", 
        maxFileSize: 5000000, 
        sources: ["local", "camera"],
        resourceType: "image",
      },
      (
        error: { message: string } | null,
        result: { event: string; info: { secure_url: string } } | null
      ) => {
        if (!error && result && result.event === "success") {
          onChange(result.info.secure_url);
          setIsUploading(false);
        } else if (error) {
          setError("Failed to upload image. Please try again.");
          setIsUploading(false);
        }
      }
    );

    widget.open();
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>

      <div className="image-upload-content">
        {value ? (
          <div className="image-preview-container">
            <img
              src={value || "/placeholder.svg"}
              alt="Preview"
              className="image-preview"
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="upload-placeholder" onClick={handleUpload}>
            {isUploading ? (
              <div className="uploading-indicator">
                <div className="spinner"></div>
                <p>Uploading...</p>
              </div>
            ) : (
              <>
                <ImageIcon size={40} />
                <p>Click to upload an image</p>
              </>
            )}
          </div>
        )}

        {!value && !isUploading && (
          <button
            type="button"
            className="upload-btn"
            onClick={handleUpload}
            disabled={isUploading}
          >
            <Upload size={16} />
            Upload Image
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ImageUpload;
