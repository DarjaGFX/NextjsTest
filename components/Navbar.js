import { Button } from "@mui/material";
import Link from "next/link"
// import { useAuth } from "../hooks/useAuth";
import validator from "../hooks/verify_token"


const Navbar =  () => {
    // const auth = useAuth();
    return (
        <>
            <nav className=" border-x-slate-700 border-y-2 pb-3">
                <div className="flex flex-row-reverse mr-10 mt-3">
                    <Link className="px-3  hover:bg-gray-200" href={'/dashboard'} >
                        داشبورد
                    </Link>
                    <Link className="px-3  hover:bg-gray-200" href={'/tests'}>
                        آزمون‌ها
                    </Link>
                </div>
            </nav>
                {/* <div className="hidden flex-row-reverse mr-10 mt-3">
                    <Link className="pl-5" href={'/dashboard'}>
                        <p>داشبورد</p>
                    </Link>
                </div> */}
        </>
    )
}


export default Navbar;