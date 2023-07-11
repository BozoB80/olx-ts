'use client'

import { useEffect, useState } from "react"
import { Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UserIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { Bars3Icon as Bars3IconS, ChatBubbleLeftIcon as ChatSolid, HomeIcon as HomeSolid, UserIcon as UserSolid, PlusCircleIcon as PlusSolid } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  const [activeButton, setActiveButton] = useState('Home')
  const router = useRouter()
  const pathname = usePathname()
  const isPublishScreen = pathname.match('/publish')
  const isEditScreen = pathname.match('/edit')

  const currentUser = auth.currentUser

  const messageLink = () => {
    currentUser ? router.push('/messages') : loginModal.onOpen()
    setActiveButton('Messages')
  }

  const publishAdd = () => {
    currentUser ? publishModal.onOpen() : loginModal.onOpen()
    setActiveButton('Publish')
  }
  
  const profileLink = () => {
    currentUser ? router.push(`/profile/${currentUser.uid}`) : loginModal.onOpen()
    setActiveButton('Profile')
  }

  const isLoggedIn = () => {
    currentUser ? setToggleMenu(true) : loginModal.onOpen()
    setActiveButton('MyOlx')
  }


  const handleScroll = debounce({
    func: () => {
      const currentScrollPos = window.scrollY;
  
      setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
  
      setPrevScrollPos(currentScrollPos);
    },
    wait: 50,
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
    <>
      {!isPublishScreen && !isEditScreen && (
        <section className="flex sm:hidden">
          <motion.div 
            variants={slideIn({ direction: 'up', type: 'tween', delay: 0.1, duration: 0.3 })}
            initial="hidden"
            whileInView="show"
            className={`flex fixed ${visible ? 'bottom-0 z-50' : '-bottom-96 -z-50'} bg-white shadow-black shadow-2xl w-full justify-around items-center py-2`}
          >
            <Link href="/" onClick={() => setActiveButton('Home')} className="flex flex-col justify-center items-center">
              {activeButton === 'Home' ? <HomeSolid className="w-5 h-5 transition-all duration-300" /> : <HomeIcon className="w-5 h-5 transition-all duration-300" />}
              <p className="text-xs">Home</p>
            </Link>
            <div onClick={messageLink} className="flex flex-col justify-center items-center">
              {activeButton === 'Messages' ? <ChatSolid className="w-5 h-5" /> : <ChatBubbleLeftIcon className="w-5 h-5" />}
              <p className="text-xs">Messages</p>
            </div>
            <div onClick={publishAdd} className="flex flex-col justify-center items-center">
              {activeButton === 'Publish' ? <PlusSolid className="w-5 h-5" /> : <PlusCircleIcon className="w-5 h-5" />}
              <p className="text-xs">Publish</p>
            </div>
            <div onClick={profileLink} className="flex flex-col justify-center items-center">
              {activeButton === 'Profile' ? <UserSolid className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              <p className="text-xs">Profile</p>
            </div>
            <div onClick={isLoggedIn} className="flex flex-col justify-center items-center">
              {activeButton === 'MyOlx' ? <Bars3IconS className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
              <p className="text-xs">My OLX</p>
            </div>
          </motion.div>

          {toggleMenu && (
            <motion.div 
              variants={slideIn({ direction: 'right', type: 'tween', delay: 0.2, duration: 0.5 })}
              initial="hidden"
              whileInView="show"
              className="fixed top-0 bottom-0 w-full h-auto bg-white p-3 z-50 overflow-y-auto"
            >
              <MenuItemList logoutUser={logoutUser} setToggleMenu={setToggleMenu} />                  
            </motion.div>
          )}
        </section>
      )}
    </>
  )
}

export default FooterNav