import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_PORT,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "access_token": localStorage.getItem("access_token")
    }
})
