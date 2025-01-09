import axios from "axios";


const ApiUrl = {
  register: "register",
  login: "login",
  updateProfile: "update-profile",
  registerItem: "api/addstash",
  SRNcheck: "api/serialNumberCheck",
  getItems: "getItems",
}

const api = axios.create({
  baseURL: "http://192.168.0.101:3000/", // Replace with your server's IP
});

console.log(ApiUrl['SRNcheck']);
console.log(ApiUrl.registerItem);

export {ApiUrl, api};