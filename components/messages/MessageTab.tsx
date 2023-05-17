'use client'

import { auth, db } from "@/firebase/firebase"
import { collection } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import MessageHeader from "./MessageHeader"
import MessageTable from "./MessageTable"
import MessageFooter from "./MessageFooter"

type IProps = {
  id: string
}

const MessageTab = ({ id }: IProps) => {
  const [ user ] = useAuthState(auth)
  const userId = user?.uid 

  const [ messages ] = useCollection(userId ? collection(db, 'users', userId, 'conversations', id, 'sentMessages' ) : null)

  

  return (
    <div className="bg-white">
      {messages?.docs?.map((message) => {
        const { price, receiverName, senderName, text, title, imageURL, createdAt } = message.data()
        
        
        return (
          <div key={title} className="flex flex-col justify-center items-center">
            <MessageHeader senderName={senderName} receiverName={receiverName} imageURL={imageURL} title={title} price={price} />
            <MessageTable sentMessage={text} createdAt={createdAt} />
            <MessageFooter  />
          </div>
        )
      })}
    </div>
  );
}

export default MessageTab;