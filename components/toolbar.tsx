"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { ImageIcon, Smile, X } from "lucide-react"
import { Button } from "@/components/ui/button";
import useJournalInfo from "@/hooks/active-journal-info";
import { db } from "@/app/firebase/config";
import { doc, collection, updateDoc } from "firebase/firestore";

export const Toolbar = () => {
    const coverImage = useCoverImage();
    const { journalInfo } = useJournalInfo();

    const onRemove = async () => {
        try {
            const journalDocRef = doc(collection(db, "journals"), journalInfo?.uid);
            await updateDoc(journalDocRef, { cover: "" });
            console.log("ho gya hoga")
        } catch (error) {
            console.error("Error updating document:", error);
        }
        window.location.reload();
    };

    return (
        <div className="pl-[54px] group relative">
            <div className="opacity-100 g-10 group-hover:opacity-100 flex items-center">
                <Button
                    onClick={ coverImage.onOpen }
                    className="text-muted-foreground text-xs mr-[10px]"
                    variant="outline"
                    size="sm"
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {journalInfo?.cover ? "Change Cover" : "Add Cover"}
                </Button>
                {journalInfo?.cover && (
                    <Button
                        onClick={ onRemove }
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                )}
            </div>
        </div>
    )
}