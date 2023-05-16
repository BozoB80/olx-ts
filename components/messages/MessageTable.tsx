'use client'

import { Timestamp } from "firebase/firestore";

interface MessageTableProps {
  sentMessage: string
  createdAt: Timestamp
}

const MessageTable: React.FC<MessageTableProps> = ({ sentMessage, createdAt }) => {
  const date = createdAt.toDate().toLocaleDateString('en-GB')

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-[#f2f4f5]">
      <div className={`w-full flex ${sentMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`border rounded-md font-light p-3 flex flex-col ${sentMessage ? 'bg-[#ceddff]' : 'bg-[#f1f4f5]'}`}>
          <p>{sentMessage}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageTable;