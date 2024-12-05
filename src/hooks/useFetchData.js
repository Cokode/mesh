import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const fectData = async() => {
    try {
        setLoading(true);
        const response = await axios.get(url) // extend it later
        setData(response.data);
        setErrorMessage("");
    } catch (error) {
      setErrorMessage('something went bad');
    } finally {
      setLoading(!loading);
    }
  }

  useEffect(() => {
    fectData();
  }, [url]);


  return {fectData, errorMessage, loading, data};
}

export default useFetchData;