
export default function TestName ({test}){
    console.log(test);
    return (
        <>
            <div className="flex flex-row-reverse justify p-10 bg-cyan-100 h-full">
                <div key={test.id}>
                    <h1>{test.name}</h1>
                    <h2>{test.display_name}</h2>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths(){
    const response = await fetch('http://127.0.0.1:8001/api/v1/tests/');
    const data = await response.json();
    const paths = data.map( d => {
        return {
            params: {
                name: d.name
            }
        }
    });
    return {
        // paths: [{
        //         params: {
        //             name: 'EQ'
        //         }
        // }],
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context){
    const {params} = context;
    const response = await fetch(`http://127.0.0.1:8001/api/v1/tests/${params.name}`);
    const data = await response.json();
    return {
        props: {
            test: data
        }
    }
}