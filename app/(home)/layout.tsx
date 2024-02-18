"use client"

import { redirect } from "next/dist/client/components/navigation";
import { Navigation } from "./_components/navigation";

import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            if (user) {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!user) {
        return redirect("/");
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
 
export default MainLayout;