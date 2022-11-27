import axios from "axios";

export const instance = axios.create({
  headers: {
    accept: "application/json",
  },
});
