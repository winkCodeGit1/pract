import axiosInstance from 'utils/axios';
import { hmis_master_services, hmis_registration_services, hmis_billing_services } from './urls';

//=========== write keys before the name of the function, same should be used while using react-query=================
export async function getAllInvSampleTypesLabTestsAndGroupTestsNew({ signal }) {
  const { data } = await axiosInstance(
    'https://ehr.ayush.gov.in/ahmis-master-services/sampleType/getAllInvSampleTypesLabTestsAndGroupTestsNew',
    { signal }
  );

  return data;
}

// ===================================== DASHBOARD-START =====================================================================
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
  const { data } = await axiosInstance(`${hmis_master_services}/country/${queryKey[2]}`, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.stateName }));
}

export async function getCities({ queryKey, signal }) {
  const { data } = await axiosInstance(`${hmis_master_services}/state/${queryKey[2]}`, { signal });
  return data.map((item) => ({ ...item, label: item.cityName }));
}

export async function getAllDepartmentsByOrgId({ signal }) {
  const { data } = await axiosInstance('department/getAllDepartmentsByOrgId/1', { signal });
  return data.map((item) => ({ ...item, label: item.deptName }));
}

export async function genderGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'gender/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.gender }));
}

export async function maritalstatusGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'maritalstatus/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.status }));
}

export async function relationtypeGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'relationtype/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.typeName }));
}

export async function bloodGroupGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'bloodGroup/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.bloodGroup }));
}

//used key getAllQualification
export async function qualificationGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'qualification/getAll', { signal });
  return data.map((item) => ({ ...item, label: item.qualificationName }));
}

export async function departmentGetOPDepts({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'department/getOPDepts/' + queryKey[2],
    { signal }
  );
  return data.map((item) => ({ ...item, label: item.deptName }));
}

export async function staffGetAllDoctorsByOrg({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'staff/getAllDoctorsByOrg/' + queryKey[2],
    {
      signal,
    }
  );
  return data.map((item) => ({ ...item, label: item.staffName }));
}

export async function patientCategoryGetAllActivePatientCategorysByOrg({ queryKey, signal }) {
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

export async function registrationGetPatientByMRN(id) {
  const { data } = await axiosInstance(
    hmis_registration_services + 'registration/getPatientByMRN/' + id
  );

  return data;
}
// ===================================== DASHBOARD-END =====================================================================

// ====================================== DUTY Roaster START=========================================
export async function shiftDetailsGetAll({ signal }) {
  const { data } = await axiosInstance('hmis-master-services/shiftDetails/getAll', { signal });
  return data;
}

//department
export async function departmentGetAll({ signal }) {
  const { data } = await axiosInstance('hmis-master-services/department/getAll', { signal });
  return data;
}

//role
export async function roleGetAll({ signal }) {
  const { data } = await axiosInstance('hmis-master-services/role/getAll', { signal });
  return data;
}

//staff
export async function staffGetAll({ signal }) {
  const { data } = await axiosInstance('hmis-master-services/staff/getAll', { signal });
  return data;
}

//saveDutyRoster
export async function dutyRosterSaveDutyRoster({ signal }) {
  const { data } = await axiosInstance('hmis-master-services/dutyRoster/saveDutyRoster', {
    signal,
  });
  return data;
}
// ====================================== DUTY Roaster END =========================================

// ================================ MASTER START====================================================
export async function roleGetAllRoles({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'role/getAllRoles', { signal });

  return data.map((item) => ({ ...item, label: item.roleName }));
}
//key same as function name
export async function staffTypeGetAllStaffType({ signal, req }) {
  const { data } = await axiosInstance(hmis_master_services + 'staffType/getAllStaffType', {
    signal,
    data: req,
  });

  return data.map((item) => ({ ...item, label: item.typeName }));
}

export async function staffSaveStaff({ signal, req }) {
  const { data } = await axiosInstance.post(hmis_master_services + 'staff/saveStaff', req, {
    signal,
  });
  return data;
}

export async function staffGetStaffsByOrgId({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'staff/getStaffsByOrgId', { signal });
  return data;
}

export async function getPaymentModeGetallPaymentModes({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'paymentMode/getAllPaymentModes', {
    signal,
  });
  return data;
}

export async function paymentModeSavePaymentMode({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_master_services + 'paymentMode/savePaymentMode',
    req,
    {
      signal,
    }
  );
  return data;
}

export async function departmentGetAllDeptByOrgIdTypeId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + `department/getAllDeptByOrgIdTypeId/${queryKey[1]}/${queryKey[2]}`,
    {
      signal,
    }
  );
  return data;
}

export async function departmentTypeSaveDeptType({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_master_services + 'department/saveDepartment',
    req,
    {
      signal,
    }
  );
  return data;
}

// ================================ MASTER END ====================================================

// ================================ OPD Services ====================================================

export async function billDetailsSaveBill({ signal, req }) {
  const { data } = await axiosInstance.post(hmis_billing_services + 'billDetails/saveBill', req, {
    signal,
  });
  return data;
}
