import { Box, Button, Slide, TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import * as TestApi from '../api/apiTests';
import FloatingButton from "./FloatingButton";
import QuestionBar from "./QuestionBar";
import Cookies from "universal-cookie";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const cookies = new Cookies();

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function ManageTest ({test}){
    const [testName, setTestName] = useState(test.name);
    const [testDisplayName, setTestDisplayName] = useState(test.display_name);
    const [questions, setQuestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const token = cookies.get("token");

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };


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
            setTransition(() => TransitionRight);
            setOpen(true);
        }
    }
    function TransitionRight(props) {
        return <Slide {...props} direction="right" />;
      }
    
    return (
        <>
            <FloatingButton func={addQuestionbar}/>
            <div className="flex flex-col items-center w-full h-full overflow-scroll scroll-smooth scrollbar-hide" >
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar TransitionComponent={transition} anchorOrigin={{ 'vertical':'top', 'horizontal':'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            .ابتدا نام و نام نمایشی آزمون را وارد کنید
                        </Alert>
                    </Snackbar>
                </Stack>
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
