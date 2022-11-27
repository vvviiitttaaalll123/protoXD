import axios from "axios";
import "isomorphic-fetch";

export const instance = axios.create({
  headers: {
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const instanceIso = (url: string) => {
  fetch(url).then((res) => console.log(res));
};
