import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import SidebarLinks from "../../components/SidebarLinks";
import { useAuth } from "../../hooks/use-auth";
import {useRequireAuth} from '../../hooks/use-require-auth';


export default function Dashboard() {
    const auth = useAuth();
    useRequireAuth();

    return (
        <>
            <div className="flex flex-row-reverse h-full w-full">

                {/* <Sidebar>
                    <SidebarLinks href={"#"} text={"حساب کاربری"} />
                    {auth.user?.url == 1 ? (
                        <SidebarLinks href={"/Tests/Manage"} text={"مدیریت آزمون‌ها"} />
                        ):("")
                    }
                </Sidebar> */}
                {/* Dashboard Sidebar */}
                <div className="flex flex-row-reverse justify-center items-center w-full h-full">
                    <Image width={300} height={300} src="/vector person.svg" alt=""></Image>
                </div>
            </div>
        </>
    )
}
