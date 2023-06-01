'use client'

import { useRef } from "react";
import useOptionsModal from "@/hooks/useOptionsModal";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "../Button";
import { Button as ButtonAlert, useToast } from "@chakra-ui/react";
import { EyeSlashIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const OptionsModal = () => {
  const router = useRouter()
  const optionsModal = useOptionsModal()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);
  const leastDestructiveRef = useRef<HTMLButtonElement>(null);

  const handleEdit = () => {
    router.push(`/ad/edit/${optionsModal.id}`)
    optionsModal.onClose()
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', optionsModal.id))
      onClose()
      optionsModal.onClose()
      router.push('/')
      toast({ position: 'top', status: 'success', title: 'Ad deleted'})
      console.log('successful');
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const bodyContent = (
    <>
      <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4">
        <Button label="Edit ad" icon={<PencilSquareIcon className="w-5 h-5" />} onClick={handleEdit} />
        <Button label="Hide ad" icon={<EyeSlashIcon className='w-6 h-6' />} />
        <Button label="Finish ad" icon={<BoltIcon className='w-6 h-6' />} />
        <Button label="Delete ad" icon={<TrashIcon className='w-6 h-6' />} onClick={onOpen} className="bg-red-500 text-white" />
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Ad
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonAlert ref={cancelRef} onClick={onClose}>
                Cancel
              </ButtonAlert>
              <ButtonAlert colorScheme='red' variant='outline' onClick={handleDelete} ml={3}>
                Delete
              </ButtonAlert>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )

  return (
    <Modal 
      isOpen={optionsModal.isOpen}
      title="What would you like to do with this ad?"
      actionLabel="Select your option"
      onClose={optionsModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      hideButton
    />
  );
}

export default OptionsModal;