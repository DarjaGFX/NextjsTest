import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as TestApi from '../../../api/apiTests';
import * as QuestionApi from '../../../api/apiQuestions';
import FloatingButton from "../../../components/FloatingButton";
import QuestionBar from "../../../components/QuestionBar";
import Sidebar from "../../../components/Sidebar";

export default function TestName ({test}, {isAdmin}){
    const [testName, setTestName] = useState(test.name);
    const testNameRef = useRef(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const testDNameRef = useRef(test.display_name);
    const [questions, setQuestions] = useState();
    useEffect(() => {
      testNameRef.current.value = test.name;
      testDNameRef.current.value = test.display_name;
    }, [test])

    useEffect(() => {
        const taf = async () => {
            const {data} = await TestApi.GetTestQuestions(test.id);
            setQuestions(data);
        }
        taf();
    }, [test])
    
    const addQuestionbar = () =>{
        setQuestions([...questions, {id:0, text:"", coefficient:0}]);
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
                            inputRef={testNameRef}
                        />
                        <TextField 
                            id="standard-basic" 
                            inputProps={{ inputMode: 'text' }}
                            label="نام نمایشی آزمون" 
                            variant="standard" 
                            inputRef={testDNameRef}
                        />
                    </Box>
                </div>
                {/* Question Row Components */}
                    {questions?.map(q=>{
                        return (
                            <QuestionBar key={q?.id} question={q} questions={questions} setQuestions={setQuestions} />
                        )
                    })}
                {/* Question Row Components */}
                <div className="flex flex-row-reverse w-full p-7">
                    <Button variant="text" color="primary" onClick={addQuestionbar}>افزودن سوال</Button>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    console.log(questions);
                }}>print</button>
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