"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
    const scrolled = useScrollTop();

    const [ user, setUser ] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const result = await signInWithPopup(auth, googleAuth);
    };
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">        
            </div>
            {!user && (
                <div role="button" onClick={ login }>
                    Login
                </div>
            )}
            {user && (
                <>
                    <div className="mr-7" role="button" onClick={ ()=>auth.signOut() }>
                        SignOut
                    </div>
                    <div className="rounded-md bg-secondary p-1"> 
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL ? user.photoURL : "/reading.png"} />
                        </Avatar>
                    </div>
                </>
            )}
        </div>
    )
}