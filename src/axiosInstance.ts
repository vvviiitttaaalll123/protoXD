import axios from "axios";

export const instance = axios.create({
  headers: {
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
