"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  CircleStackIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { slideAnimation } from "@/utils/motion";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'

import Container from "../Container";
import MenuItemList from "./MenuItemList";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import SearchBar from "./SearchBar";


const Navbar = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const [ user ] = useAuthState(auth)

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("You are signed out");
        router.push("/");
        router.refresh()
        localStorage.clear();
        setToggleMenu(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <nav className="hidden sm:flex flex-col w-full z-10">
        <div className="flex">
          <div className="flex w-full">
            <Link href="/">
              <Image src={logo} alt="logo" width={70} height={70} />
            </Link>
            <div className="flex w-full justify-between mx-auto">
              <div className="flex justify-between items-center ml-5 text-sm font-semibold gap-5">
                <Link href="/">Shops</Link>
                <Link href="/">Marketing</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Create Listing</Link>
                <Link href="/" className="flex items-center">
                  Other
                  <ChevronDownIcon className="h-5 w-5" />
                </Link>
              </div>

              {!user ? (
                <div className="flex justify-center items-center">
                  <div className="flex font-medium">
                    <MenuItem label="Sign In" onClick={loginModal.onOpen} />
                    <div className="border border-gray-300 mx-2 my-full " />
                    <MenuItem label="Registration" onClick={registerModal.onOpen} />
                  </div>
                </div>
              ) : (
                <div className="relative flex">
                  <div className="flex justify-center items-center gap-3">
                    <Link href="/messages">
                      <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                    </Link>
                    <button
                      type="button"
                      className="flex pl-2 gap-2 border-l border-gray-400"
                    >
                      <CircleStackIcon className="h-6 w-6" />
                      <p className="px-1 rounded-sm bg-orange-300">56</p>
                    </button>
                    <div className="flex justify-center items-center pl-2 gap-3 border-l border-gray-400">
                      <Link
                        href={`/profile/${auth.currentUser && auth.currentUser.uid}`}
                        className="flex gap-3"
                      >
                        <UserCircleIcon className="h-10 w-10" />
                        <button type="button">{user && user?.displayName}</button>
                      </Link>
                      <button type="button" onClick={() => setToggleMenu(true)}>
                        <Bars3Icon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {toggleMenu && (
                    <motion.div
                      {...slideAnimation({ direction: "right" })}
                      className="absolute right-0 top-0 h-screen border-l bg-white p-3 z-50 w-[350px]"
                    >
                      <MenuItemList
                        logoutUser={logoutUser}
                        setToggleMenu={setToggleMenu}
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <SearchBar />
        </div>
      </nav>

      {/* Small navbar */}
      <nav className="flex sm:hidden justify-center items-center gap-4 p-3 w-full">
        <Link href="/">
          <Image src={logo} alt="logo" width={42} height={42} />
        </Link>
        <SearchBar />
      </nav>
    </Container>
  );
};

export default Navbar;
