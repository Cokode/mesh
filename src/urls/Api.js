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
  getReport: "getReport",
  getUser: "getUser",
  updatePic: "update_pro",
  updateBoard: "updateBoard",
  getBoardData: "boardData",
  conclude: "conclude",
  deleteStash: "delete-stash"
};

const api = axios.create({
  baseURL: "http://192.168.0.101:3000/", // Replace with your server's IP
});

/*
  use this to set the network address when needed.
*/
// export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.158
// export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.100

// console.log(ApiUrl['SRNcheck']);
// console.log(ApiUrl.registerItem);

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
    await AsyncStorage.removeItem("userToken");
    console.log("Tokend successfully removed: ");
  } catch (error) {
    console.error("Error removing token: ", error);
  };

};

export {ApiUrl, api, fetchProtectedData, storeToken, removeToken};