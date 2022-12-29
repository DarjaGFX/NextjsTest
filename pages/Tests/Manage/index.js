import { AddCircleOutline } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import  Router  from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import FloatingButton from "../../../components/FloatingButton";
import TestCard from "../../../components/TestCard";

export default function Manage ({tests}){
  const [testSet, setTestSet] = useState(tests);
	
  return (
	<div className="flex flex-row-reverse h-full w-full flex-wrap justify-start items-start">
		<FloatingButton />		
		{testSet.map(test => {
		  return (
			  <TestCard key={test.id} test={test} testSet={testSet} setTestSet={setTestSet} /> 
			)
		})}
		
	</div>
  )
}

export async function getServerSideProps(context){
  const response = await fetch('http://localhost:8001/api/v1/tests/');
  const tests = await response.json();
  console.log(tests);
  return {
	  props: {
		  tests: tests
	  }
  }
}