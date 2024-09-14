import { create } from "zustand";

interface State {
  ready: Boolean;
  isReady: () => void;
}

export const useStore = create<State>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));
