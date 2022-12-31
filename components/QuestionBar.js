import { IconButton, TextField, ToggleButtonGroup, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import * as QuestionApi from '../api/apiQuestions';
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

const cookies = new Cookies();

export default function QuestionBar({question, questions, setQuestions}) {
		const [questionText, setQuestionText] = useState(question?.text);
		const [coefficient, setCoefficient] = useState(question?.coefficient);

		const handleChange = (event, newCoefficient) => {
			if (newCoefficient !== null) {
				setCoefficient(newCoefficient);
				// console.log(coefficient);
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
			questions.filter(t => t.id == question.id).map(x=>{
				x.text = questionText;
				x.coefficient = coefficient;
			});
			setQuestions(questions);
		}, [questionText, coefficient])
		
		
		return (
				<div className= "flex flex-row-reverse items-center justify-center w-full px-7">
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
						value={questionText}
						onChange={e=>setQuestionText(e.target.value)}
					/>
					<p className="p-4 min-w-fit">:ارزش پاسخ‌ها</p>
					<ToggleButtonGroup
						className="pl-10"
						color="primary"
						value={coefficient}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						<ToggleButton value={0}>نزولی</ToggleButton>
						<ToggleButton value={1}>صعودی</ToggleButton>
					</ToggleButtonGroup>
				</div>
		)
}
