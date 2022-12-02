import Router, { useRouter } from "next/router";
import { useState } from "react";
import Cookies from 'universal-cookie';
import validator from "../../hooks/verify_token";
const cookies = new Cookies();
import Link from "next/link";

export default function verificationPage() {
    const [mobile, setMobile] = useState(useRouter().query.mobileNo?.toString() || "");
    const [code, setCode] = useState()
    const login = async () => {

        const body_data = [
            'username=' + mobile,
            'password=' + code
        ]
        const response = await fetch('http://localhost:8001/api/v1/user/login', {
            method: 'POST',
            body: body_data.join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const data = await response.json()
        console.log(data)
        let d = new Date();
        d.setTime(d.getTime() + (60*60*1000));
        cookies.set("token", data?.access_token, {path: '/', expires: d});
        Router.push('/dashboard');
    }
    validator('/dashboard')
    return (
        <>
            <label>Mobile:</label>
            <input
                type='text'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <label>Verification Code: </label>
            <input
                type='text'
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={login}>Login</button>
        </>
    )
}

// export async function getServerSideProps(){
//     validator('/dashboard');
//     return {
//         props: {
            
//         }
//     }
// }