import { create } from "zustand";

interface VideoModalState {
  isOpen: boolean;
  videoKey: string | null;
  openModal: (key: string) => void;
  closeModal: () => void;
}

export const useVideoModalStore = create<VideoModalState>((set) => ({
  isOpen: false,
  videoKey: null,
  openModal: (key: string) => set({ isOpen: true, videoKey: key }),
  closeModal: () => set({ isOpen: false, videoKey: null }),
}));
