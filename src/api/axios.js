import axios from "axios";
import { BASE_URL } from "../config/URL";

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});