import { auth } from "./auth"

import { headers } from "next/headers"
const getTokenFromServer= async()=>{
    const jwtToken=await auth.api.getToken({headers:await headers()});

    return jwtToken?.token
}



export default getTokenFromServer