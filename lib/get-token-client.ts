import { token } from "./auth-client";

export const getTokenFromClient= async()=>{
    const {data}=await token()
    return data?.token
}
