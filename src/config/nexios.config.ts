import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
}) 

export default nexiosInstance;
