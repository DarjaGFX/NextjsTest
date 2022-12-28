import { Select, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useEffect, useRef, useState } from "react";

function QuestionBar({question, test}) {
    const [questionText, setQuestionText] = useState(question?.text);
    const questionTextRef = useRef(question?.text)
    useEffect(() => {
        questionTextRef.current.value = question?.text;
    }, [question])
    



    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      }));

    return (
        <div className="flex flex-row-reverse justify-start items-center mt-4 sc">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className="flex flex-row-reverse justify-start items-center  p-10 "
            >
                <p>:ارزش پاسخ‌ها</p>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>صعودی</Typography>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>نزولی</Typography>
                </Stack>
                <TextField 
                    id="standard-basic" 
                    inputProps={{ inputMode: 'text' }}
                    label="سوال" 
                    variant="standard" 
                    inputRef={questionTextRef}
                />

            </Box>
        </div>
    )
}

export default QuestionBar