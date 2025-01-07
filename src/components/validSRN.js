import { AUTH_TOKEN } from "@env";
import { api, ApiUrl } from "../urls/Api";


const ValidSRN = async () => {
  let valuea = {
    sp_Number: form.sp_Number
  };

  try {
    const response = await api.get(ApiUrl.SRNcheck, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": AUTH_TOKEN
      },
      withCredentials: true,
      params: valuea // Pass query parameters here
    });

    if (response && response.data) {
      console.log(response.data);
    }
  } catch (error) {
    console.error(error.message);
  }
}; 

export default ValidSRN;