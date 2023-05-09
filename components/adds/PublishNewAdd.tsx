'use client'

import { XMarkIcon } from "@heroicons/react/24/outline"
import Image, { StaticImageData } from "next/image"
import ostalo from '@/assets/ostalo.svg'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { slideAnimation } from "@/utils/motion"
import useFetchCollection from "@/firebase/useFetchCollection"
import Heading from "../Heading"

interface PublishProps {
  setPublish: (publish: boolean) => void
}

type CategoryProps = {
  id: string
  name: string
  bgColor?: string
  imageURL?: string | StaticImageData 
}

const PublishNewAdd: React.FC<PublishProps> = ({ setPublish }) => {
  const { data } = useFetchCollection('categories', 'asc')
  const [toggle, setToggle] = useState(false)
  const router = useRouter()  

  const onClose = () => {
    setTimeout(() => {
      setPublish(false)
    }, 200)
  }
  return (
    <>
        <div className="hidden sm:block absolute -top-20 -left-5 right-0 bottom-0 z-40 w-screen h-screen bg-slate-400/50">
          <motion.div {...slideAnimation({ direction: 'up'})}  className="absolute inset-1/3 w-[550px] h-[550px] bg-white rounded-md">
            <div className="flex flex-col w-full justify-center items-center p-3">
              <div className="flex w-full justify-between items-center">
                <Heading title="Publish add" />
                <button type="button" onClick={onClose}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 mt-5 gap-5 w-full pb-8 border-b">
                {data.slice(1, 5).map((category: CategoryProps) => {
                  
                  const handlePublish = () => {
                    setPublish(false)
                    router.push(`/publish/${category.name}`)
                  }
                  return (
                  <div onClick={handlePublish} key={category.id} className="flex w-full justify-items-start items-center cursor-pointer">
                    <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-16 h-16 rounded-full">
                      <Image 
                        src={category.imageURL ? category.imageURL : ''}
                        alt="imagecat"
                        width={50}
                        height={50}
                        className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                      />  
                    </div>
                    <h1 className="pl-5">{category.name}</h1>
                  </div>
                )})}
              </div>
              <div onClick={() => setToggle(true)} className="flex w-full justify-start items-center my-5">
                <div className="flex justify-center items-center border w-16 h-16 rounded-full">
                  <Image 
                    src={ostalo}
                    alt="ostalo"
                    width={40}
                    height={40}
                    className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                  />  
                </div>
                <button className="pl-5">Publish something else</button>

                {toggle && (
                  <div className="absolute inset-1 bg-[#f1f4f5] z-50 w-64 h-auto">
                    <ul>
                      {data.map((category: CategoryProps) => {
                        const handlePublish = () => {
                          setPublish(false)
                          router.push(`/publish/${category.name}`)
                        }
                        return (
                        <div key={category.id} onClick={handlePublish} className="cursor-pointer p-1 font-semibold">
                          <li>{category.name}</li>
                        </div>
                      )})}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-gray-100 w-full rounded-md mb-3">
                <div className="flex flex-col p-2">
                  <h1 className="text-xl font-semibold mb-3">Remaining number of ads</h1>
                  <div className="flex justify-between items-center">
                    <h1>Cars</h1>
                    <h1 className="font-semibold">0 of 3</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Real estates</h1>
                    <h1 className="font-semibold">0 of 2</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Other</h1>
                    <h1 className="font-semibold">1 of 85</h1>                    
                  </div>
                </div>                
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md">
                Become OLX pro
              </button>
            </div>
          </motion.div>
        </div>

        {/* Small Screen */}
        <motion.div {...slideAnimation({ direction: 'up' })} className="absolute top-0 left-0 right-0 bottom-0 sm:hidden z-50">
          <div className="bg-white w-full h-full">
            <div className="flex flex-col w-full justify-center items-center p-3">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-2xl my-5">Publish add</h1>
                <button type="button" onClick={() => setPublish(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 mt-5 gap-5 w-full pb-8 border-b">
                {data.slice(1, 5).map((category: CategoryProps) => {
                  const handlePublish = () => {
                    setPublish(false)
                    router.push(`/publish/${category.name}`)
                  }
                  return (
                  <div onClick={handlePublish} key={category.id} className="flex w-full justify-items-start items-center cursor-pointer">
                    <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-16 h-16 rounded-full shadow-xl">
                      <Image 
                        src={category.imageURL ? category.imageURL : ''}
                        alt="imagecat"
                        width={50}
                        height={50}
                        className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                      />  
                    </div>
                    <h1 className="pl-5">{category.name}</h1>
                  </div>
                )})}
              </div>
              <div onClick={() => setToggle(true)} className="flex w-full justify-start items-center my-5">
                <div className="flex justify-center items-center border w-16 h-16 rounded-full shadow-lg">
                  <Image 
                    src={ostalo}
                    alt="ostalo"
                    width={40}
                    height={40}
                    className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                  />  
                </div>
                <h1 className="pl-5">Publish something else</h1>

                {toggle && (
                  <div className="absolute inset-1 bg-[#f1f4f5] z-50 w-3/4 h-auto">
                    <ul>
                      {data.map((category: CategoryProps) => {
                        const handlePublish = () => {
                          setPublish(false)
                          router.push(`/publish/${category.name}`)
                        }
                        return (
                        <div key={category.id} onClick={handlePublish} className="cursor-pointer p-1 font-semibold">
                          <li>{category.name}</li>
                        </div>
                      )})}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-gray-100 w-full rounded-md mb-3">
                <div className="flex flex-col p-2">
                  <h1 className="text-xl font-semibold mb-3">Remaining number of ads</h1>
                  <div className="flex justify-between items-center">
                    <h1>Cars</h1>
                    <h1 className="font-semibold">0 of 3</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Real estates</h1>
                    <h1 className="font-semibold">0 of 2</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Other</h1>
                    <h1 className="font-semibold">1 of 85</h1>                    
                  </div>
                </div>                
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md">
                Become OLX pro
              </button>
            </div>
          </div>         
        </motion.div>
      </>
  );
}

export default PublishNewAdd;