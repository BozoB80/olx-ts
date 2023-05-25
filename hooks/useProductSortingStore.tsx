import { create } from 'zustand';
import { ProductCardSmallProps } from '@/types';
import { Timestamp } from 'firebase/firestore';

type SortOrder = 'asc' | 'desc';
type FuelType = 'Petrol' | 'Diesel' | 'Gas' | 'Hybrid' | 'Electric';
type StateType = 'New' | 'Used'

interface ProductSortingStore {
  data: ProductCardSmallProps[];
  sortedData: ProductCardSmallProps[];
  filteredData: ProductCardSmallProps[];
  selectedFuelTypes: FuelType[];
  selectedStateTypes: StateType[]

  setData: (data: ProductCardSmallProps[]) => void;
  sortDataByPrice: (order: SortOrder) => void;
  sortDataByDate: (order: SortOrder) => void;
  filterByFuelType: (fuelType: FuelType) => void;
  filterByStateType: (stateType: StateType) => void;
  resetFilters: () => void;
}

const useProductSortingStore = create<ProductSortingStore>((set) => ({
  data: [],
  sortedData: [],
  selectedFuelTypes: [],
  selectedStateTypes: [],
  filteredData: [],

  setData: (data) => {
    set((state) => ({
      data,
      filteredData: data,
    }));
  },

  sortDataByPrice: (order) => {
    set((state) => {
      const sortedData = [...state.filteredData];
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
      const sortedData = [...state.filteredData];
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
  
      let filteredData;
      if (selectedFuelTypes.length === 0) {
        // Display all items if no fuel types are selected
        filteredData = state.data;
      } else {
        filteredData = state.data.filter((item) =>
          selectedFuelTypes.includes(item.fuel as FuelType)
        );
      }
  
      return { selectedFuelTypes, filteredData };
    });
  },

  filterByStateType: (stateType?: StateType) => {
    set((state) => {
      const selectedStateTypes = [...state.selectedStateTypes];
      let filteredData;
      
      if (stateType) {
        // Remove any previously selected state types
        selectedStateTypes.length = 0;
        selectedStateTypes.push(stateType);
        
        // Filter data based on the selected state type
        filteredData = state.data.filter((item) =>
          item.state === stateType
        );
      } else {
        // Clear all selected state types and display all items
        if (selectedStateTypes.length = 0) {
          filteredData = state.data;
        }
      }
  
      return { selectedStateTypes, filteredData };
    });
  },  

  resetFilters: () => {
    set((state) => ({
      sortedData: [],
      selectedFuelTypes: [],
      selectedStateTypes: [],
      filteredData: state.data, 
    }));
  },
}));


export default useProductSortingStore;
