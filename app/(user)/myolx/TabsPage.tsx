'use client'

import Container from "@/components/Container";
import { Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const TabsPage = () => {
  const router = useRouter()
  const [fit] = useMediaQuery("(max-width: 768px)")
  
  return (
    <Container>
      <Tabs  isFitted={fit} variant="unstyled">
        <TabList color="gray.500" >
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }} onClick={() => router.push('/myolx/saved/ads')} name="savedAds">Listings</Tab>
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }} onClick={() => router.push('/myolx/saved/users')} name="savedUsers">Users</Tab>
          <Tab _selected={{ color: 'black', fontWeight: 'medium' }} onClick={() => router.push('/myolx/saved/searches')} name="savedSearches">Searches</Tab>
        </TabList>
        <TabIndicator mt="0" height="2px" bg="blackAlpha.900" />
      </Tabs>
    </Container>
  );
}

export default TabsPage;