import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link"



const Navbar =  () => {
    
    return (

        <div>
        <AppBar position="static">
            <Toolbar className="flex flex-row-reverse justify-between">
                    <div>
                        {/* {logedIn ? (
                                <Link className="px-3  hover:underline" href={'/Dashboard'} >
                                داشبورد
                                </Link>
                            ):(
                                <Link className="px-3  hover:underline" href={'/Auth/login'} >
                                    ورود
                                </Link>
                            )
                        } */}
                        
                        <Link className="px-3  hover:underline" href={'/Tests'}>
                            آزمون‌ها
                        </Link>
                    </div>
                    <div>
                        {/* {logedIn ? (
                                <button className="px-3  hover:underline" onClick={logOut} >
                                خروج
                                </button>
                            ):(
                                ""
                            )
                        } */}
                    </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}


export default Navbar;