/** @format */

import axiosInstance from 'utils/axios';
import { hmis_billing_service, hmis_master_services, hmis_registration_services } from '../urls';

//=========== write keys before the name of the function, same should be used while using react-query=================

export async function getUser({ signal }) {
  const { data } = await axiosInstance('https://www.melivecode.com/api/users', {
    signal,
  });
  return data;
}

export async function getCountries({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'country/getAll', {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.countryName }));
}
export async function getStates({ queryKey, signal }) {
  const { data } = await axiosInstance(`${hmis_master_services}/country/${queryKey[1]}`, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.stateName }));
}
export async function getCities({ queryKey, signal }) {
  const { data } = await axiosInstance(`${hmis_master_services}/state/${queryKey[1]}`, { signal });
  return data.map((item) => ({ ...item, label: item.cityName }));
}
export async function getAllDepartmentsByOrgId({ signal }) {
  const { data } = await axiosInstance('department/getAllDepartmentsByOrgId/1', { signal });
  return data.map((item) => ({ ...item, label: item.deptName }));
}

export async function getAllGender({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'gender/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.gender }));
}

export async function getAllMaritalStatus({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'maritalstatus/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.status }));
}

export async function getAllRelationType({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'relationtype/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.typeName }));
}
export async function getBloodGroup({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'bloodGroup/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.bloodGroup }));
}

//used key getAllQualification
export async function getAllQualifications({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'qualification/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.qualificationName }));
}
export async function getDepartment({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'department/getOPDepts/' + queryKey[2],
    { signal }
  );
  return data.map((item) => ({ ...item, label: item.deptName }));
}

export async function getStaffListByDeptId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'staffDeptMap/getStaffListByDeptId/' + queryKey[1],
    {
      signal,
    }
  );
  return data.map((item) => ({ ...item, label: item.staffName }));
}
export async function getPatientCategory({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + '/patientCategory/getAllActivePatientCategorysByOrg',
    {
      signal,
      params: {
        orgId: queryKey[2],
      },
    }
  );
  return data.map((item) => ({ ...item, label: item.name }));
}

export async function getPatientByMRNId(id) {
  const { data } = await axiosInstance(
    hmis_registration_services + 'registration/getPatientByMRN/' + id
  );

  return data;
}

export async function getUnbilledPatients({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_registration_services + `registration/getUnbilledPatients/${queryKey[1]}/${queryKey[2]}`,
    signal
  );

  return data.map((item) => ({ ...item, label: item.patientMrn + '/' + item.patientName }));
}

export async function getActiveFeesByOrg({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + `fees/getActiveFeesByOrg/${queryKey[1]}`,
    signal
  );

  return data;
}

export async function billGetTodayBillByOrgId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_billing_service + `bill/getTodayBillByOrgId/${queryKey[1]}`,
    signal
  );

  return data;
}

export async function billGetBillDetailsByBillId(billId) {
  const { data } = await axiosInstance(
    hmis_billing_service + `billDetails/getBillDetailsByBillId/${billId}`
  );

  return data;
}
export async function billDetailsCancelBill({ signal, req }) {
  const { data } = await axiosInstance.post(hmis_billing_service + 'billDetails/cancelBill', req, {
    signal,
  });

  return data;
}
export async function feesGetAllFeesCodeByOrgGrouped({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'fees/getAllFeesCodeByOrgGrouped',
    signal
  );

  return data;
}
