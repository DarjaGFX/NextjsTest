import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Fab, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import QuestionBar from "../../../components/QuestionBar";
import SidebarLinks from "../../../components/SidebarLinks";

export default function TestName ({test}, {isAdmin}){
    const [testName, setTestName] = useState(test.name);
    const testNameRef = useRef(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const testDNameRef = useRef(test.display_name);
    useEffect(() => {
      testNameRef.current.value = test.name;
      testDNameRef.current.value = test.display_name;
    }, [test])
    
    return (
        <div className="flex flex-row-reverse h-full w-full">

            <div className="flex flex-col h-full border-l-2 sm:hidden md:inline w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 items-center">
                <div className="border-b-4 rounded-b-lg  w-full flex justify-center items-center h-20">
                <p> ویرایش {test.display_name} </p>
                </div>
                {/* <SidebarLinks href={"#"} text={"حساب کاربری"} /> */}

            </div>
            {/* Dashboard Sidebar */}
            <div className="flex flex-col items-center w-full h-full overflow-scroll scroll-smooth" >
                <div className="fixed bottom-14 right-14 ">
                        <Fab color="primary" aria-label="add">
                            <AddCircleOutline />
                        </Fab>
                </div>
                <div className="flex flex-row-reverse items-center justify-center w-full">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex items-center  p-10 rounded-3xl border-b-2"
                    >
                        <TextField 
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام" 
                            variant="standard" 
                            inputRef={testNameRef}
                        />
                        <TextField 
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام نمایشی" 
                            variant="standard" 
                            inputRef={testDNameRef}
                        />
                    </Box>
                </div>
                {/* Question Row Components */}
                    <QuestionBar key={question?.id || 0} question={question ? question : null} test={test} />
                {/* Question Row Components */}
            </div>
        </div>
    )
}

export async function getStaticPaths(){
    const response = await fetch('http://127.0.0.1:8001/api/v1/tests/');
    const data = await response.json();
    const paths = data.map( d => {
        return {
            params: {
                name: d.name
            }
        }
    });
    return {
        // paths: [{
        //         params: {
        //             name: 'EQ'
        //         }
        // }],
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context){
    const {params} = context;
    const response = await fetch(`http://127.0.0.1:8001/api/v1/tests/${params.name}`);
    const data = await response.json();
    return {
        props: {
            test: data
        }
    }
}