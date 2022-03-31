import { BASE_URL_SERVER } from "./config";
import axios from "axios";

export const basic = axios.create({
    baseURL: BASE_URL_SERVER,
  });
