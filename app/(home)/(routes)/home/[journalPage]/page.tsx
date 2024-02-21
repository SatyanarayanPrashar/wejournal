"use client";

import useCurrentOpenJournal from "@/hooks/current-journal-info";
import EditorJournal from "@/components/editorJournal";
import useJournalInfo from "@/hooks/active-journal-info";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

export type SearchParamProps = {
    params: { journalPage: string }
}

const JournalPage = ({params: {journalPage} }: SearchParamProps ) => {
    const { journalInfo } = useJournalInfo();
    const { currentJournal, isLoading } = useCurrentOpenJournal(journalPage);

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
    } else{

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
}

export default JournalPage;
