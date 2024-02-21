"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/toolbar";

interface ImgJournalProps {
    url?: string;
    preview?: boolean;
}

export const ImgJournal = ({ url }: ImgJournalProps) => {
    return (
        <div className={cn(
            "relative w-[25vh] h-[25vh] group m-[20px]",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover rounded-lg"
                />
            )}
        </div>
    )
}

ImgJournal.Skeleton = function ImgJournalSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  )
}