'use client'

import Container from "@/components/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

const MyTabs = () => {
  const [searchTerm, setSearchTerm] = useState('')
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
                <p>one!</p>
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
        <div>
          Messages
        </div>
      </div>
    </Container>
  );
}

export default MyTabs;