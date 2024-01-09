import { create } from 'zustand';

const useSettingStore = create((set) => ({
  isSettingOpen: false,
  toggleSettingDrawer: () => set((state) => ({ isSettingOpen: !state.isSettingOpen })),
}));

export default useSettingStore;