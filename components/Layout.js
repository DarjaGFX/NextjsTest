import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout ({children}) {
    return (
        <>
            <Toaster/>
            <div className="content">
                <Header/>
                <Navbar/>
                <hr/>
                <main>
                    {children}
                </main>
                <hr/>
                <Footer/>
            </div>
        </>
    )
}
