import { IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import * as QuestionApi from '../api/apiQuestions';
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";


const cookies = new Cookies();

export default function QuestionBar({question, questions, setQuestions}) {
		const [questionText, setQuestionText] = useState(question?.text);
		const questionTextRef = useRef(question?.text)
		const [direction, setDirection] = useState(false);

		const handleChange = (event, newDirection) => {
			if (newDirection !== null) {
				setDirection(newDirection);
				console.log(direction);
			}
		};
		
		const handleRemove = async () => {
			const refreshToast = toast.loading('...در حال حذف سوال');
			const token = cookies.get("token");
			const {status} = await QuestionApi.DeleteQuestion(question.id, token);
			if (status != 200){
				toast.error('.حذف سوال با خطا مواجه شد', {
					id: refreshToast,
				});
				const newSet = questions.filter(x=>x.id!=question.id);
				setQuestions(newSet);
			}
			else{
				toast.success('.سوال حذف شد', {
					id: refreshToast,
				});
			}
		};

		useEffect(() => {
				questionTextRef.current.value = question?.text;
		}, [question])
		
		
		return (
				<div className="flex flex-row-reverse items-center justify-center w-full pr-7 pl-20">
					<IconButton aria-label="delete" onClick={handleRemove}>
						<DeleteIcon />
					</IconButton>
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
					<p className="p-4">:ارزش پاسخ‌ها</p>
					<ToggleButtonGroup
						className="pl-10"
						color="primary"
						value={direction}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						<ToggleButton value={false}>نزولی</ToggleButton>
						<ToggleButton value={true}>صعودی</ToggleButton>
					</ToggleButtonGroup>
				</div>
		)
}
