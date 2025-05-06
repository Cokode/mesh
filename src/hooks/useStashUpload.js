import React from "react";
import { useState, useEffect } from "react";
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";

const useStashUpload = async (form) => {
  try {
    const token = await fetchProtectedData();

    if (!form || !token) {
      console.log("Missing information in useStashUpload: form or token not provided.");
      return null; 
    }

    const response = await api.post(ApiUrl.registerItem, form, {
      headers: { 
        "Content-Type": "application/json; charset=utf-8", 
        "Authorization": token,
      },
    });

    //console.log(response, " This is response.");
    // Check Response Status
    if (response && response.status) {
      return response.data; // Return response data
    }

    console.log("Failed to upload stash, response status invalid.");
    return null;
  } catch (error) {
    console.error("Error during stash upload:", error); // Log the actual error object
    return null;
  }
};

export default useStashUpload;
