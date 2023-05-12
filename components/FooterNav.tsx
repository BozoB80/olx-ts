'use client'

import { useEffect, useState } from "react"
import { Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PublishNewAdd from "./adds/PublishNewAdd"
import { debounce } from "@/utils/debounce"
import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"
import MenuItemList from "./navbar/MenuItemList"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import usePublishModal from '../hooks/usePublishModal';
import useLoginModal from '../hooks/useLoginModal';
import { useToast } from '@chakra-ui/react';

const FooterNav = () => {
  const publishModal = usePublishModal()
  const loginModal = useLoginModal()
  const toast = useToast()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  const [toggleMenu, setToggleMenu] = useState(false)
  const router = useRouter()

  const currentUser = auth.currentUser

  const publishAdd = () => {
    currentUser ? publishModal.onOpen() : loginModal.onOpen()
  }
  
  const isLoggedIn = () => {
    currentUser ? setToggleMenu(true) : loginModal.onOpen()
  }

  const profileLink = () => {
    currentUser ? router.push(`/profile/${currentUser.uid}`) : loginModal.onOpen()
  }
  

  const handleScroll = debounce({
    func: () => {
      const currentScrollPos = window.scrollY;
  
      setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
  
      setPrevScrollPos(currentScrollPos);
    },
    wait: 100,
    immediate: false,
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const logoutUser = () => {
    signOut(auth).then(() => {
        toast({ position: 'top', status: 'success', title: 'You are signed out'})
        router.push('/')
        localStorage.clear()
        setToggleMenu(false)
      }).catch((error) => {
        console.error(error);
      });
  }

  return (
    <section className="flex sm:hidden">
      <motion.div 
        variants={slideIn({ direction: 'down', type: 'tween', delay: 0.2, duration: 0.5 })}
        initial="hidden"
        whileInView="show"
        className={`flex fixed ${visible ? 'bottom-0 z-50' : '-bottom-96 -z-50'} bg-white shadow-black shadow-2xl w-full justify-around items-center py-2`}
      >
        <Link href="/" className="flex flex-col justify-center items-center">
          <HomeIcon className="w-5 h-5" />
          <p className="text-xs">Home</p>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <p className="text-xs">Messages</p>
        </div>
        <div onClick={publishAdd} className="flex flex-col justify-center items-center">
          <PlusCircleIcon className="w-5 h-5" />
          <p className="text-xs">Publish</p>
        </div>
        <div onClick={profileLink} className="flex flex-col justify-center items-center">
          <UserIcon className="w-5 h-5" />
          <p className="text-xs">Profile</p>
        </div>
        <div onClick={isLoggedIn} className="flex flex-col justify-center items-center">
          <Bars3Icon className="w-5 h-5" />
          <p className="text-xs">My OLX</p>
        </div>
      </motion.div>

      {toggleMenu && (
        <motion.div 
           variants={slideIn({ direction: 'down', type: 'tween', delay: 0.2, duration: 0.5 })}
           initial="hidden"
           whileInView="show"
           className="absolute right-0 top-0 max-h-fit border-l bg-white p-3 z-50 w-full"
         >
           <MenuItemList logoutUser={logoutUser} setToggleMenu={setToggleMenu} />                  
         </motion.div>
       )}
    </section>
  )
}

export default FooterNav