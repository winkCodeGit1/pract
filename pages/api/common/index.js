import axiosInstance from 'utils/axios';
import { hmis_registration_services } from '../urls';

export const vitalSignSaveVitalSignValues = async ({ signal, req }) => {
  const data = axiosInstance.post(
    hmis_registration_services + 'vitalSign/saveVitalSignValues',
    req,
    { signal }
  );
  return data;
};

export const registrationCreateOfflineAppointment = async ({ signal, req }) => {
  const data = axiosInstance.post(
    hmis_registration_services + 'registration/createOfflineAppointment',
    req,
    { signal }
  );
  return data;
};
export const vitalSignGetByRegistrationId = async ({ queryKey, signal }) => {
  const data = axiosInstance(
    hmis_registration_services + 'vitalSign/getByRegistrationId/' + queryKey[1],
    {
      signal,
    }
  );
  return data;
};
export const registrationUpdateDeptOfOpId = async ({ signal, req }) => {
  const data = axiosInstance.put(
    `${hmis_registration_services}registration/updateDeptOfOpId/${req[0]}/${req[1]}/${req[2]}`,
    {
      signal,
    }
  );
  return data;
};

export const registrationRegister = async ({ signal, req, isUpdate }) => {
  if (isUpdate) {
    const data = axiosInstance.put(
      `${hmis_registration_services}registration/editPatientDetails`,
      req,
      {
        signal,
      }
    );
    return data;
  }
  const data = axiosInstance.post(`${hmis_registration_services}registration/register`, req, {
    signal,
  });
  return data;
};

export const registrationGetExistingPatientDetails = async ({ signal, req }) => {
  const data = axiosInstance.post(
    `${hmis_registration_services}registration/getExistingPatientDetails`,
    req,
    {
      signal,
    }
  );
  return data;
};
