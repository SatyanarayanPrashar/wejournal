"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";


const DocumentIdPage = () => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), [])
   
    const onChange = (content: string)=>{

    };

    if(document === undefined){
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>)
    }
    if(document === null) {
        return (<div>Not Found</div>)
    }
    return (
        <div className="pb-40">
            {/* <Cover url={document.coverImage} /> */}
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            {/* <div className="md:max-w-3xl lg:max-w-4xl"> */}
                <Toolbar initialData={document} />
                <Editor
                    onChange={ onChange }
                    initialContent=""
                />
            </div>
        </div>
    );
}
 
export default DocumentIdPage;