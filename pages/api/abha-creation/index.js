import axiosInstance from 'utils/axios';
import { hmis_registration_services } from '../urls';
const enrollment = 'abhaCreation/v3/enrollment/';
const profile = 'abhaCreation/v3/profile/';

export const enrollmentRequestMobileOtp = async (req) =>
  await axiosInstance.post(hmis_registration_services + enrollment + 'request/mobile/otp', req);

export const enrollmentRequestAadharOtp = async (req) =>
  await axiosInstance.post(hmis_registration_services + enrollment + 'request/aadhaar/otp', req);

export const enrollmentEnrolByAadhaar = async (req) =>
  await axiosInstance.post(hmis_registration_services + enrollment + 'enrol/byAadhaar', req);

export const enrollmentAuthMobileByAbdm = async (req) =>
  await axiosInstance.post(hmis_registration_services + enrollment + 'auth/mobile/byAbdm', req);

export const enrollmentEnrolAbhaAddress = async (req) =>
  await axiosInstance.post(hmis_registration_services + enrollment + 'enrol/abha-address', req);

export const enrollmentEnrolSuggestion = async ({ queryKey, signal }) =>
  await axiosInstance(hmis_registration_services + enrollment + 'enrol/suggestion', {
    params: queryKey[1],
    signal,
  });

//Profile
export const profileAccountQrCode = async ({ queryKey, signal }) =>
  await axiosInstance(hmis_registration_services + profile + 'account/qrCode', {
    params: queryKey[1],
    signal,
  });

export const profileAccountAbhaCard = async ({ queryKey, signal }) =>
  await axiosInstance(
    hmis_registration_services + profile + 'abhaCreation/v3/profile/account/abha-card?',
    {
      params: queryKey[1],
      signal,
    }
  );
