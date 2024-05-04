"use client"

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon  } from "lucide-react"
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

import { useMediaQuery } from "usehooks-ts";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Calender from "./calender";
import CoverBttn from "./coverbttn";

export const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [ isResetting, setIsResetting] = useState(false);
    const [ isCollapsed, setIsCollapsed] = useState(isMobile);

    const [ user ] = useAuthState(auth);

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

        if (newWidth < 310) newWidth = 310;
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
    
          sidebarRef.current.style.width = isMobile ? "100%" : "310px";
          navbarRef.current.style.setProperty(
            "width",
            isMobile ? "0" : "calc(100% - 310px)"
          );
          navbarRef.current.style.setProperty(
            "left",
            isMobile ? "100%" : "310px"
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
    
    return (
        <>
            <aside
                ref={sidebarRef}
                className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-70 flex-col z-[99999]"
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
                
                <CoverBttn />

                <div
                    onMouseDown={handleMouseDown }
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transtion cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                >
                </div>
                <Calender />
            </aside>
            <div 
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-30",
                    isMobile && "left-0 w-full"
                )}
            >
 
                        <nav className="bg-transparent px-3 py-2 w-full">
                            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-8 w-8 text-muted-foreground bg-white p-2 rounded-full border" />}
                        </nav>
                    
            </div>
        </>
    )
}