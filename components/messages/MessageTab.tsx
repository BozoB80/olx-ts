"use client";

import { auth, db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import MessageHeader from "./MessageHeader";
import MessageTable from "./MessageTable";
import MessageFooter from "./MessageFooter";

type IProps = {
  id: string;
  setSelectedConversationId: (selectedConversationId: string) => void
};

const MessageTab = ({ id, setSelectedConversationId }: IProps) => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const [conversation] = useDocumentData(userId ? doc(db, "users", userId, "conversations", id) : null);  

  return (
    <div className="bg-white">
      <div className="relative h-[90vh] sm:h-[80vh] flex flex-col justify-center items-center">
        <MessageHeader
          setSelectedConversationId={setSelectedConversationId}
          senderName={conversation?.senderName}
          receiverName={conversation?.receiverName}
          imageURL={conversation?.imageURL}
          title={conversation?.title}
          price={conversation?.price}
        />
        <MessageTable conversationId={id} />
        <MessageFooter conversationId={id} senderRef={conversation?.senderRef} receiverRef={conversation?.receiverRef} />
      </div>
    </div>
  );
};

export default MessageTab;
