import { create } from 'zustand';

interface State {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
}

const useStore = create<State>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  isAuthorized: false,
  setIsAuthorized: (value) => set({ isAuthorized: value }),
}));

export default useStore;
