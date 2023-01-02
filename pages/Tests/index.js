import useSWR from "swr";
import Link from "next/link";
import * as TestApi from '../../api/apiTests';


const fetcher = async () => {
    const {data} = await TestApi.GetAllTests();
    return data;
}


export default function Test(){
    const {data , error} = useSWR('tests', fetcher);

    
    return (
        <>
            <div className="flex flex-row-reverse pt-20 pr-10">
                {
                    data?.map(d => {
                        return (
                            <div key={d.name} className=" p-4 border-2  rounded-full hover:bg-gray-200 ">
                                <Link href={`/Tests/${d.name}`}>
                                    <p>{d.display_name}</p>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
