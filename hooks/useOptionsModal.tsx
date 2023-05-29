import { create } from 'zustand';

interface OptionsModalStore {
  id: string | null
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useOptionsModal = create<OptionsModalStore>((set) => ({
  isOpen: false,
  id: null,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null })
}));

export default useOptionsModal;