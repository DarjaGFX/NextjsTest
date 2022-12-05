import Link from "next/link";

const Tests = ({data}) => {
    console.log(data);
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

export default Tests;

export async function getServerSideProps(context){
    const response = await fetch('http://127.0.0.1:8001/api/v1/tests/');
    const data = await response.json();
    return {
        props: {
            data: data
        }
    }
}