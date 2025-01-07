import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl, api } from "../urls/Api";
import { AUTH_TOKEN } from "@env";

const useStashUpload = (imageData, formData) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const uploadToIMGBB = async () => {
    if (!imageData) return;
  
    try {
      setLoading(true);
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("image", imageData.base64);
  
      // API request
      const response = await api.post(ApiUrl.registerItem,
        formData,
        {
          headers: { 
            // "Content-Type": "multipart/form-data" 
            "Content-Type": "application/json", 
            "Authorization": AUTH_TOKEN,
          },
        }
      );
  
      if (response) {
        
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

export default useStashUpload;