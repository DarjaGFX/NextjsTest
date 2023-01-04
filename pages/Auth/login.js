import Router from "next/router";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from "react-hot-toast";
import { useRef } from "react";
// import Cookies from "universal-cookie";
import * as api from "../../api/apiLogin";
import { useAuth } from "../../hooks/use-auth";


export default function LoginPage() {
    const [mobile, setMobile] = useState("");
    const mobileRef = useRef(null);
    const VCodeRef = useRef(null);
    const [VCode, setVCode] = useState("");
    const [sendCode, setsendCode] = useState(false);
    const auth = useAuth();
    
    useEffect(() => {
        const tf = async (VCode, mobile) => {
            try{
                if(mobile != "" && VCode != ""){
                    auth.signin(mobile, VCode)
                    if(auth.user){
                        Router.push('/Dashboard');
                    }
                    // const login = await api.PostLogin(username=mobile, password=VCode);
                    // if (login.status === 200){
                        // // window.sessionStorage.setItem("token", data?.access_token)
                        // const cookies = new Cookies();
                        // cookies.set("token", login.data?.access_token, {path: '/'});
                        // Router.push('/Dashboard');
                    // }
                    // else{
                    //     // Router.reload();
                    // }
                }
            }
            catch{}
        }
        try{
            tf(VCode, mobile);
        }
        catch{
        }
    }, [VCode, mobile, auth])
    
    useEffect(() => {
        const tf = async (mobile) =>{
            try{
                if(mobile != ""){
                    const refreshToast = toast.loading('...در حال ارسال رمز یکبار مصرف ورود');
                    const {status}  = await api.PostLoginRequestVerificationCode(JSON.stringify({mobile}));
                    if (status === 200){
                        // let d = new Date();
                        // d.setTime(d.getTime() + (60*60*1000));
                        // cookies.set("token", data?.access_token, {path: '/', expires: d});
                        toast.success('.رمز یکبار مصرف ارسال شد', {
                            id: refreshToast,
                        })
                        setsendCode(true);
                        // Router.push('/auth/verification?mobileNo='+mobile);
                    }
                    else{
                            toast.error('.ارسال رمز یکبار مصرف با خطا مواجه شد', {
                                id: refreshToast,
                            })
                                    // Router.push('/500');
                    }
                        // Router.reload();  
                }  
            }
            catch{}
        }
        try{
            tf(mobile);
        }
        catch{
        }
    }, [mobile])
    

    const login = async (e) => {
        e.preventDefault();
        setVCode(VCodeRef.current.value);
    }

    const resetPage = async (e) => {
        e.preventDefault();
        setsendCode(false);
        setMobile("");
    }

    const sendVerificationCode = async (e) => {
        e.preventDefault();
        setMobile(mobileRef.current.value);
    } 

    return (
        <>
            <div className="grow flex flex-col  justify-center items-center h-full">
            {sendCode && mobile ? (
                <>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex flex-col items-center  p-10 rounded-3xl border-2"
                    >
                        <TextField 
                            dir="rtl"
                            id="standard-basic" 
                            inputProps={{ inputMode: 'numeric', pattern: '09[0-9]{9}' }}
                            label="Mobile" 
                            variant="standard" 
                            value={mobile}
                            disabled
                        />
                        <TextField 
                            dir="rtl"
                            id="otpField" 
                            inputProps={{ inputMode: 'numeric', pattern: '09[0-9]{9}' }}
                            inputRef={VCodeRef}
                            label="OTP" 
                            variant="standard" 
                        />
                        <div className="flex justify-center items-center">
                        <Button className="flex-none text-sm" onClick={resetPage}  variant="text" >شماره اشتباه است؟</Button>
                        <Button className="grow" onClick={login}  variant="outlined" color="primary" >ورود</Button>
                        </div>
                    </Box>
                    <br/>
                    <hr/>
                </>
            ):(
                <>
                    <Box
                        className="flex flex-col justify-center items-center  p-10 rounded-3xl border-2"
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField 
                            dir="rtl"
                            id="mobileField" 
                            inputProps={{ inputMode: 'numeric', pattern: '09[0-9]{9}' }}
                            label="Mobile" 
                            variant="standard" 
                            inputRef={mobileRef}
                        />
                        <Button onClick={sendVerificationCode}  variant="outlined" color="primary" >ارسال رمز ورود</Button>
                    </Box>
                </>
                )}
            </div>
        </>
    )
}
