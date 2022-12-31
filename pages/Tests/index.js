import useSWR from "swr";
import Link from "next/link";


const fetcher = async () => {
    const response = await fetch('http://localhost:8001/api/v1/tests/');
    const data = await response.json();
    return data;
}


export default function Test(){
    const {data , error} = useSWR('tests', fetcher);
    if (error) return <h1>Something went wrong!</h1> 
    if (!data) return <h1>Something went wrong!</h1>
    return (
        <>
            <div className="flex flex-row-reverse pt-20 pr-10">
                {
                    data.map(d => {
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
