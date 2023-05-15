import { DocumentData } from "firebase/firestore";
import { create } from "zustand";

interface MessageModalStore {
  isOpen: boolean;
  id: string | null;
  details: DocumentData | null;
  onOpen: (id: string, details: DocumentData) => void;
  onClose: () => void;
}

const useMessageModal = create<MessageModalStore>((set) => ({
  isOpen: false,
  id: null,
  details: null,
  onOpen: (id, details) => set({ isOpen: true, id, details }),
  onClose: () => set({ isOpen: false, id: null, details: null }),
}));

export default useMessageModal;
