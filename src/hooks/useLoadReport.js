import { useState } from "react";
import { api, ApiUrl, fetchProtectedData } from "../urls/Api";
import { AUTH_TOKEN } from "@env";


const useLoadReport = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (comment, id) => {
    setLoading(true);

    // Extracting token from Asycronous Store
    const token = await fetchProtectedData();

    if (!comment || !id || !token) {
      setErrorMessage("Some information are missing. please check useLoadReport.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(
        ApiUrl.loadReport,
        { comment, id },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      if (res.status) {
        alert("Report submitted!");
      } else {
        alert("Not successful, try again!");
      }
      console.log(res.data + " in the Hook");
      console.log(".........", res.status);
      setLoading(false);
      return res.data; // Return the response data if needed
    } catch (error) {
      alert("Not successful, try again!");
      console.error("This request can't be made.", error);
      setErrorMessage(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // Return the handleSubmit function and states
  return { handleSubmit, loading, errorMessage };
};

export default useLoadReport;
