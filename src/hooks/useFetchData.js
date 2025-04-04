import React, { useState, useEffect } from "react";
import { api, ApiUrl, fetchProtectedData } from "../urls/Api";

const useFetchStashes = () => {
  const [stashes, setStashes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const fetchStashes = async () => {

    try {
      console.log("Set loading to: ", loading);

      // Extracting token from Asycronous Store
      const token = await fetchProtectedData();
      if (!token) {
        console.log("Missing information in useFectData");
        return;
      }

      const response = await api.get(ApiUrl.getItems, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": token,
        },
        withCredentials: true,
      });

     if(!response.status) {
      console.log("Error");
      return;
     }

     setStashes(response.data);

    } catch (error) {
     setStashes([]);
    } 
  };

  useEffect(() => {
    fetchStashes();
  }, []);

  return { fetchStashes, loading, stashes };
};

export default useFetchStashes;
