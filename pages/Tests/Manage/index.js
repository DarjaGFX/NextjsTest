import { useState } from "react";
import FloatingButton from "../../../components/FloatingButton";
import TestCard from "../../../components/TestManageCard";
import TmCard from "../../../components/TmCard";
import * as api from '../../../api/apiTests';
import Router from "next/router";
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from "../../../hooks/use-auth";
import { useRequireAuth } from "../../../hooks/use-require-auth";


export default function Manage ({tests}){
	const [testSet, setTestSet] = useState(tests);
	const auth = useAuth();
    useRequireAuth();

	const fabf = () => {
		Router.push(`/Tests/Manage/new`);
	}
	return (
	<div className="flex flex-row-reverse h-full w-full flex-wrap justify-evenly pt-20 pr-10 items-start">
		<Tooltip title="آزمون جدید">
			<FloatingButton func={fabf}/>		
		</Tooltip>
		{testSet?.map(test => {
			return (
				<TmCard key={test.id} test={test} testSet={testSet} setTestSet={setTestSet} /> 
				// <TestCard key={test.id} test={test} testSet={testSet} setTestSet={setTestSet} /> 
			)
		})}
		
	</div>
  )
}

export async function getServerSideProps(context){
  const {data} = await api.GetAllTests();
  return {
		props: {
			tests: data
		}
  }
}