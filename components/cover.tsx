"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { db } from "@/app/firebase/config";
import { doc, collection, updateDoc } from "firebase/firestore";
import { useCoverImage } from "@/hooks/use-cover-image";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
    journalUid?: string;
}

export const Cover = ({ url, preview, journalUid }: CoverImageProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImg = useCoverImage();

    const onRemove = async () => {
        try {
            const journalDocRef = doc(collection(db, "journals"), journalUid);
            await updateDoc(journalDocRef, { cover: "" });
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const onUpdate = async (uid: string | undefined, newContent: string) => {
        try {
            const journalDocRef = doc(collection(db, "journals"), journalUid);
            await updateDoc(journalDocRef, { cover: "" });
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
        {!!url && (
            <Image
                src={url}
                fill
                alt="Cover"
                className="object-cover"
            />
        )}
        {url && !preview && (
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                <Button
                    onClick={ () => {
                        console.log("click toh kiye bhai");
                        coverImg.onReplace;
                        console.log("open par ho gya");
                    }}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Change cover
                </Button>
                <Button
                    onClick={onRemove}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                </Button>
            </div>
        )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  )
}