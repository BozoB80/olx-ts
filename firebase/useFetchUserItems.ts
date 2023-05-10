'use client'

import { db } from "@/firebase/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchUserAdds = ( id: string ) => {
  const [userItems, setUserItems] = useState([])

  const getUserAdds = () => {
    try {
      const userAddsRef = collection(db, "products");
      const q = query(
        userAddsRef,
        where("userRef", "==", id),
        orderBy("createdAt", "asc")
      );

      onSnapshot(q, (snapshot) => {
        const allAdds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserItems(allAdds as any);      
      })

    } catch (error: any) {
      console.log("No adds displayed");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

  useEffect(() => {
    getUserAdds();
  }, [id]);

  return { userItems }
}

export default useFetchUserAdds;