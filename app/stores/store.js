import {create} from 'zustand';

const store = (set) => ({
  id: null, //esse e o de baixo
  setId: (newId) => set({ id: newId }), //estavam funcionando, mas como adicionei as linhas abaixo preciso mexer e testar o funcionamento
  infoFromToken: {},
  setInfoFromToken: (newInfo) => 
    set((store) => ({
      infoFromToken: newInfo,
    })),
  prontuarios: [],
  setProntuarios: (data) =>
    set((store) => ({
      prontuarios: data,
    })),
  totalPages: null,
  setTotalPages: (data) =>
    set((store) => ({
      totalPages: data,
    })),
  totalElements: null,
  setTotalElements: (data) => 
      set((store) => ({
        totalElements: data,
      }))
});

export const useStore = create(store);