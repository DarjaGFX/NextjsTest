import { TextField } from "@mui/material"
import { Box } from "@mui/system"

function QuestionBar({question, test}) {
  return (
    <div className="flex flex-row-reverse justify-around items-center mt-4 sc">
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
                label="سوال" 
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
  )
}

export default QuestionBar