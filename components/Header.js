import { Button } from "@mui/material";
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
                    <img className="flex-1" src="../public/vercel.svg"></img>
                </div>
            </nav>
        </>
    )
}


export default Header;