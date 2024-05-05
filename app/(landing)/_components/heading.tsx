"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
        <div className="w-full h-[100vh]">
            <video 
                src="/headerVideo.mp4" 
                autoPlay loop muted
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <div className="absolute h-full w-full top-0 flex flex-col justify-center items-center text-[white] text-center">
                <div className="relative mx-auto grid h-32 w-96 place-content-center">
                    <motion.div
                    initial={{ opacity: 0, paddingTop: "20px" }}
                    whileInView={{ opacity: 1, paddingTop: "0px" }}
                    transition={{ ease: "linear", duration: 1 }}
                    viewport={{ margin: "-200px" }}
                    >
                        <div className="h-full w-full">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                                Connect Your Stories.
                            </h1>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                                Welcome to <span className="underline">WeJournal</span>
                            </h1>
                            <h3 className="text-base sm:text-xl md:text-2xl font-medium mt-[30px]">
                                WeJournal is your unified space for <br /> share experiences and Collective memories.
                            </h3>
                            {!user && (
                                <div role="button" className="mt-[30px]" onClick={ login }>
                                    Login
                                </div>
                            )}
                            {user && (
                                <>
                                <Button asChild className="bg-[#9d9d9d] opacity-80 text-[white] mt-[30px]">
                                    <Link href="/home">
                                        Enter WeJournal
                                        <ArrowRight className="h-4 w-4 ml-2"/>
                                    </Link>
                                </Button>
                                </>
                            )}
                        </div> 
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
