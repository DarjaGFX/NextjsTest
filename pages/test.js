import { Button } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast"
import DrawerSidebar from '../components/DrawerSidebar';

export default function Index(){
    const [x , setx] = useState(0);
    const handleToast = async () => {
        const refreshToast = toast.loading('felan daram micharkham');
        const data = await fetch('http://localhost:8001/api/v1/tests/');
        toast.success('tamum shod belakhare!', {
            id: refreshToast,
        })
    }
    return (
        <>
            {/* <DrawerSidebar /> */}
            <Button onClick={() => setx(x-1)}>-</Button>
            <p className="text-3xl font-bold underline">{x}</p>
            <Button onClick={() => setx(x+1)}>+</Button>
            <Button onClick={handleToast}>check toast</Button>
        </>
    )
}