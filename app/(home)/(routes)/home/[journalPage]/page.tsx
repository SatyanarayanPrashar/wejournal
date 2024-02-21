"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import useCurrentOpenJournal from "@/hooks/current-journal-info";
import { Spinner } from "@/components/spinner";
import EditorJournal from "@/components/editorJournal";
import useJournalInfo from "@/hooks/active-journal-info";
import { ImgJournal } from "@/components/imgJournal";

export type SearchParamProps = {
    params: { journalPage: string }
}

const JournalPage = ({params: {journalPage} }: SearchParamProps ) => {
    const [ user ] = useAuthState(auth);
    const { journalInfo } = useJournalInfo();
    const { currentJournal, isLoading } = useCurrentOpenJournal(journalPage);

    if(isLoading) {
        return ( 
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        )
    }
    return (
        <>
            <h2 className="font-thin italic text-7xl ml-10 mt-10">
                {journalPage}
            </h2>
            <div className="flex flex-col md:flex-row gap-2 m-10 mt-2">
                <div className="flex-1">
                    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                        <EditorJournal
                            initialContent={currentJournal?.content1}
                            journalUid={journalInfo?.uid}
                            dateString={journalPage}
                            userRole="content1"
                        />
                    </div>
                </div>
                {journalInfo?.sUser && (
                    <div className="flex-1 mt-6 md:mt-0">
                        <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                            <EditorJournal
                                initialContent={currentJournal?.content2}
                                journalUid={journalInfo?.uid}
                                dateString={journalPage}
                                userRole="content2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default JournalPage;
