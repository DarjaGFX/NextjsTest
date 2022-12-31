import Link from "next/link";
import * as api from '../../api/apiTests';


const Tests = ({data}) => {
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

export default Tests;

export async function getServerSideProps(){
    const {data} = await api.GetAllTests();
    return {
        props: {
            data: data
        }
    }
}