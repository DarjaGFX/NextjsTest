import Router, { useRouter } from "next/router";
import { useState } from "react";
import Cookies from 'universal-cookie';
import validator from "../../hooks/verify_token";
const cookies = new Cookies();
import Link from "next/link";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function VerificationPage({param}) {
    const [mobile, setMobile] = useState(param.mobileNo?.toString());
    const [code, setCode] = useState()
    validator('/dashboard');
    const login = async () => {
        const body_data = [
            'username=' + mobile,
            'password=' + code
        ]
        const response = await fetch('http://localhost:8001/api/v1/user/login', {
            method: 'POST',
            body: body_data.join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const data = await response.json()
        console.log(data)
        if (response.status === 200){
            // let d = new Date();
            // d.setTime(d.getTime() + (60*60*1000));
            // cookies.set("token", data?.access_token, {path: '/', expires: d});
            
            cookies.set("token", data?.access_token, {path: '/'});
            Router.push('/dashboard');
        }
        else{
            Router.reload();
        }
    }
    return (
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
                <TextField 
                    id="standard-basic" 
                    inputProps={{ inputMode: 'text', pattern: '09[0-9]{9}' }}
                    label="Verification Code" 
                    variant="standard" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </Box>
            <Stack spacing={2} direction="row">
                <Button onClick={login} variant="contained">ورود</Button>
            </Stack>
        </>
    )

}

export async function getServerSideProps(context){
    return {
        props: {
            param: context.query            
        }
    }
}