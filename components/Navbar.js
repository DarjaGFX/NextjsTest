import { Button } from "@mui/material";
import Link from "next/link"
// import { useAuth } from "../hooks/useAuth";
import validator from "../hooks/verify_token"


const Navbar =  () => {
    // const auth = useAuth();
    return (
        <>
            <nav>
                <div className="flex flex-row-reverse mr-10 mt-3">
                    
                    {/* {auth.user ? (
                        <div>
                            <Link to="/account">Account ({auth.user.email})</Link>
                            <Button onClick={() => auth.signout()}>Signout</Button>
                        </div>
                        ) : (
                        <Link to="/signin">Signin</Link>
                        )
                    } */}
                    <Link href={'/tests'}>
                        <p>‌آزمون‌ها</p>
                    </Link>

                </div>
            </nav>
        </>
    )
}


export default Navbar;