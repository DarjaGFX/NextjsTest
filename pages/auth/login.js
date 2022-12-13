import Router from "next/router";
import { useState } from "react";
import validator from "../../hooks/verify_token";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import toast from "react-hot-toast";


export default function LoginPage() {
    validator('/dashboard');
    const [mobile, setMobile] = useState();
    const [sendCode, setsendCode] = useState(false);


    const sendVerificationCode = async () => {
        try{
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
                // Router.push('/auth/verification?mobileNo='+mobile);
            }
            else{
                    toast.error('Operation Failed!', {
                        id: refreshToast,
                    })
                            // Router.push('/500');
                }
                Router.reload();
        }
        catch{
            Router.push('/500');
        }
    } 
    return (
        <>
            {sendCode ? (''):(
                <>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField 
                            id="standard-basic" 
                            inputProps={{ inputMode: 'numeric', pattern: '09[0-9]{9}' }}
                            label="Mobile" 
                            variant="standard" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </Box>
                    <br/>
                    <Stack spacing={2} direction="row">
                        <Button onClick={sendVerificationCode} variant="contained">ارسال رمز ورود</Button>
                    </Stack>
                    <hr/>
                </>
                )}
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