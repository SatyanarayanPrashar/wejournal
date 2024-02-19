"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

interface ModalProps {
    journalUid?: string;
}

export const ModalProvider = ( {journalUid }: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
        <SettingsModal />
        <CoverImageModal journalUid={journalUid} />
        </>
    );
};