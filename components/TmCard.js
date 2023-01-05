import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Router from "next/router";
import { toast } from "react-hot-toast";
import * as api from '../api/apiTests';
import { useAuth } from "../hooks/use-auth";
import { Button } from "@mui/material"

import {media} from "../public/personality-test.svg"

export default function TestCard({test, testSet, setTestSet}) {
	const auth = useAuth();
	const removeTest = async (test) =>{
		const refreshToast = toast.loading('...در حال حذف آزمون');
		const {status} = await api.DeleteTestByID(test.id, auth?.user?.token);
		if (status != 200){
			toast.error('.حذف آزمون با خطا مواجه شد', {
				id: refreshToast,
			});
		}
		else{
			toast.success('.آزمون حذف شد', {
				id: refreshToast,
			});
		const newSet = testSet.filter(x=>x.id!=test.id)
		setTestSet(newSet);
		}
	}
	const edit = async (test) => {
		Router.push(`/Tests/Manage/${test.name}`)
	}

	return (
		<Card key={test.id} dir='rtl' sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="140"
				image={media}
				// image="personality-test.svg"
				alt="Personal Test"
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="div">
				{test.name}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{test.display_name}
			</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" color='error' onClick={()=>removeTest(test)} >حذف</Button>
				<Button size="small" onClick={()=>edit(test)} >ویرایش</Button>
			</CardActions>
		</Card>
	)
}
