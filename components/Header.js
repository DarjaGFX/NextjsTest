import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link"
// import { useAuth } from "../hooks/useAuth";
import validator from "../hooks/verify_token"


const Header =  () => {
    // const auth = useAuth();
    return (
        <>
            <nav>
                <div className="flex flex-row-reverse p-5 justify-between ">
                    <Link href={'/'}>
                        <h1>
                            سنجش و پایش
                        </h1>
                    </Link>
                    <Image width={30} height={30} className="flex-1" src="/vercel.svg" alt="Site Logo" className="w-20"></Image>
                </div>
            </nav>
        </>
    )
}


export default Header;