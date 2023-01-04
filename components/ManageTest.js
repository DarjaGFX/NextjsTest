import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as TestApi from '../api/apiTests';
import FloatingButton from "./FloatingButton";
import QuestionBar from "./QuestionBar";
import Snackbar from '../components/Snakbar';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from "../hooks/use-auth";


export default function ManageTest ({test}){
    const [testName, setTestName] = useState(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        const vt = async () => {
            const response = typeof(test.id)!="string" ? await TestApi.PutUpdateTest(
                JSON.stringify({
                    id: test.id,
                    name: testName,
                    display_name: testDisplayName
                }),
                auth?.user?.token
            ):
            await TestApi.PostCreateTest(
                JSON.stringify({
                    name: testName,
                    display_name: testDisplayName
                }),
                auth?.user?.token
            )
            if (response.status == 200){
                test.id = Number(response.data.id);
            }
        }
        if (testName != "" && testDisplayName != "" && (testName != test.name || testDisplayName != test.display_name)){
            vt();
        }
    }, [test, testName, testDisplayName, auth])

    useEffect(() => {
        const taf = async () => {
            const {status, data} = await TestApi.GetTestQuestions(test.id);
            setQuestions(data);
        }
        if (typeof(test.id)!="string") taf();
    }, [test])
    
    const addQuestionbar = () =>{
        if(testName != "" && testDisplayName != ""){
            if(!questions?.some(x => typeof(x.id)=="string")){
                setQuestions([...questions, {id:"0"+(new Date()).valueOf(), text:"", coefficient:0}]);
            }
        }else{
            setOpen(!open);
        }
    }

    return (
        <>
            <Tooltip title="سوال جدید">
                <FloatingButton func={addQuestionbar}/>
            </Tooltip>
            <div className="flex flex-col items-center w-full h-full overflow-scroll scroll-smooth scrollbar-hide" >
                <Snackbar open={open} setOpen={setOpen} severity="warning" message={".ابتدا نام و نام نمایشی آزمون را وارد کنید"} />
                <div className="flex flex-row-reverse items-center justify-center w-full">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex items-center  p-10 border-b-2"
                    >
                        <TextField 
                            dir="rtl"
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام آزمون" 
                            variant="standard"
                            value={testName}
                            onChange={e=>setTestName(e.target.value)}
                        />
                        <TextField 
                            dir="rtl"
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام نمایشی آزمون" 
                            variant="standard" 
                            value={testDisplayName}
                            onChange={e=>setTestDisplayName(e.target.value)}
                        />
                    </Box>
                </div>
                    {questions?.length>0 ? 
                        questions?.sort((a, b) => a.id-b.id).map(q=>{
                            return (
                                <QuestionBar key={q?.id} question={q} questions={questions} setQuestions={setQuestions} test={test}/>
                            )
                        }) : (<></>)
                    }
            </div>
        </>
    )
}
