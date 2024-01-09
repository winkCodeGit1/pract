import { create } from 'zustand';

const useConsultationStore = create((set) => ({
  selectedPatient: null,
  setSelectedPatient: (selectedPatient) => set(() => ({ selectedPatient })),
  reset: () => set(() => ({ selectedPatient: null })),
}));

export default useConsultationStore;
