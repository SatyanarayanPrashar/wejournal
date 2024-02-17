"use client"

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react"
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Calender from "./calender";

export const Navigation = () => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [ isResetting, setIsResetting] = useState(false);
    const [ isCollapsed, setIsCollapsed] = useState(isMobile);

    const [ user ] = useAuthState(auth);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const tileContent = ({ date }: { date: Date }) => {
        if (selectedDate && date.getDate() === selectedDate.getDate()) {
            return (
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {date.getDate()}
                    </div>
                </div>
            );
        }
        return null;
    };

    const onClickDay = (date: Date) => {
        console.log('Clicked date:', date);
        setSelectedDate(date);
    };

    useEffect (() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect (() => {
        if(isMobile){
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    
    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
          setIsCollapsed(false);
          setIsResetting(true);
    
          sidebarRef.current.style.width = isMobile ? "100%" : "240px";
          navbarRef.current.style.setProperty(
            "width",
            isMobile ? "0" : "calc(100% - 240px)"
          );
          navbarRef.current.style.setProperty(
            "left",
            isMobile ? "100%" : "240px"
          );
          setTimeout(() => setIsResetting(false), 300);
        }
      };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
          setIsCollapsed(true);
          setIsResetting(true);
    
          sidebarRef.current.style.width = "0";
          navbarRef.current.style.setProperty("width", "100%");
          navbarRef.current.style.setProperty("left", "0");
          setTimeout(() => setIsResetting(false), 300);
        }
      }
    
      const handleCreate = () => {
        
      };

    return (
        <>
            <aside
                ref={sidebarRef}
                className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]"
            >
                <div
                    role="button"
                    onClick={ collapse }
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                    <div className="flex items-center">
                        <div className="rounded-full m-4 flex overflow-hidden h-8 w-8">
                            <Avatar>
                                <AvatarImage src={user?.photoURL ? user.photoURL : "/reading.png"} />
                            </Avatar>
                        </div>
                        <div>{user?.displayName}</div>
                </div>
                <div className="react-calendar bg-white text-gray-800 rounded-lg shadow-md font-sans leading-tight">
                    <Calender />
                </div>
            </aside>
        </>
    )
}