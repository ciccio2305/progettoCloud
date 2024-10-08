import { c as config } from "./config.js";
({
  LOGIN: config.getHost() + "/api/login",
  REGISTER: config.getHost() + "/api/register",
  LOGOUT: config.getHost() + "/api/logout"
});
