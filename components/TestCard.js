import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Router from "next/router";


export default function TestCard({test}) {
	return (
		<Card key={test.id} dir='rtl' sx={{ maxWidth: 345 }} onClick={() => {Router.push('/Tests/'+test.name)}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image="personality-test.svg"
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
			</CardActionArea>
		</Card>
	)
}
