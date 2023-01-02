import { useState } from "react";
import FloatingButton from "../../../components/FloatingButton";
import TestCard from "../../../components/TestCard";
import * as api from '../../../api/apiTests';
import Router from "next/router";

export default function Manage ({tests}){
	const [testSet, setTestSet] = useState(tests);
	const fabf = () => {
		Router.push(`/Tests/Manage/new`);
	}
	return (
	<div className="flex flex-row-reverse h-full w-full flex-wrap justify-start items-start">
		<FloatingButton func={fabf}/>		
		{testSet?.map(test => {
			return (
				<TestCard key={test.id} test={test} testSet={testSet} setTestSet={setTestSet} /> 
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