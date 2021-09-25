import axios from "axios";

const API = axios.create({
    baseURL: "https://api.bscscan.com/",
});

export const callRestAPI_POST = async (url : string, params: any) => {
    try {
       return await API.post(url, params)        
    } catch (err) {
        console.error(`REST API CALL FAILED for : ${url}`)
    }
}

export const callRestAPI_GET = async (url : string) => {
    try {
       return await API.get(url)        
    } catch (err) {
        console.error(`REST API CALL FAILED for : ${url}`)
    }
}

