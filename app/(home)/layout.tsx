"use client"

import { redirect } from "next/dist/client/components/navigation";
import { Navigation } from "./_components/navigation";

import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ user ] = useAuthState(auth);

    if(!user) {
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