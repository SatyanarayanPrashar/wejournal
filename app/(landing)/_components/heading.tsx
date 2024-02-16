"use client";

import { Spinner } from "@/components/spinner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Connect Your Stories. Welcome to <span className="underline">WeJournal</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                WeJournal is your unified space for <br /> share experiences and Collective memories.
            </h3>
            
        </div>
    )
}
