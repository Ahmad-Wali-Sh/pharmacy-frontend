import { create } from "zustand";

export const usePrescription = create((set) => ({
  prescription: [],
  setPrescription: (state) => set(() => ({ prescription: state })),
}));

export const usePrescriptionReturn = create((set) => ({
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
  factorTotal: 0,
  setFactorTotal: (state) => set(() => ({ factorTotal: state })),
}));

export const useTemplateLogo = create((set) => ({
  templateLogo: "./images/frontend/colorful.png",
  setTemplateLogo: (state) => set(() => ({ templateLogo: state })),
}));

export const useSubmitedEntrance = create((set) => ({
  submitedEntrance: "",
  setSubmitedEntrance: (state) => set(() => ({ submitedEntrance: state })),
}));

export const useMedicineShow = create((set) => ({
  medicineShow: "",
  setMedicineShow: (state) => set(() => ({ medicineShow: state })),
}));
export const useNewMedicineShow = create((set) => ({
  newMedicineShow: "",
  setNewMedicineShow: (state) => set(() => ({ newMedicineShow: state })),
}));
export const useTheme = create((set) => ({
  theme: "dark",
  setTheme: (state) => set(() => ({ theme: state })),
}));
export const useUserPermissions = create((set) => ({
  userPermissions: [],
  setUserPermissions: (state) => set(() => ({ userPermissions: state })),
}));
export const useMedicineOpener = create((set) => ({
  medicineOpener: [],
  setMedicineOpener: (state) => set(() => ({ medicineOpener: state })),
}));
export const useMedicineClosed = create((set) => ({
  medicineClosed: [],
  setMedicineClosed: (state) => set(() => ({ medicineClosed: state })),
}));
