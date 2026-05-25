import { create } from "zustand";

interface PropertyCreationStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export const usePropertyCreationModal = create<PropertyCreationStore>(
  (set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);
