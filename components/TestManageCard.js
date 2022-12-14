import { Button } from "@mui/material"
import  Router  from "next/router";
import { toast } from "react-hot-toast";
import * as api from '../api/apiTests';
import { useAuth } from "../hooks/use-auth";


const TestCard = ({test, testSet, setTestSet}) => {
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
    <div className="flex flex-col items-center justify-center h-72 w-64  mt-20 mr-20 p-3 rounded-xl bg-sky-200">
        <div className="flex w-full h-full justify-center items-center bg-gray-200 rounded-lg">
            <h1 className="text-8xl">{test.name}</h1>
        </div>
        <div className="w-full py-2 flex flex-col justify-between items-center">
            <h3 className="pb-2">{test.display_name}</h3>
			<Button className="w-full bg-sky-600 rounded-lg" variant="contained" onClick={()=>edit(test)}>  ویرایش </Button>
            <Button className="w-full bg-red-600 mt-1 rounded-lg" variant="contained" color="error" onClick={()=>removeTest(test)}> حذف آزمون </Button>
        </div>
    </div>
  )
}

export default TestCard