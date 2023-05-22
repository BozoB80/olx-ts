'use client'

import Container from "@/components/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import avatar from '@/assets/noavatar.png'
import Image from "next/image";
import MessageTab from "@/components/messages/MessageTab";

const MyTabs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConversationId, setSelectedConversationId] = useState('');
  const [ user ] = useAuthState(auth)
  const userId = user?.uid 
  
  const [ conversationData ] = useCollection(userId ? collection(db, 'users', userId, 'conversations') : null)      
  
  return (
    <Container bground>
      <div className="w-full flex bg-white">
        <div className="w-1/3 flex flex-col">
          <form className="relative w-full p-5">
            <input 
              type="text"
              value={searchTerm}
              onChange={() => {}}
              placeholder="Search messages"
              className="w-full flex justify-start items-center pl-10 bg-gray-100 p-2 rounded-md" 
            />
            <MagnifyingGlassIcon className="absolute top-7 left-7 w-6 h-6" />           
          </form>

          <Tabs defaultIndex={1} variant='line' isFitted>
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'black' }}>Inbox</Tab>
              <Tab _selected={{ color: 'white', bg: 'black' }}>Saved</Tab>
              <Tab _selected={{ color: 'white', bg: 'black' }}>Questions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  {conversationData?.docs?.map((conv) => {
                    const { title, createdAt, receiverName, senderName } = conv.data()
                    const date = createdAt.toDate().toLocaleDateString('en-GB')
                    return (
                      <div onClick={() => setSelectedConversationId(conv.id)} key={conv.id} className="flex items-center w-full border-b py-2 text-sm cursor-pointer">
                        <Image
                          src={avatar}
                          alt="avatar"
                          className="w-10"
                        />
                        <div className="w-full flex justify-between items-center">
                          <div className="pl-3">
                            <p className="text-[#7f9799]">{user?.displayName === senderName ? receiverName : senderName}</p>
                            <p>{title}</p>
                          </div>
                          <div>
                            <p>{date}</p>  
                          </div>
                        </div>
                      </div>
                  )})}
                </div>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        <div className="w-full bg-[#f1f4f5]">
          {selectedConversationId ? (
            <MessageTab id={selectedConversationId} />
          ) : (
            <p className="h-full flex justify-center items-center text-2xl font-light">Select a conversation to view messages.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default MyTabs;