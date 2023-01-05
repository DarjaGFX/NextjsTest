import useSWR from "swr";
import Link from "next/link";
import * as TestApi from '../../api/apiTests';
import TestCard from "../../components/TestCard";


const fetcher = async () => {
    const {data} = await TestApi.GetAllTests();
    return data;
}


export default function Test(){
    const {data , error} = useSWR('tests', fetcher);
    
    return (
        <>
            <div className="flex flex-row-reverse pt-20 pr-10 justify-evenly">
                {
                    data?.map(d => {
                            return <TestCard key={d.id} test={d} />
                        }
                    )
                }
            </div>
        </>
    )
}
