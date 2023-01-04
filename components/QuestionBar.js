import { IconButton, TextField, ToggleButtonGroup, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import * as QuestionApi from '../api/apiQuestions';
import { toast } from "react-hot-toast";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { useAuth } from "../hooks/use-auth";


export default function QuestionBar({question, questions, setQuestions, test}) {
		const [questionText, setQuestionText] = useState(question?.text);
		const [coefficient, setCoefficient] = useState(question?.coefficient);
		const auth = useAuth();

		const handleChange = (event, newCoefficient) => {
			if (newCoefficient !== null) {
				setCoefficient(newCoefficient);
			}
		};
		
		const handleRemove = async () => {
			if (typeof(question.id) === "string"){
				const newSet = questions.filter(x=>x.id!=question.id);
				setQuestions(newSet);
			}
			else{
				const refreshToast = toast.loading('...در حال حذف سوال');
				const {status} = await QuestionApi.DeleteQuestion(question.id, auth?.user?.token);
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
			}
		};

		useEffect(() => {
			const vt = async () => {
				const response = typeof(question.id)=="string" ?  await QuestionApi.PostCreateQuestion(
						JSON.stringify({
							"test": test.id,
							"text": questionText,
							"coefficient": coefficient
						}),
						auth?.user?.token
					):
					await QuestionApi.PutUpdateQuestion(
						JSON.stringify({
							"id": question.id,
							"text": questionText,
							"coefficient": coefficient
						}),
						auth?.user?.token
					)
				if (response.status == 200){
					questions.filter(t => t.id == question.id).map(x=>{
						x.text = questionText;
						x.coefficient = coefficient;
						x.id = Number(response.data.id)
					});
					setQuestions(questions);
				}
			}
			if (questionText != "" && (questionText != question.text || coefficient != question.coefficient)){
				vt();
			}
		}, [questionText, coefficient, question, questions, setQuestions, test, auth])
		
		
		return (
				<div className= "flex flex-row-reverse items-center justify-center w-full px-7">
					<IconButton aria-label="delete" onClick={handleRemove}>
						<DeleteIcon />
					</IconButton>
					<TextField 
						dir="rtl"
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
