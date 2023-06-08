'use client'

import { useState } from "react"
import { ArrowRightIcon, FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { auth, db } from "@/firebase/firebase"
import Link from "next/link"
import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"
import useLoginModal from "@/hooks/useLoginModal"
import usePublishModal from "@/hooks/usePublishModal"

type SearchProps = {
  id: string
  title: string
  description: string
}


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState<SearchProps[]>([])
  const [allAdds] = useCollection(collection(db, "/products"),
  {snapshotListenOptions: { includeMetadataChanges: true }})
  const loginModal = useLoginModal()
  const publishModal = usePublishModal()

  const publishAd = () => {
    auth.currentUser ? publishModal.onOpen() : loginModal.onOpen()
  }

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
      <div
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
        {searchTerm ? <button><XMarkIcon onClick={() => setSearchTerm('')} className="h-6 w-6" /></button> : ''}

        {searchData && searchData.length !== 0 ? (
          <motion.div
            variants={slideIn({ direction: 'down', type: 'tween', delay: 0, duration: 0.5 })}
            initial="hidden"
            whileInView="show"
            className="absolute w-full top-14 left-0 bg-slate-50 shadow-xl z-[9] p-3"
          >
            {searchData && searchData.map((item: any) => {              
              const { category, title } = item.data()
              
              return (
                <Link href={`/ad/${item.id}`} onClick={() => {setSearchData([]), setSearchTerm('')}} key={item.id}>
                  <div className="w-full flex items-center py-3">
                    <h1>{category}</h1>
                    <p className="ml-3"><ArrowRightIcon className="w-4 h-4" /></p>
                    <h1 className="ml-3 truncate">{title}</h1>
                  </div>
                </Link>      
              )
            })}
          </motion.div>
        ) : null}
        
      </div> 
      
      <button 
        type="button"
        onClick={publishAd}
        className="hidden sm:flex justify-center items-center gap-2 h-14 w-60 bg-black text-white py-2.5 px-8 rounded-md"
      >
        <FolderPlusIcon className="h-6 w-6" />
        <h1>Create Listing</h1>
      </button>

    </div>
  )
}

export default SearchBar
