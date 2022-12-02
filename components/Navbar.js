import Link from "next/link"
import validator from "../hooks/verify_token"

const Navbar =  () => {
    // var emb;
    // if (validator()){
    //     emb = (<Link href={'/dashboard'}>
    //     <p>خانه</p>
    //     </Link>)
    // }
    // else{
    //     emb = (<Link href={'/login'}>
    //     <p>ورود</p>
    //     </Link>)
    // }
    return (
        <>
            <nav>
                <div className="logo">
                    <Link href={'/'}>
                        <h1>
                            سنجش و پایش
                        </h1>
                    </Link>
                    {/* {emb}     */}
                    <Link href={'/tests'}>
                        <p>‌آزمون‌ها</p>
                    </Link>

                </div>
            </nav>
        </>
    )
}


export default Navbar;