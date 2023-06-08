import { create } from 'zustand';

interface PhoneModalStore {
  phoneNumber: string
  isOpen: boolean;
  onOpen: (phoneNumber: string) => void;
  onClose: () => void;
}

const usePhoneModal = create<PhoneModalStore>((set) => ({
  isOpen: false,
  phoneNumber: '',
  onOpen: (phoneNumber) => set({ isOpen: true, phoneNumber }),
  onClose: () => set({ isOpen: false, phoneNumber: '' })
}));

export default usePhoneModal;