import useSWR from "swr";
import Link from "next/link";
import  Router  from "next/router";


const fetcher = async () => {
    const response = await fetch('http://192.168.1.55:8001/api/v1/tests/');
    const data = await response.json();
    return data;
}


export default function Test(){
    const {data , error} = useSWR('tests', fetcher);
    if (error) return <h1>Something went wrong!</h1> 
    if (!data) return <h1>Something went wrong!</h1>
    return (
        <>
            {
                data.map(d => {
                    return (
                        <div key={d.name}>
                            <Link href={`/tests/${d.name}`}>
                                <p>{d.display_name}</p>
                            </Link>
                        </div>
                    )
                })
            }
            {/* <Link href={'/tests/EQ'}>آزمون هوش هیجانی</Link> */}
        </>
    )
}


// export async function getServerSideProps(context){
//     const response = await fetch('http://192.168.1.55:8001/api/v1/tests/');
//     const data = await response.json();
//     return {
//         props: {
//             data: data
//         }
//     }
// }