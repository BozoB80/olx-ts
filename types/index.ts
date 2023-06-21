import { Timestamp } from "firebase/firestore"

export type CarProps = {
  
}

export type ProductCardSmallProps = {
  id: string
  title: string
  fuel?: string
  type?: string
  state?: string
  mileage?: string
  year?: string
  ram?: string
  availability?: string
  price: number
  imageURL: string
  furnished?: boolean
  createdAt: Timestamp
  category?: string
}