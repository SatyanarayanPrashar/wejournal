"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseConfig } from "@/providers/auth-provider";
import { SetStateAction, useState } from "react";
import { Cover } from "@/components/cover";
import { createUser } from "@/app/firebase/firebase-user-crud";

interface JournalProps{
    title?: string;
    contentuser1?: string;
    contentuser2?: string;
}

const JournalPage = ({ title, contentuser1, contentuser2}: JournalProps) => {
    const [ user ] = useAuthState(auth);
    const [ isMember ] = useState(true);

    const router = useRouter();
    const [ journalCode, setJournalCode ] = useState('');

    const onCreate = () => {
        createUser
    };
    const onJoin = () => {
        
    }
    const handleJournalCodeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setJournalCode(event.target.value);
    };

    return (
        <>
            {isMember && (
                <>
                    <Cover url="/temp.jpg"/>
                    <div className="m-20">
                        <h1 className="text-5xl font-bold h-14 grid text-gray">
                            {title}
                        </h1>
                        <div className="flex gap-10">
                            <h1 className="text-xl h-14 grid text-gray">
                                contentuser1
                            </h1>
                            <h1 className="text-xl h-14 grid text-gray">
                                contentuser1
                            </h1>
                        </div>
                    </div>
               </>
            )}
        </>
    )
}

export default JournalPage;