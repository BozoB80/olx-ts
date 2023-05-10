'use client'

import { tableDetails } from "@/utils/tabledetails";
import { DocumentData } from "firebase/firestore";

type TableProps = {
  details: DocumentData
}

const MainTable = ({ details }: TableProps) => {
  return (
    <table className='flex w-full'>
      <tbody className='grid grid-cols-2 w-full text-sm capitalize gap-x-16'>
        {tableDetails.map((table) => (
          <tr className='flex justify-between py-2'>
          <td>{table.label}:</td>
          <td className='text-black/80'>{details[table.value]}</td>
        </tr> 
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;