import { Button } from "@mui/material"

const TestCard = ({test}) => {
  return (
    <div className="flex flex-col items-center justify-center h-72 w-64  mt-20 mr-20 p-3 rounded-xl">
        <div className="flex w-full h-full justify-center items-center bg-slate-300 rounded-lg">
            <h1 className="text-8xl">{test.name}</h1>
        </div>
        <div className="w-full py-2 flex flex-col justify-between">
            <Button className="w-full rounded-lg" variant="filled" >  ویرایش </Button>
            <Button className="w-full mt-1 rounded-lg" variant="filled"> حذف آزمون </Button>
        </div>
    </div>
  )
}

export default TestCard