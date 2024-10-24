import { create } from "zustand";

export const useUserPermissions = create((set) => ({
    userPermissions: [],
    setUserPermissions: (state) => set(() => ({ userPermissions: state })),
  }));