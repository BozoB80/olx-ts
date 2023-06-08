'use client'

import usePhoneModal from "@/hooks/usePhoneModal";
import Modal from "./Modal";

const PhoneModal = () => {
  const phoneModal = usePhoneModal()  

  const bodyContent = (
    <div>
      <p>{phoneModal.phoneNumber ? phoneModal.phoneNumber : 'User did not add phone number'}</p>
    </div>
  )

  return (
    <Modal 
      isOpen={phoneModal.isOpen}
      title="Phone Number"
      actionLabel=""
      onClose={phoneModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      hideButton
    />
  );
}

export default PhoneModal;