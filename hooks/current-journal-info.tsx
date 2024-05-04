import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import useJournalInfo from "@/hooks/active-journal-info";
import { auth } from "@/providers/auth-provider";

type CurrentJournalInfo = {
    entrydate: string;
    cover: string;
    content1: string;
    content2: string;
};

const useCurrentOpenJournal = (dateString: string) => {
    const [user] = useAuthState(auth);
    const [currentJournal, setCurrentJournal] = useState<CurrentJournalInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { journalInfo } = useJournalInfo();

    useEffect(() => {
        console.log("trigger current journal hook");

        const fetchCurrentJournal = async () => {
            setIsLoading(true);
            try {
                const db = getFirestore();
                const journalCollectionRef = doc(db, "journals", journalInfo?.uid ? journalInfo?.uid : "unknown", "journal", dateString);
                const journalDocSnapshot = await getDoc(journalCollectionRef);
                
                if (journalDocSnapshot.exists()) {
                    const journalData = journalDocSnapshot.data() as CurrentJournalInfo;
                    setCurrentJournal(journalData);
                } else {
                    setCurrentJournal(null);
                }
            } catch (error) {
                console.error('Error fetching current open journal:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentJournal();
    }, [journalInfo?.uid, dateString, user?.uid]);

    return { currentJournal, isLoading };
};

export default useCurrentOpenJournal;