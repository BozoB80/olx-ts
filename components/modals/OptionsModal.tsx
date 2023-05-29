'use client'

import useOptionsModal from "@/hooks/useOptionsModal";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "../Button";
import { EyeSlashIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

const OptionsModal = () => {
  const router = useRouter()
  const optionsModal = useOptionsModal()

  const handleEdit = () => {
    router.push(`/ad/edit/${optionsModal.id}`)
    optionsModal.onClose()
  }

  // () => router.push(`/ad/edit/${id}`)
  const bodyContent = (
    <div className="w-full grid grid-cols-2 gap-8">
      <Button label="Edit ad" icon={<PencilSquareIcon className="w-5 h-5" />} onClick={handleEdit} />
      <Button label="Hide ad" icon={<EyeSlashIcon className='w-6 h-6' />} />
      <Button label="Finish ad" icon={<BoltIcon className='w-6 h-6' />} />
      <Button label="Delete ad" icon={<TrashIcon className='w-6 h-6' />} dark />
    </div>
  )

  return (
    <Modal 
      isOpen={optionsModal.isOpen}
      title="What would you like to do with this ad?"
      actionLabel="Select your option"
      onClose={optionsModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
    />
  );
}

export default OptionsModal;