import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl, api } from "../urls/Api";
import { AUTH_TOKEN } from "@env";

const useStashUpload = (form) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const uploadForm = async () => {
    if (!form) return;
  
    try {
      const response = await api.post(ApiUrl.registerItem,
        form,
        {
          headers: { 
            // "Content-Type": "multipart/form-data" 
            "Content-Type": "application/json", 
            "Authorization": AUTH_TOKEN,
          },
        }
      );
  
      if (response) {
        setData(response.data.message);
        setErrorMessage("");
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
    if (form) uploadForm();
  }, [form]);

  return { uploadForm, errorMessage, loading, data };
};

export default useStashUpload;