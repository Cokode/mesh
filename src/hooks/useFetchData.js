import React, { useState, useEffect } from "react";
import { api, ApiUrl, fetchProtectedData } from "../urls/Api";
import { AUTH_TOKEN } from "@env";


const useFetchStashes = () => {
  const [stashes, setStashes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const fetchStashes = async () => {
    try {
      setLoading(true);

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

      if (response.status === 404) {
        setErrorMessage("No items found.");
        //setStashes([]);
      } else if (!response.data) {
        setErrorMessage("Cannot get stashes.");
      } else {
        setStashes(response.data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error in fetchStashes:", error);
      setErrorMessage(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStashes();
  }, []);

  return { fetchStashes, errorMessage, loading, stashes };
};

export default useFetchStashes;
