import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const ApiUrl = {
  register: "register",
  login: "login",
  updateProfile: "update-profile",
  registerItem: "api/addstash",
  SRNcheck: "api/serialNumberCheck",
  getItems: "getItems",
  loadReport: "loadReport",
  getReport: "getReport"
};

const api = axios.create({
  baseURL: "http://192.168.0.101:3000/", // Replace with your server's IP
});

console.log(ApiUrl['SRNcheck']);
console.log(ApiUrl.registerItem);

const fetchProtectedData = async () => {
  const token = await getToken();

  if(!token) {
    console.log("No token found, user may need to log in.");
    return;
  };

  console.log("Token successfully retrieved.");
  return token;
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.error("Error retrieving token: ", error);
    return null;
  };
};

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("Tokend successfully stored: ", token);
  } catch (error) {
    console.error("Error storing token: ", error);
  };
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken", token);
    console.log("Tokend successfully removed: ", token);
  } catch (error) {
    console.error("Error removing token: ", error);
  };
};


export {ApiUrl, api, fetchProtectedData, storeToken, removeToken};