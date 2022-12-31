import * as api from '../../api/apiTests';


export default function TestName ({test}){
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
    const {data} = await api.GetAllTests();
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
    const {data} = await api.GetTestByNameID(params.name);
    return {
        props: {
            test: data
        }
    }
}