import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Cookies from 'universal-cookie';
import validator from "../../hooks/verify_token";
const cookies = new Cookies();

export default function Dashboard() {

    validator('/auth/login', false);
    return (
        <>
            <h1>Dashboard</h1>
            <hr/>
            <br/>
            <br/>
            <Link href={'/tests'}>
            آزمون
            </Link>

        </>
    )
}

// export async function getServerSideProps(){
//     validator('/auth/login', false);
//     const token = cookies.get("token");
//     const response = await fetch('http://localhost:8001/api/v1/user/verify_token', {
//             method: 'POST',
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         });
//     return {
//         props: {
//             user: await response.json(),
//         },
//     }
// }
