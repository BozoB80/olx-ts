import { create } from 'zustand';

interface OptionsModalStore {
  id: string
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useOptionsModal = create<OptionsModalStore>((set) => ({
  isOpen: false,
  id: '',
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: '' })
}));

export default useOptionsModal;