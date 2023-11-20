import { create } from "zustand";

export const usePrescription = create((set) => ({
  prescription: [],
  setPrescription: (state) => set(() => ({ prescription: state })),
}));
export const useEntrance = create((set) => ({
  entrance: [],
  setEntrance: (state) => set(() => ({ entrance: state })),
}));
export const useMedicine = create((set) => ({
  medicine: [],
  setMedicine: (state) => set(() => ({ medicine: state })),
}));
export const useEntranceTrough = create((set) => ({
  entranceThrough: [],
  setEntranceThrough: (state) => set(() => ({ entranceThrough: state })),
}));
export const useFactorTotal = create((set) => ({
  factorTotal: [],
  setFactorTotal: (state) => set(() => ({ factorTotal: state })),
}));

export const useTemplateLogo = create((set) => ({
  templateLogo: "./images/frontend/colorful.png",
  setTemplateLogo: (state) => set(() => ({ templateLogo: state })),
}));
