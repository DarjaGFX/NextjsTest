import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout ({children}) {
    return (
        <>
            <Toaster/>
            <div className="flex flex-col h-screen">
                <div className="flex-none">
                    <Header/>
                    <Navbar/>
                </div>
                    <main className="flex-grow">
                        {children}
                    </main>
                <div className="flex-none">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
