import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as api from '../api/apiLogin';



const Navbar =  () => {
    const cookies = new Cookies();
    const [logedIn, setLogedIn] = useState(false);
        const token = cookies.get("token");
        useEffect(() => {
        // const token = window.sessionStorage.getItem("token");
        if (token) {
            const vt = async (token) => {
                const {status} = await api.PostVerifyToken(token)
                return status;               
            }
            vt(token)
            .then(data => {
                if (data === 200){
                    setLogedIn(true);
                }
                else{
                    setLogedIn(false);
                }
            })
        }
        else{
            setLogedIn(false);
        }

    }, [logedIn, token])
    
    const logOut = () => {
        // window.sessionStorage.removeItem("token");
        cookies.remove("token", {path: '/'});
        setLogedIn(false);
    }
    return (

        <div>
        <AppBar position="static">
            <Toolbar className="flex flex-row-reverse justify-between">
                    <div>
                        {logedIn ? (
                                <Link className="px-3  hover:underline" href={'/Dashboard'} >
                                داشبورد
                                </Link>
                            ):(
                                <Link className="px-3  hover:underline" href={'/Auth/login'} >
                                    ورود
                                </Link>
                            )
                        }
                        <Link className="px-3  hover:underline" href={'/Tests'}>
                            آزمون‌ها
                        </Link>
                    </div>
                    <div>
                        {logedIn ? (
                                <button className="px-3  hover:underline" onClick={logOut} >
                                خروج
                                </button>
                            ):(
                                ""
                            )
                        }
                    </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}


export default Navbar;