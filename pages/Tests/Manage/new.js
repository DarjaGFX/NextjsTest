import * as TestApi from '../../../api/apiTests';
import Sidebar from "../../../components/Sidebar";
import ManageTest from "../../../components/ManageTest";


export default function New (){
    const test = {
        id: "0"+(new Date()).valueOf(),
        name: "",
        display_name: ""
    };
    return (
        <div className="flex flex-row-reverse h-full w-full">
            <Sidebar>
                <div className="border-b-4 rounded-b-lg  w-full flex justify-center items-center h-20">
                    <p> ایجاد آزمون جدید </p>
                </div>
            </Sidebar>
            <ManageTest key={test.id} test={test}/>
        </div>
    )
}
