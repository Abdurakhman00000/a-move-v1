import { create } from "zustand"

interface SearchStore {
    isOpens: boolean;
    openModals: () => void;
    closeModals: () => void;
}

export const useSearchModalStore = create<SearchStore>((set) => ({
    isOpens: false,
    openModals: () => set({ isOpens: true }),
    closeModals: () => set({ isOpens: false }),
}))