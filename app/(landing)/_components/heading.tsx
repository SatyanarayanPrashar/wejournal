"use client";

import { Spinner } from "@/components/spinner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Heading = () => {
    const [ user, setUser ] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const result = await signInWithPopup(auth, googleAuth);
    };
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Connect Your Stories. Welcome to <span className="underline">WeJournal</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                WeJournal is your unified space for <br /> share experiences and Collective memories.
            </h3>
            {!user && (
                <div role="button" onClick={ login }>
                    Login
                </div>
            )}
            {user && (
                <>
                <Button asChild>
                    <Link href="/home">
                        Enter WeJournal
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
                </>
            )}
        </div>
    )
}
