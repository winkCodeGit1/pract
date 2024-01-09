import axiosInstance from 'utils/axios';

export async function getAllShifts({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axiosInstance('hmis-master-services/shiftDetails/getAll', { signal });
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function saveshift({ signal }) {
//   try {
//     const { data } = await axiosInstance('hmis-master-services/shiftDetails/saveShiftDetails', {
//       signal,
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

//department
export async function getDepartment({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axiosInstance('hmis-master-services/department/getAll', { signal });
    return data;
  } catch (error) {
    throw error;
  }
}

//role
export async function getRole({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axiosInstance('hmis-master-services/role/getAll', { signal });
    return data;
  } catch (error) {
    throw error;
  }
}

//staff
export async function getStaff({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axiosInstance('hmis-master-services/staff/getAll', { signal });
    return data;
  } catch (error) {
    throw error;
  }
}

//saveDutyRoster
export async function saveDutyroster({ signal }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axiosInstance('hmis-master-services/dutyRoster/saveDutyRoster', {
      signal,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
