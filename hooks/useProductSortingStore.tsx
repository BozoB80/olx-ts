import { create } from 'zustand';
import { ProductCardSmallProps } from '@/types';
import { Timestamp } from 'firebase/firestore';

type SortOrder = 'asc' | 'desc';
type FuelType = 'Petrol' | 'Diesel' | 'Gas' | 'Hybrid' | 'Electric';

interface ProductSortingStore {
  data: ProductCardSmallProps[];
  sortedData: ProductCardSmallProps[];
  selectedFuelTypes: FuelType[];

  setData: (data: ProductCardSmallProps[]) => void;
  sortDataByPrice: (order: SortOrder) => void;
  sortDataByDate: (order: SortOrder) => void;
  filterByFuelType: (fuelType: FuelType) => void;
  resetFilters: () => void;
}

const useProductSortingStore = create<ProductSortingStore>((set) => ({
  data: [],
  sortedData: [],
  selectedFuelTypes: [],

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

  filterByFuelType: (fuelType?: FuelType) => {
    set((state) => {
      const selectedFuelTypes = [...state.selectedFuelTypes];  
      if (fuelType) {
        if (selectedFuelTypes.includes(fuelType)) {
          // Remove fuelType if already selected
          const index = selectedFuelTypes.indexOf(fuelType);
          selectedFuelTypes.splice(index, 1);
        } else {
          // Add fuelType if not already selected
          selectedFuelTypes.push(fuelType);
        }
      } else {
        // Clear all selected fuel types if fuelType is undefined
        selectedFuelTypes.length = 0;
      }
  
      const sortedData = state.data.filter((item) =>
        selectedFuelTypes.includes(item.fuel as FuelType)
      );
  
      return { selectedFuelTypes, sortedData };
    });
  },

  resetFilters: () => {
    set((state) => ({
      sortedData: [],
      selectedFuelTypes: [],
    }));
  },
}));


export default useProductSortingStore;
