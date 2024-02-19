import { create } from "zustand";

type CoverImageStore = {
    url?: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void 
};

export const useCoverImage = create<CoverImageStore>((set: (arg0: { isOpen: boolean; url?: string | undefined; }) => any) => ({
    url: undefined,
    isOpen: false,
    journalUid: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, url: undefined }),
    onReplace: (url: string) => set({ isOpen: true, url})
}));