import { useState, useEffect } from 'react';
import { getFirestore, doc, collection, getDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";


type JournalInfo = {
    uid: string;
    title: string;
    about: string;
    cover: string;
    mUser: string;
    sUser: string;
};

const useJournalInfo = () => {
    const [journalInfo, setJournalInfo] = useState<JournalInfo | null>(null);
    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [user] = useAuthState(auth);

    useEffect(() => {
        console.log("trigger active journal hook");

        const fetchJournalInfo = async (journalId: string) => {
            try {
                const db = getFirestore();
                const journalDocRef = doc(collection(db, 'journals'), journalId);
                const journalDocSnapshot = await getDoc(journalDocRef);

                if (journalDocSnapshot.exists()) {
                    const journalData = journalDocSnapshot.data() as JournalInfo;
                    setJournalInfo(journalData);
                }
            } catch (error) {
                console.error('Error fetching journal info:', error);
            }
        };

        const checkMembership = async () => {
            try {
                const db = getFirestore();
                const userDocRef = doc(collection(db, 'users'), user?.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    if (userData && userData.journalId) {
                        setIsMember(true);
                        await fetchJournalInfo(userData.journalId);
                    }
                }
            } catch (error) {
                console.error('Error checking membership:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.uid) {
            checkMembership();
        }
    }, [user?.uid]);

    return { journalInfo, isMember, isLoading };
};

export default useJournalInfo;