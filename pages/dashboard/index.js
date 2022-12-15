import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Cookies from 'universal-cookie';
import { DashboardSidebar } from "../../components/DashboardSidebar";
import validator from "../../hooks/verify_token";
const cookies = new Cookies();

export default function Dashboard() {

    // validator('/auth/login', false);
    return (
        <>
            <div className="flex flex-row-reverse h-full w-full">
                {/* Dashboard Sidebar */}
                <DashboardSidebar isAdmin={true}/>
                {/* Dashboard Sidebar */}
                <div className="flex flex-row-reverse justify-center items-center w-full h-full">
                    <Image width={300} height={300} src="/vector person.svg" alt=""></Image>
                </div>
            </div>
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
