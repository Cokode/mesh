import React, { useEffect, useState } from "react";
import { api, ApiUrl } from "../../urls/Api";

export default function LoadReport(comment, stastID) {

  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  try {
    
    const res = api.post(ApiUrl.loadReport, { comment: comment, id: stastID}, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": AUTH_TOKEN
      },
      withCredentials: true,
    });

    if (!res) {
      setErrorMessage(res.data.error);
      console.log("Error occured.")
    } 

    console.log(res.data)

  } catch( error ) {
    console.log("this request can't be made.")
    setErrorMessage(error)
  }
}