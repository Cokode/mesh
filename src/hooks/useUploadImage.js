import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl, api } from "../urls/Api";

const useUploadImage = (imageData) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "880dcf7a4e3a97c94a3d70dcf7c37ad7";
  const url = `https://api.imgbb.com/1/upload`;

  const uploadToIMGBB = async () => {
    if (!imageData) return;
  
    try {
      setLoading(true);
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("image", imageData.base64);
  
      // API request
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.data.success) {
        const uploadedData = {
          imgbbUrl: response.data.data.url,
          deleteUrl: response.data.data.delete_url,
        };
        setData(uploadedData);
        setErrorMessage("Sucess.");
      } else {
        setErrorMessage("Image upload failed.");
      }
    } catch (error) {
      setErrorMessage(`Upload failed: ${error.response?.data?.error?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    if (imageData) uploadToIMGBB();
  }, [imageData]);

  return { uploadToIMGBB, errorMessage, loading, data };
};

export default useUploadImage;