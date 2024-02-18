"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import { SetStateAction, useEffect, useState } from "react";
import { Cover } from "@/components/cover";
import { db } from "@/app/firebase/config";
import { collection, addDoc, doc, setDoc, getDoc, getFirestore, DocumentData } from "firebase/firestore";
import { Spinner } from "@/components/spinner";

const HomePage = () => {
    const [user] = useAuthState(auth);
    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [journalCode, setJournalCode] = useState('');
    const [journalInfo, setJournalInfo] = useState<null | DocumentData>(null);
    const router = useRouter();

    useEffect(() => {
        const checkMembership = async () => {
            try {
                const db = getFirestore();
                const userDocRef = doc(collection(db, 'users'), user?.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    if (userData && userData.journalId) {
                        setIsMember(true);
                        // Fetch journal info if user is a member
                        await fetchJournalInfo(userData.journalId);
                    }
                }
            } catch (error) {
                console.error('Error checking membership:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            checkMembership();
        }
    }, [user]);

    const fetchJournalInfo = async (journalId: string) => {
        try {
            const db = getFirestore();
            const journalDocRef = doc(collection(db, 'journals'), journalId);
            const journalDocSnapshot = await getDoc(journalDocRef);

            if (journalDocSnapshot.exists()) {
                const journalData = journalDocSnapshot.data();
                setJournalInfo(journalData);
            }
        } catch (error) {
            console.error('Error fetching journal info:', error);
        }
    };
    
    function generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // You can customize this if you want to include digits or special characters
        let code = '';
        for (let i = 0; i < 4; i++) {
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
            userid1: user?.uid,
            userid2: "",
            title: `${user?.displayName}'s WeJournal`,
            cover: "",
            about: "Write about your Journal here."
        });
    
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user?.uid);
        await setDoc(userDocRef, {
            journalId: code,
            userid: user?.uid,
        });
        window.location.reload();
    };
    

    const onJoin = () => {
        
    }
    const handleJournalCodeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setJournalCode(event.target.value);
    };

    if(isLoading) {
        return ( 
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg"/>
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
                <Button onClick={
                    () => {
                        console.log("step1");
                        onCreate();
                        console.log("step4");
                    }
                }>
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
                    <div className="m-20">
                        <h1 className="text-5xl font-bold h-14 grid text-gray">
                            {journalInfo?.title}
                        </h1>
                        <h1 className="text-xl h-14 grid text-gray">
                        {journalInfo?.about}
                        </h1>
                    </div>
               </>
            )}
        </>
    )
}

export default HomePage;