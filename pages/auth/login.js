import Router from "next/router";
import { useState } from "react";
import validator from "../../hooks/verify_token";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function loginPage() {
    validator('/dashboard');
    const [mobile, setMobile] = useState();

    const sendVerificationCode = async () => {
        const response = await fetch('http://localhost:8001/api/v1/user/request_verification_code', {
            method: 'POST',
            body: JSON.stringify({mobile}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        console.log(data)
        Router.push('/auth/verification?mobileNo='+mobile);
    } 
    return (
        <>
        <label>Mobile: </label>
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
        <button onClick={sendVerificationCode}>Send Verification Code</button>
        <hr/>
        </>
    )
}

// export async function getServerSideProps(){
//     validator('/dashboard');
//     return {
//         props: {
            
//         }
//     }
// }