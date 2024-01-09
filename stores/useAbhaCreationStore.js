import { create } from 'zustand';

export const allSteps = [
  { label: 'Consent Collection' },
  { label: 'Aadhar Authentication' },
  { label: 'Communication Details' },
  { label: 'Abha Address Creation' },
  { label: 'View Profile' },
];

const initialState = {
  totalSteps: allSteps.length,
  activeStep: 0,
  txnId: '',
  xToken: '',
  isCurrentStepValid: false,
  isSameMobileNo: false,
  isAbhaExist: false,
  apiMessage: '',
};

const useAbhaCreationStore = create((set) => ({
  // Initial state values
  ...initialState,
  // Other state update functions

  //to reset all state properties to their initial values
  resetState: () => set(() => initialState),
  //other methods
  setIsAbhaExist: (isAbhaExist) => set(() => ({ isAbhaExist })),
  setIsSameMobileNo: (isSameMobileNo) => set(() => ({ isSameMobileNo })),
  handleIsValidStep: (isCurrentStepValid) => set(() => ({ isCurrentStepValid })),
  handleNextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  changeStep: (activeStep) => set(() => ({ activeStep })),
  setTxnId: (txnId) => set(() => ({ txnId })),
  setXToken: (xToken) => set(() => ({ xToken })),
  setApiMessage: (apiMessage) => set(() => ({ apiMessage })),
}));

export default useAbhaCreationStore;
