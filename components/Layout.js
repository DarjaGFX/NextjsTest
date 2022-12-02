import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout ({children}) {
    return (
        <>
            <div className="content">
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
