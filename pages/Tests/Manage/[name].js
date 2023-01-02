import * as TestApi from '../../../api/apiTests';
import Sidebar from "../../../components/Sidebar";
import ManageTest from "../../../components/ManageTest";
import { useEffect, useState } from 'react';


export default function TestName ({test}){

    return (
        <div className="flex flex-row-reverse h-full w-full">
            <Sidebar>
                <div className="border-b-4 rounded-b-lg  w-full flex justify-center items-center h-20">
                    <p> ویرایش {test.display_name} </p>
                </div>
            </Sidebar>
            <ManageTest key={test.id} test={test}/>
        </div>
    )
}

export async function getStaticPaths(){
    const {data} = await TestApi.GetAllTests();
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
    const {data} = await TestApi.GetTestByNameID(params.name);
    return {
        props: {
            test: data
        }
    }
}