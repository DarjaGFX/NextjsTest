import { AddCircleOutline } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import  Router  from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import SidebarLinks from "../../../components/SidebarLinks";
import TestCard from "../../../components/TestCard";

export default function manage ({tests}){
  const [testSet, setTestSet] = useState(tests);
	
  return (
    <div className="flex flex-row-reverse h-full w-full flex-wrap justify-start items-start">
        <div className="flex flex-col-reverse h-full  w-32">
        <div className="fixed bottom-14 right-14 overflow-visible z-50 duration-300 ">
                    <Fab color="primary" aria-label="add">
                        <AddCircleOutline />
                    </Fab>
            </div>
        </div>
        {testSet.map(test => {
          return (
              <TestCard key={test.id} test={test} testSet={testSet} setTestSet={setTestSet} /> 
            )
        })}
        
    </div>
  )
}

export async function getServerSideProps(context){
  const response = await fetch('http://127.0.0.1:8001/api/v1/tests/');
  const tests = await response.json();
  return {
      props: {
          tests: tests
      }
  }
}