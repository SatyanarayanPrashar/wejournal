"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/toolbar";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {

    return (
        <div className={cn(
            "relative w-auto h-[35vh] group m-[20px]",
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
        {url && !preview && (
            <div className="opacity-30 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                <Toolbar />
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