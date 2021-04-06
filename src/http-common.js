import axios from "axios";
import Vue from 'vue'
export default axios.create({
  baseURL: Vue.prototype._G.backUrl+"/api",
  // crossDomain : true,
  // xhrFields: {
  //     withCredentials: true
  // },
  headers: {
    "Content-type": "application/json",
    //"Access-Control-Allow-Origin": "*"
  }
});
// exports.http2 = axios.create({
//   baseURL: "https://back.cg.house/",
//   headers: {
//     "Content-type": "application/json"
//   }
// });