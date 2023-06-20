"use client";

import { auth, db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {useDocumentData} from "react-firebase-hooks/firestore";
import MessageHeader from "./MessageHeader";
import MessageTable from "./MessageTable";
import MessageFooter from "./MessageFooter";

type IProps = {
  id: string;
};

const MessageTab = ({ id }: IProps) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const [conversation] = useDocumentData(userId ? doc(db, "users", userId, "conversations", id) : null);
  

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <MessageHeader
          senderName={conversation?.senderName}
          receiverName={conversation?.receiverName}
          imageURL={conversation?.imageURL}
          title={conversation?.title}
          price={conversation?.price}
        />
        <MessageTable conversationId={id} />
        <MessageFooter senderRef={conversation?.senderRef} receiverRef={conversation?.receiverRef} />
      </div>
    </div>
  );
};

export default MessageTab;
