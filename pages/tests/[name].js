
export default function TestName ({test}){
    return (
        <>
            <h1>{test.display_name}</h1>
            <h2>{test.display_name}</h2>
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