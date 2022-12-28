import Link from "next/link";

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
            {/* <Link href={'/tests/EQ'}>آزمون هوش هیجانی</Link> */}
        </>
    )
}

export default Tests;

export async function getServerSideProps(context){
    const response = await fetch('http://192.168.1.55:8001/api/v1/tests/');
    const data = await response.json();
    return {
        props: {
            data: data
        }
    }
}