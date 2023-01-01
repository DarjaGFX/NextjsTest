import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as TestApi from '../../../api/apiTests';
import * as QuestionApi from '../../../api/apiQuestions';
import FloatingButton from "../../../components/FloatingButton";
import QuestionBar from "../../../components/QuestionBar";
import Sidebar from "../../../components/Sidebar";
import Cookies from "universal-cookie";


const cookies = new Cookies();

export default function TestName ({test}, {isAdmin}){
    const [testName, setTestName] = useState(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const [questions, setQuestions] = useState();

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
        vt();
    }, [test, testName, testDisplayName, token])
    

    useEffect(() => {
        const taf = async () => {
            const {data} = await TestApi.GetTestQuestions(test.id);
            setQuestions(data);
        }
        taf();
    }, [test])
    
    const addQuestionbar = () =>{
        if(!questions.some(x => typeof(x.id)=="string")){
            setQuestions([...questions, {id:"0"+(new Date()).valueOf(), text:"", coefficient:0}]);
        }
    }

    return (
        <div className="flex flex-row-reverse h-full w-full">
        <FloatingButton/>

            <Sidebar>
                <div className="border-b-4 rounded-b-lg  w-full flex justify-center items-center h-20">
                <p> ویرایش {test.display_name} </p>
                </div>
            </Sidebar>

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
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام آزمون" 
                            variant="standard"
                            value={testName}
                            onChange={e=>setTestName(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام نمایشی آزمون" 
                            variant="standard" 
                            value={testDisplayName}
                            onChange={e=>setTestDisplayName(e.target.value)}
                        />
                    </Box>
                </div>
                {/* Question Row Components */}
                    {questions?.map(q=>{
                        return (
                            <QuestionBar key={q?.id} question={q} questions={questions} setQuestions={setQuestions} test={test}/>
                        )
                    })}
                {/* Question Row Components */}
                <div className="flex flex-row-reverse w-full p-7">
                    <Button variant="text" color="primary" onClick={addQuestionbar}>افزودن سوال</Button>
                </div>
                {/* <button onClick={(e) => {
                    e.preventDefault();
                    console.log(questions);
                }}>print</button> */}
            </div>
        </div>
    )
}

export async function getStaticPaths(){
    const {data} = await TestApi.GetAllTests();
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
    const {data} = await TestApi.GetTestByNameID(params.name);
    return {
        props: {
            test: data
        }
    }
}