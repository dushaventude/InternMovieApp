
// Function to get Cloudinary upload signature from your backend
export const getCloudinarySignature = async () => {
  try {
    // This would typically be an API call to your backend
    // which would generate a signature for secure uploads
    const response = await fetch("/api/cloudinary-signature");
    if (!response.ok) {
      throw new Error("Failed to get upload signature");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting Cloudinary signature:", error);
    throw error;
  }
};

// Function to upload an image to Cloudinary with a signed upload
export const uploadToCloudinary = async (file: File, folder = "movies") => {
  try {
    // For a more secure implementation, you would get a signature from your backend
    // const { signature, timestamp, apiKey } = await getCloudinarySignature();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your upload preset
    formData.append("folder", folder);

    // For signed uploads:
    // formData.append('signature', signature);
    // formData.append('timestamp', timestamp);
    // formData.append('api_key', apiKey);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`, // Replace with your cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to upload image");
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
