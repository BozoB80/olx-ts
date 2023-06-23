'use client'

import { FormEvent, useCallback, useState } from "react"
import { ChevronRightIcon, FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { auth, db } from "@/firebase/firebase"
import Link from "next/link"
import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"
import useLoginModal from "@/hooks/useLoginModal"
import usePublishModal from "@/hooks/usePublishModal"
import Button from "../Button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import queryString from "query-string"
import { useRouter, useSearchParams } from "next/navigation"

type SearchProps = {
  id: string
  title: string
  description: string
}


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState<SearchProps[]>([])
  const [allAdds] = useCollection(collection(db, "/products"), {snapshotListenOptions: { includeMetadataChanges: true }})
  const loginModal = useLoginModal()
  const publishModal = usePublishModal()
  const params = useSearchParams();
  const router = useRouter()

  const publishAd = () => {
    auth.currentUser ? publishModal.onOpen() : loginModal.onOpen()
  }

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuery,
        q: searchTerm
      };

      const url = queryString.stringifyUrl({
        url: '/search',
        query: updatedQuery,
      }, { skipNull: true });

      router.push(url)
      setSearchData([])
      },
    [searchTerm, params, router],
  )
  

  const handleSearchChange = (e: any) => {
    const term = e.target.value
    setSearchTerm(term) 
    
    const filteredAdds = allAdds?.docs.filter((add) => {
      const {title, description} = add.data()

      return (
        `${title} ${description}`.toLowerCase().includes(term.toLowerCase())
      )
    })
    setSearchData(filteredAdds as any)
  }



  return (
    <div className='relative flex justify-between items-center w-full sm:gap-5 sm:mt-5'>
      <form
        onSubmit={onSubmit}
        className="flex justify-center bg-gray-100 sm:bg-white items-center border-2 border-gray-200 w-full p-3 rounded-md shadow-md"
      >
        <div className="mr-3">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search'
          className="w-full outline-none focus:outline-none bg-gray-100 sm:bg-white"
        />
        {searchTerm && <button><XMarkIcon onClick={() => {setSearchData([]), setSearchTerm('')}} className="h-6 w-6" /></button>}

        {searchData && searchData.length > 0 ? (
          <motion.div
            variants={slideIn({ direction: 'down', type: 'tween', delay: 0, duration: 0.5 })}
            initial="hidden"
            whileInView="show"
            className="absolute w-full top-14 left-0 bg-slate-50 shadow-xl z-[9] p-3"
          >
            <p className="font-bold text-sm">Suggested categories:</p>
            {searchData && searchData.map((item: any) => {              
              const { category, title } = item.data()
              
              return (
                <Link href={`/ad/${item.id}`} onClick={() => {setSearchData([]), setSearchTerm('')}} key={item.id}>
                  <Breadcrumb _hover={{ backgroundColor: 'black', color: 'white' }} spacing='8px' px={2} py={1.5} separator={<ChevronRightIcon className="w-3 h-3" />}>
                    <BreadcrumbItem>
                      <BreadcrumbLink fontWeight="medium">{searchTerm}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <BreadcrumbLink>{category}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink>{title}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Link>      
              )
            })}
          </motion.div>
        ) : null}        
      </form> 

      <Button 
        label="Create Ad"
        dark
        icon={<FolderPlusIcon className="h-6 w-6" />}
        onClick={publishAd}
        className="w-60 hidden sm:flex rounded-md shadow-md"
      />
    </div>
  )
}

export default SearchBar
