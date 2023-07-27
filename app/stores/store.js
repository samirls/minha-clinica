import {create} from 'zustand';

const useStore = create((set) => ({
  id: null, 
  setId: (newId) => set({ id: newId }),
}));

export default useStore;