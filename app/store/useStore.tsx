import { create } from 'zustand';

interface State {
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
}

const useStore = create<State>((set) => ({
  isLoggedin: false,
  setIsLoggedin: (value) => set({ isLoggedin: value }),
  isAuthorized: false,
  setIsAuthorized: (value) => set({ isAuthorized: value }),
}));

export default useStore;
