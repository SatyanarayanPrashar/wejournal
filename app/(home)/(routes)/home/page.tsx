"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { useAuthState } from "react-firebase-hooks/auth";
import useJournalInfo from "@/hooks/active-journal-info";
import { auth } from "@/providers/auth-provider";
import { SetStateAction, useMemo, useState } from "react";
import { Cover } from "@/components/cover";
import { db } from "@/app/firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";


const HomePage = () => {
    const Editor = useMemo(() => dynamic(() => import("../../_components/editor"), { ssr: false }), [])

    const [user] = useAuthState(auth);
    const [journalCode, setJournalCode] = useState('');
    const { journalInfo, isMember, isLoading } = useJournalInfo();
    
    function generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }
    
    const onCreate = async () => {
        const code = generateCode();
        const journalCollectionRef = collection(db, "journals");
        const journalDocRef = doc(journalCollectionRef, code);
        await setDoc(journalDocRef, {
            uid: code,
            mUser: user?.uid,
            sUser: "null",
            cover: "",
            about: ""
        });
    
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user?.uid);
        await setDoc(userDocRef, {
            journalId: code,
            userid: user?.uid,
        });
        window.location.reload();
    };

    const setJoincode = (event: { target: { value: SetStateAction<string>; }; }) => {
        setJournalCode(event.target.value);
    }
    
    const onJoin = async () => {
        const code = journalCode;
        const journalCollectionRef = collection(db, "journals");
        const journalDocRef = doc(journalCollectionRef, code);
        await updateDoc(journalDocRef, {
            sUser: user?.uid,
        });
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user?.uid);
        await setDoc(userDocRef, {
            journalId: code,
            userid: user?.uid,
        });
        window.location.reload();
    }

    const handleJournalCodeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setJournalCode(event.target.value);
    };

    if(isLoading) {
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
            </div>
        )
    }

    if(!user) {
        return redirect("/");
    }

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
                <Button onClick={ () => {onCreate();} }>
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
                    <Cover url={journalInfo?.cover != "" ? journalInfo?.cover : "/temp.jpg"}/>
                    <div className="md:max-w-3xl lg:max-w-4xl m-10">
                        {/* <Toolbar /> */}
                        <Editor
                            initialContent={journalInfo?.about}
                            journalUid= {journalInfo?.uid}
                        />
                    </div>
               </>
            )}
        </>
    )
}

export default HomePage;