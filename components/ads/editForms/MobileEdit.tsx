'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebase";
import { ChangeEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { colors } from "@/utils/selectData";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const MobileEdit = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export default MobileEdit;