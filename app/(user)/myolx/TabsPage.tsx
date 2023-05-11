'use client'

import Container from "@/components/Container";
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SavedAds from "./SavedAds";

const TabsPage = () => {
  
  return (
    <Container>
      <Tabs variant="unstyled">
        <TabList color="gray.500">
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }}>Listings</Tab>
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }}>Users</Tab>
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }}>Searches</Tab>
        </TabList>
        <TabIndicator 
          mt="0"
          height="2px"
          bg="blackAlpha.900"
        />

        <TabPanels>
          <TabPanel>
            <SavedAds />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default TabsPage;