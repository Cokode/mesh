import { useState } from "react";
import { api, ApiUrl } from "../urls/Api";
import { AUTH_TOKEN } from "@env";


const useLoadReport = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (comment, id) => {
    setLoading(true);

    if (!comment || !id) {
      setErrorMessage("Comment is required.");
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
            Authorization: AUTH_TOKEN,
          },
          withCredentials: true,
        }
      );

      console.log(res.data + " in the Hook");
      console.log(".........", res.status);
      setLoading(false);
      return res.data; // Return the response data if needed
    } catch (error) {
      console.error("This request can't be made.", error);
      setErrorMessage(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // Return the handleSubmit function and states
  return { handleSubmit, loading, errorMessage };
};

export default useLoadReport;
