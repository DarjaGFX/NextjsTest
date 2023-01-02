import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as TestApi from '../api/apiTests';
import FloatingButton from "./FloatingButton";
import QuestionBar from "./QuestionBar";
import Cookies from "universal-cookie";


const cookies = new Cookies();

export default function ManageTest ({test}){
    const [testName, setTestName] = useState(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const [questions, setQuestions] = useState([]);
    const token = cookies.get("token");

    useEffect(() => {
        const vt = async () => {
            const response = typeof(test.id)!="string" ? await TestApi.PutUpdateTest(
                JSON.stringify({
                    id: test.id,
                    name: testName,
                    display_name: testDisplayName
                }),
                token
            ):
            await TestApi.PostCreateTest(
                JSON.stringify({
                    name: testName,
                    display_name: testDisplayName
                }),
                token
            )
            if (response.status == 200){
                test.id = Number(response.data.id);
            }
        }
        if (testName != "" && testDisplayName != "" && (testName != test.name || testDisplayName != test.display_name)){
            vt();
        }
    }, [test, testName, testDisplayName, token])

    useEffect(() => {
        const taf = async () => {
            const {data} = await TestApi.GetTestQuestions(test.id);
            setQuestions(data);
        }
        taf();
    }, [test])
    
    const addQuestionbar = () =>{
        if(!questions?.some(x => typeof(x.id)=="string")){
            setQuestions([...questions, {id:"0"+(new Date()).valueOf(), text:"", coefficient:0}]);
        }
    }

    return (
        <>
            <FloatingButton func={addQuestionbar}/>
            <div className="flex flex-col items-center w-full h-full overflow-scroll scroll-smooth scrollbar-hide" >
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
                    {questions?.length>0 ? questions?.map(q=>{
                            return (
                                <QuestionBar key={q?.id} question={q} questions={questions} setQuestions={setQuestions} test={test}/>
                            )
                        }) : (<></>)
                    }
            </div>
        </>
    )
}
