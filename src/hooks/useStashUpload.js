import React from "react";
import { useState, useEffect } from "react";
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";

const useStashUpload = (form) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =  useState("");

  const uploadForm = async () => {

    // Extracting token from Asycronous Store
    const token = await fetchProtectedData();

    if (!form || !token) {
      console.log("Missing information in useStashUpload", this.class.name);
      return;
    }
  
    try {
      const response = await api.post(ApiUrl.registerItem,
        form,
        {
          headers: { 
            // "Content-Type": "multipart/form-data" 
            "Content-Type": "application/json; charset=utf-8", 
            "Authorization": token,
          }, 
        }
      );
  
      if (response.status) {
        setData(response.data);
        console.log("response.Status: ", response.status, " Response.Data: ", response.data)
        setErrorMessage("");
      } else {
        setErrorMessage("Image upload failed.");
      }

    } catch (error) {
      console.log("Data1: ", data, "Error: ", error);
      setData(null);
      setErrorMessage(`Upload failed: ${ error}`);
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