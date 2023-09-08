import {create } from 'zustand'

export const usePrescription = create((set) => ({
        prescription: [],
        setPrescription: (state) => set(() => ({prescription: state})),
}))