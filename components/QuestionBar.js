import { IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function QuestionBar({question, test}) {
		const [questionText, setQuestionText] = useState(question?.text);
		const questionTextRef = useRef(question?.text)
		const [alignment, setAlignment] = useState(false);

		const handleChange = (event, newAlignment) => {
			if (newAlignment !== null) {
				setAlignment(newAlignment);
				console.log(alignment);
			}
		};
		
		useEffect(() => {
				questionTextRef.current.value = question?.text;
		}, [question])
		
		
		return (
				<div className="flex flex-row-reverse items-center justify-center w-full p-3">
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
					<p className="p-4">:ارزش پاسخ‌ها</p>
					<ToggleButtonGroup
						className="pl-10"
						color="primary"
						value={alignment}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						<ToggleButton value={false}>نزولی</ToggleButton>
						<ToggleButton value={true}>صعودی</ToggleButton>
					</ToggleButtonGroup>

					<TextField 
						className="text-right"
						multiline
						maxRows={2}
						fullWidth
						id="standard-basic" 
						inputProps={{ inputMode: 'text' }}
						label="سوال" 
						variant="standard" 
						inputRef={questionTextRef}
					/>
				</div>
		)
}

export default QuestionBar