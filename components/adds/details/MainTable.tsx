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
    <table className='flex w-full'>
      <tbody className='grid grid-cols-2 w-full text-sm capitalize gap-x-16'>
        {table.map((item) => (
          <tr key={item.label} className='flex justify-between py-2'>
            <td>{item.label}:</td>
            <td className='text-black/80'>{details[item.value]}</td>
          </tr> 
        ))}
      </tbody>
    </table>
  );
}

export default MainTable;