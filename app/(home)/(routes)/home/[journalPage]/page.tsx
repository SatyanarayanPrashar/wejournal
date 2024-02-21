"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import useCurrentOpenJournal from "@/hooks/current-journal-info";
import { Spinner } from "@/components/spinner";
import EditorJournal from "@/components/editorJournal";
import useJournalInfo from "@/hooks/active-journal-info";

export type SearchParamProps = {
    params: { journalPage: string }
    // searchParams: { [key: string]: string | string[] | undefined }
}

const JournalPage = ({params: {journalPage} }: SearchParamProps ) => {
    const [ user ] = useAuthState(auth);
    const { journalInfo } = useJournalInfo();

    console.log(journalPage);

    const { currentJournal, isLoading } = useCurrentOpenJournal(journalPage);

    if(isLoading) {
        return ( 
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        )
    }

    if(currentJournal) {
        return (
            <>
                <h2 className="font-bold text-4xl ml-20 mt-20">
                    {currentJournal?.entrydate}
                </h2>
                <div className="flex gap-12  m-10">
                     <div className="flex-1">
                        <EditorJournal
                            initialContent={currentJournal?.content1}
                            journalUid={journalInfo?.uid}
                            dateString="20-02-2024"
                            userRole="content1"
                            />
                    </div>
                    <div className="flex-1">
                        <EditorJournal
                            initialContent={currentJournal?.content2}
                            journalUid={journalInfo?.uid}
                            dateString="20-02-2024"
                            userRole="content2"
                        />
                    </div>
                </div>    
            </>
        );
    } else {
        return (
            <div>
                No data found
            </div>
        )
    }
}

export default JournalPage;
