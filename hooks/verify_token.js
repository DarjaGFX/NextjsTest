import Router from "next/router";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default async function validator(url, on_success=true){
    const token = cookies.get("token");
    if (token){
        const response = await fetch('http://192.168.1.55:8001/api/v1/user/verify_token', {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if (response.status === 200){
            if (on_success && url){
            Router.push(url)
            }
            return true
        }
    }
    if (!on_success && url){
        Router.push(url)
    }
    return false
}