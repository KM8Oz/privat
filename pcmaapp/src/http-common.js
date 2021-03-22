import axios from "axios";

export default axios.create({
  baseURL: "https://back.p2pbet.tech/api",
  headers: {
    "Content-type": "application/json"
  }
});
