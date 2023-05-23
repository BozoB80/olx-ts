import { create } from 'zustand';
import { ProductCardSmallProps } from '@/types';
import { Timestamp } from 'firebase/firestore';

type SortOrder = 'asc' | 'desc';

interface ProductSortingStore {
  data: ProductCardSmallProps[];
  sortedData: ProductCardSmallProps[];

  setData: (data: ProductCardSmallProps[]) => void;
  sortDataByPrice: (order: SortOrder) => void;
  sortDataByDate: (order: SortOrder) => void;
}

const useProductSortingStore = create<ProductSortingStore>((set) => ({
  data: [],
  sortedData: [],

  setData: (data) => {
    set({ data });
  },

  sortDataByPrice: (order) => {
    set((state) => {
      const sortedData = [...state.data];
      sortedData.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      return { sortedData };
    });
  },

  sortDataByDate: (order) => {
    set((state) => {
      const sortedData = [...state.data];
      sortedData.sort((a, b) => {
        const dateA = (a.createdAt as Timestamp).toDate();
        const dateB = (b.createdAt as Timestamp).toDate();
        if (order === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
      return { sortedData };
    });
  },
}));

export default useProductSortingStore;
