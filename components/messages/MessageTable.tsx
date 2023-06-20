'use client'

import { auth, db } from "@/firebase/firebase";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

interface MessageTableProps {
  conversationId: string
}

const MessageTable: React.FC<MessageTableProps> = ({ conversationId }) => {
  const [user] = useAuthState(auth)
  const userId = user?.uid
  const messagesRef = userId ? collection(db, "users", userId, "conversations", conversationId, "messages") : null;
  const messagesQuery = messagesRef ? query(messagesRef, orderBy("createdAt", "asc")) : null;
  const [messages] = useCollectionData(userId ? messagesQuery : null);
 

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-y-4 bg-gray-50">
      {messages?.map((message, index) => {
        const { sentMessage, receivedMessage, createdAt } = message
        const date = createdAt.toDate().toLocaleDateString('en-GB')
        const time = createdAt.toDate().toLocaleTimeString('en-GB')
        
        return (
        <div key={index} className={`w-full flex ${sentMessage ? 'justify-end' : 'justify-start'}`}>
          <div className={`border rounded-md font-light p-3 flex flex-col ${sentMessage ? 'bg-[#ceddff]' : 'bg-[#f2f4f5]'}`}>
            <p className="font-normal">{sentMessage} {receivedMessage} </p>
            <p className="text-[11px]">{date} at {time}</p>
          </div>
        </div>
      )})}      
    </div>
  );
}

export default MessageTable;