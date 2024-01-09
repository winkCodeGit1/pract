import { create } from 'zustand';

const useBedManagementStore = create((set) => ({
  isTransferOpen: false,
  isDischargeOpen: false,
  toggleTransfer: () => set((state) => ({ isTransferOpen: !state.isTransferOpen })),
  toggleDischarge: () => set((state) => ({ isDischargeOpen: !state.isDischargeOpen })),
}));

export default useBedManagementStore;
