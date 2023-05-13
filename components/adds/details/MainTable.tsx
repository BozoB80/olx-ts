'use client'

import { DocumentData } from "firebase/firestore";

type TableDetailsProps = {
  label: string
  value: string
}

type TableProps = {
  details: DocumentData
  table: TableDetailsProps[]
}

const MainTable = ({ details, table }: TableProps) => {
  return (
    <>
      <table className='hidden sm:flex w-full'>
        <tbody className='grid grid-cols-2 w-full text-sm capitalize gap-x-16'>
          {table.map((item) => (
            <tr key={item.label} className='flex justify-between py-2'>
              <td>{item.label}:</td>
              <td className='text-black/80'>{details[item.value]}</td>
            </tr> 
          ))}
        </tbody>
      </table>

      <table className='flex flex-col sm:hidden w-full bg-white shadow-md rounded-[4px] p-2'>
        <h1 className='uppercase text-sm'>Characteristics</h1>
        <hr />
        <tbody className='grid grid-cols-1 w-full text-sm capitalize'>
          {table.map((item) => (
            <tr key={item.label} className='flex justify-between px-1 py-0.5 even:bg-[#f1f4f5]'>
              <td>{item.label}:</td>
              <td className='text-black/80'>{details[item.value]}</td>
            </tr> 
          ))}
        </tbody>
      </table>    
    </>
  );
}

export default MainTable;