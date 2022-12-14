import Router from "next/router";
import { useState } from "react";
import validator from "../../hooks/verify_token";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import toast from "react-hot-toast";
import { useRef } from "react";
import Cookies from "universal-cookie";


export default function LoginPage() {
    // validator('/dashboard');
    const [mobile, setMobile] = useState();
    const mobileRef = useRef(null);
    const VCodeRef = useRef(null);
    const [VCode, setVCode] = useState();
    const [sendCode, setsendCode] = useState(false);
    
    const cookies = new Cookies();
    
    const login = async (e) => {
        e.preventDefault();
        setVCode(VCodeRef.current.value);
        const body_data = [
            'username=' + mobile,
            'password=' + VCode
        ]
        const response = await fetch('http://localhost:8001/api/v1/user/login', {
            method: 'POST',
            body: body_data.join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const data = await response.json()
        if (response.status === 200){
            cookies.set("token", data?.access_token, {path: '/'});
            // Router.push('/dashboard');
        }
        else{
            // Router.reload();
        }
    }

    const resetPage = async (e) => {
        e.preventDefault();
        setsendCode(false);
        setMobile("");
    }

    const sendVerificationCode = async (e) => {
        e.preventDefault();
        try{
            setMobile(mobileRef.current.value);
            console.log(mobile);
            const refreshToast = toast.loading('sending VerificationCode...');
            const response = await fetch('http://localhost:8001/api/v1/user/request_verification_code', {
                method: 'POST',
                body: JSON.stringify({mobile}),
                headers: {
                    'Content-Type': 'application/json',
                },
                })
            const data = await response.json()
            if (response.status === 200){
                // let d = new Date();
                // d.setTime(d.getTime() + (60*60*1000));
                // cookies.set("token", data?.access_token, {path: '/', expires: d});
                toast.success('Verification Code Sent!', {
                    id: refreshToast,
                })
                setsendCode(true);
                // Router.push('/auth/verification?mobileNo='+mobile);
            }
            else{
                    toast.error('Operation Failed!', {
                        id: refreshToast,
                    })
                            // Router.push('/500');
                }
                // Router.reload();
        }
        catch{
            // Router.push('/500');
        }
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
                            id="standard-basic" 
                            inputProps={{ inputMode: 'numeric', pattern: '09[0-9]{9}' }}
                            label="Mobile" 
                            variant="standard" 
                            value={mobile}
                            disabled
                        />
                        <TextField 
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

// export async function getServerSideProps(context){
//     validator('/dashboard');
//     return {
//         props: {
            
//         }
//     }
// }