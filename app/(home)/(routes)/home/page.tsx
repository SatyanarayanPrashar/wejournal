"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import { SetStateAction, useState } from "react";
import { Cover } from "@/components/cover";
import Editor from "@/components/editor";

const HomePage = () => {
    const [ user ] = useAuthState(auth);
    const [ isMember ] = useState(true);

    const router = useRouter();
    const [ journalCode, setJournalCode ] = useState('');

    const onCreate = () => {
        
    };
    const onJoin = () => {
        
    }
    const handleJournalCodeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setJournalCode(event.target.value);
    };

    return (
        <>
            {!isMember && (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Image 
                    src="/empty.png"
                    height="300"
                    width="300"
                    alt="empty"
                    className="dark:hidden"
                />
                <Image 
                    src="/empty-dark.png"
                    height="300"
                    width="300"
                    alt="empty"
                    className="hidden dark:block"
                />
                <h2 className="text-lg font-medium">
                    Welcome {user?.displayName}
                </h2>
                <Button onClick={onCreate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create your WeJournal
                </Button>
                <div className="flex items-center mt-4">
                    <input
                        type="text"
                        placeholder="Enter WeJournal code to join"
                        value={journalCode}
                        onChange={handleJournalCodeChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                    />
                    <Button
                        onClick={onJoin}
                    >
                        Join
                    </Button>
                </div>
            </div>
            )}
            {isMember && (
                <>
                    <Cover url="/temp.jpg"/>
                    <div className="m-20">
                        <h1 className="text-5xl font-bold h-14 grid text-gray">
                            Yaha pe title of Journal
                        </h1>
                        <h1 className="text-xl h-14 grid text-gray">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ducimus, odio eius quidem sed fugit nam culpa fuga enim, omnis voluptatibus optio eos repudiandae dolor impedit quis facere esse, veniam quibusdam ex. Illo nisi esse modi inventore odio magnam id enim neque, temporibus perferendis beatae molestias veniam iure in illum sed voluptates ut? Esse vero quod itaque pariatur, doloremque tempora vel expedita voluptatem veniam rem, distinctio accusamus consectetur magnam. Ducimus.
                        </h1>
                    </div>
               </> 
            )}
        </>
    )
}

export default HomePage;