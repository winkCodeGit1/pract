import axiosInstance from 'utils/axios';
import { hmis_master_services, hmis_sanitation_services, hmis_ipd_master_services } from '../urls';

// key same as function name
export async function getAllRoles({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'role/getAllRoles', { signal });

  return data.map((item) => ({ ...item, label: item.roleName }));
}

//key same as function name
export async function getAllStaffTypes({ signal, req }) {
  const { data } = await axiosInstance(hmis_master_services + 'staffType/getAllStaffType', req, {
    signal,
  });

  return data.map((item) => ({ ...item, label: item.typeName }));
}
export async function getFeatureSetForRoleById({ signal, queryKey }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'user/getFeatureSetForRoleById/' + queryKey[1],
    { signal }
  );
  return data;
}

export async function saveStaff({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_master_services + 'staff/saveStaffWithPrivileges',
    req,
    {
      signal,
    }
  );
  return data;
}

export async function userCheckAvailability(req) {
  const { data } = await axiosInstance.post(hmis_master_services + 'user/checkAvailability', req);
  return data;
}

export async function getStaffsByOrgId({ signal, queryKey }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'staff/getStaffsByOrgId/' + queryKey[1],
    { signal }
  );
  return data.map((el) => ({ ...el, label: el.staffName }));
}
export async function useGetAllFeatureSetForRoleId({ signal, queryKey }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'user/getAllFeatureSetForRoleId/' + queryKey[1],
    { signal }
  );
  return data;
}

export async function vitalSignTypeSaveVitalSignType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'vitalSignType/saveVitalSignType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'vitalSignType/saveVitalSignType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export async function vitalSignTypeGetAllVitalSignTypeInDto({ signal, req }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'vitalSignType/getAllVitalSignTypeInDto',
    {
      signal,
      data: req,
    }
  );
  return data;
}

export async function departmentTypeSaveDeptType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'department/saveDepartment',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'department/saveDepartment',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export async function departmentGetAllDeptByOrgIdTypeId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + `department/getAllDeptByOrgIdTypeId/${queryKey[1]}/${queryKey[2]}`,
    {
      signal,
    }
  );
  return data;
}

//qualifications

export async function qualificationsave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_master_services + 'qualification/save', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_master_services + 'qualification/save', req, {
      signal,
    });
    return data;
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export async function qualificationgetAll({ signal, req }) {
  const { data } = await axiosInstance(hmis_master_services + 'qualification/getAll', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.qualificationName }));
}

//fee
export async function feesSaveFeeV2({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_master_services + 'fees/saveFeeV2', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_master_services + 'fees/saveFeeV2', req, {
      signal,
    });
    return data;
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export async function feesGetFeesByOrg({ queryKey, signal }) {
  const { data } = await axiosInstance(hmis_master_services + `fees/getFeesByOrg/${queryKey[1]}`, {
    signal,
  });
  return data;
}

export async function feeTypeFetchActiveFeeType({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'feeType/fetchActiveFeeType', {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.feeTypeName }));
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Procedure+++++++++++++++++++++++++
export async function surgicalProceduresGetAll({ signal, req }) {
  const { data } = await axiosInstance.get(
    hmis_master_services + 'surgicalProcedures/getAll',
    req,
    {
      signal,
    }
  );
  console.log(data, 'data');
  const parsedData = data.map((item) => ({
    ...item,
    isParaSurgical: item?.isParaSurgical ? 'ParaSurgical' : 'Surgical',
  }));
  return parsedData;
}
export async function surgicalProceduresSave({ signal, req }) {
  const { data } = await axiosInstance.post(hmis_master_services + 'surgicalProcedures/save', req, {
    signal,
  });
  return data;
}

//specialization

export async function specializationSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_master_services + 'specialization/save', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_master_services + 'specialization/save', req, {
      signal,
    });
    return data;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export async function specializationGetAll({ signal, req }) {
  const { data } = await axiosInstance(hmis_master_services + 'specialization/getAll', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.specName }));
}

export async function medicineGetAllopathyMedicines({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'medicine/getAllopathyMedicines', {
    signal,
  });

  return data.map((el) => ({ ...el, label: el.MedicineName }));
}
export async function getAllActiveDrugIntervals({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'drugInterval/getAllActiveDrugIntervals',
    signal
  );

  return data.map((el) => ({ ...el, label: el.drugIntervalName }));
}
export async function historyTypeGetActivePastHistoryTypes({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'historyType/getActivePastHistoryTypes',
    signal
  );

  return data;
}
export async function historyTypeGetActivePersonalHistoryTypes({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'historyType/getActivePersonalHistoryTypes',
    signal
  );

  return data;
}
export async function historyTypeGetActiveFamilyHistoryTypes({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'historyType/getActiveFamilyHistoryTypes',
    signal
  );

  return data;
}

export async function buildingGetAllBuildingsByOrgId({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'building/getAllBuildingsByOrgId', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.buildingName }));
}

export async function buildingSaveBuilding({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_master_services + 'building/saveBuilding', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_master_services + 'building/saveBuilding', req, {
      signal,
    });
    return data;
  }
}
export async function vitalSignTypeGetAllActiveVitalSignType({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'vitalSignType/getAllActiveVitalSignType',
    { signal }
  );

  return data;
}

//+++++floor+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export async function getAllBuildingList({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'buildingFloor/getAllByOrgId', {
    signal,
  });
  return data.map((el) => ({
    ...el,
    label: el.buildingName,
    floorNamesList: el.floorNames.join(),
  }));
}

export async function buildingFloorGetFloorByBuildingId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + `buildingFloor/getFloorByBuildingId/${queryKey[1]}`,
    { signal }
  );
  return data['floors'].map((itm) => ({ ...itm, label: itm.floorName }));
}

export async function buildingFloorSaveBuildingFloor({ signal, req, isEditMode }) {
  console.log(req, '----api');
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'buildingFloor/saveBuildingFloor',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'buildingFloor/saveBuildingFloor',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++Consultation Room ++++++++++++++++++++++++++++++++++++++++++

export async function consultationRoomGetAllConsultationRoomByOrg({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'consultationRoom/getAllConsultationRoomByOrg',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.roomName }));
}

export async function consultationRoomSaveConsultationRoom({ signal, req, isEditMode }) {
  console.log(req, '----req');
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'consultationRoom/saveConsultationRoom',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_master_services + 'consultationRoom/saveConsultationRoom',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function icdCodeGetAllIcdCodeByVersion({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'icdCode/getAllIcdCodeByVersion', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.diagTerm }));
}

export async function buildingFloorgetAll({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'buildingFloor/getAll', signal);
  return data;
}

// +++++++++++++++++++++++++++++++++ start sanitation +++++++++++++++++++++++++++++++

//Category
export async function sanitationCategorySave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_sanitation_services + 'category/save', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_sanitation_services + 'category/save', req, {
      signal,
    });
    return data;
  }
}

export async function allSanitationCategories({ signal }) {
  const { data } = await axiosInstance(hmis_sanitation_services + 'category/getAll', signal);

  return data;
}

export async function sanitationAllActiveCategories({ signal }) {
  const { data } = await axiosInstance(hmis_sanitation_services + 'category/getAllActive', signal);
  return data.map((item) => ({ ...item, label: item.categoryName }));
}

// Man Power
export async function allSanitationManpower({ signal }) {
  const { data } = await axiosInstance(hmis_sanitation_services + 'manpower/getAll', signal);

  return data;
}

export async function getStaffsByBuldingFloorMappingId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_sanitation_services + `manpower/getStaffByBuildingFloorMappingId/${queryKey[1]}`,
    signal
  );

  return data;
}

export async function sanitationManpowerSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(hmis_sanitation_services + 'manpower/save', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_sanitation_services + 'manpower/save', req, {
      signal,
    });
    return data;
  }
}
//Garbage collection
export async function garbageCollectionSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_sanitation_services + 'garbageCollection/save',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_sanitation_services + 'garbageCollection/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
export async function garbageCollectionGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_sanitation_services + 'garbageCollection/getAll',
    signal
  );
  return data;
}

export async function garbageCollectionSelectedStaffs({ signal, queryKey }) {
  const { data } = await axiosInstance(
    hmis_sanitation_services +
      `garbageCollection/getStaffsByCleanDateAndCategoryId/${queryKey[1]}/${queryKey[2]}`,
    signal
  );
  return data.map((el) => ({ ...el, label: el.staffName }));
}

// +++++++++++++++++++++++++++++++++ end sanitation +++++++++++++++++++++++++++++++

export async function adviceGetAllAdvicesByOrgId({ signal }) {
  const { data } = await axiosInstance(
    hmis_master_services + 'advice/getAllAdvicesByOrgId  ',
    signal
  );

  return data;
}

//+++++++++++++++++++++++++++ Master Ipd ++++++++++++++++++++++++++++++++++++++++++
export async function wardTypeSaveWardType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'wardType/editWardType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'wardType/saveWardType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function wardTypeFetchAllWardType({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'wardType/fetchAllWardType', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.typeName }));
}

//+++++++++++++++++++++++++++ Master Ipd- ward service  +++++++++++++++++++++++++++++

export async function wardSaveWard({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_ipd_master_services + 'ward/editWard', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_ipd_master_services + 'ward/saveWard', req, {
      signal,
    });
    return data;
  }
}

export async function wardFetchWardbyOrgId({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'ward/fetchWardbyOrgId', {
    signal,
  });
  console.log(data, '----datawardType');
  return data.map((el) => ({ ...el, label: el.name }));
}
//++++++++++++++++++++ Master Ipd- woundType service  +++++++++++++++++++++++++++
export async function fetchWoundType({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'woundType/fetchWoundType ',
    signal
  );

  return data;
}
export async function saveWoundType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'woundType/editWoundType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + '/woundType/saveWoundType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++ Master Ipd- drainage intensity service  ++++++++++++++++++++++++++
export async function drainageIntensitySaveDrainageIntensity({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'drainageIntensity/editDrainageIntensity',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'drainageIntensity/saveDrainageIntensity',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function drainageIntensityFetchDrainageIntensity({ signal }) {
  const { data } = await axiosInstance.get(
    hmis_ipd_master_services + 'drainageIntensity/fetchDrainageIntensity',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.name }));
}

//++++++++++++++++++++ Master Ipd- wound area ++++++++++++++++++++++++++++

export async function woundAreaSaveWoundArea({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'woundArea/editWoundArea',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'woundArea/saveWoundArea',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fetchWoundArea({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'woundArea/fetchWoundArea', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.name }));
}

//+++++++++++++++++++++++++++ Master Ipd- drainage type service  ++++++++++++++++++++++++++

export async function drainageTypeSaveDrainageType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'drainageType/editDrainageType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'drainageType/saveDrainageType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function drainageTypeFetchDrainageType({ signal }) {
  const { data } = await axiosInstance.get(
    hmis_ipd_master_services + 'drainageType/fetchDrainageType',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.typeName }));
}

//+++++++++++++++++++++++++ Master Ipd- wound bed +++++++++++++++++++++++++++++++

export async function woundBedSaveWoundBed({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'woundBed/editWoundBed',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'woundBed/saveWoundBed',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fetchWoundBed({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'woundBed/fetchWoundBed', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.woundBed }));
}

//+++++++++++++++++++++++++++ Master Ipd- wound odour ++++++++++++++++++++++++++++++++++

export async function woundOdourSaveWoundOdour({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'woundOdour/editWoundOdour',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'woundOdour/saveWoundOdour',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fetchWoundOdour({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'woundOdour/fetchWoundOdour', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.name }));
}

//+++++++++++++++++++++++++++ Master Ipd- wound Status ++++++++++++++++++++++++++++++
export async function woundStatusSaveWoundStatus({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'woundStatus/editWoundStatus',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'woundStatus/saveWoundStatus',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
export async function fetchWoundStatus({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'woundStatus/fetchWoundStatus', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.name }));
}

//+++++++++++++++++++++++++++ Master Ipd- wound periwound +++++++++++++++++++++++++++++++

export async function periwoundSkinTypeSavePeriwoundSkinType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'periwoundSkinType/editPeriwoundSkinType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'periwoundSkinType/savePeriwoundSkinType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fetchPeriWoundSkinType({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'periwoundSkinType/fetchPeriwoundSkinType',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.typeName }));
}

//+++++++++++++++++++++++ Master Ipd- dischargeNote  +++++++++++++++++++++++++++++++++++++

export async function dischargeNoteSaveDischargeNote({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'dischargeNote/editDischargeNote',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'dischargeNote/saveDischargeNote',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function dischargeNoteFetchDischargeNote({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'dischargeNote/fetchDischargeNote',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.dischargeReason }));
}

//+++++++++++++++++++++++++++ Master Ipd- bed type++++++++++++++++++++++++++++++++

export async function bedTypeSaveBedType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'bedType/editBedType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'bedType/saveBedType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function bedTypeFetchBedType({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'bedType/fetchBedType', {
    signal,
  });
  return data;
}

//+++++++++++++++++++++++++++ Master External Therapy++++++++++++++++++++++++++++++++++

export async function externalTherapySaveExternalTherapy({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'externalTherapy/editExternalTherapy',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'externalTherapy/saveExternalTherapy',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function externalTherapyFetchExternalTherapyByOrgId({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'externalTherapy/fetchExternalTherapyByOrgId',
    {
      signal,
    }
  );
  return data;
}

//+++++++++++++++++ Therapy Details ++++++++++++++++++++++++
export async function therapyDetailsSaveTherapyDetails({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'therapyDetails/editTherapyDetails',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'therapyDetails/saveTherapyDetails',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function therapyDetailsFetchTherapyDetailsByOrgId({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'therapyDetails/fetchTherapyDetailsByOrgId',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.name }));
}

//+++++++++++++++++ Bed Mapping ++++++++++++++++++++++++++++++++++++++

export async function wardFetchWardByBuildingId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + `ward/fetchWardByBuildingId/${queryKey[1]}`,
    {
      signal,
    }
  );
  return data.map((el) => ({
    ...el,
    label: el.wardTypeName,
  }));
}

export async function bedTypeFetchBedTypeByOrgId({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'bedType/fetchBedTypeByOrgId', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.bedType }));
}

export async function bedSaveMultipleBed({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'bed/saveMultipleBed',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'bed/saveMultipleBed',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function bedFetchAllBedByOrgId({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'bed/fetchAllBedByOrgId', {
    signal,
  });

  return data;
}

export async function bedGetBedStatusByStatusId({ signal }) {
  const { data } = await axiosInstance(hmis_ipd_master_services + 'bed/getBedStatusByStatusId', {
    signal,
  });

  return data.map((el) => ({
    ...el,
    label: el.statusName,
  }));
}

//+++++++++++++++++ Package Details ++++++++++++++++++++++++++++++++++++++++++

export async function durationTypeGetAlldurationTypes({ signal }) {
  const { data } = await axiosInstance(hmis_master_services + 'durationType/getAlldurationTypes', {
    signal,
  });
  return data.map((el) => ({
    ...el,
    label: el.durationType,
  }));
}

export async function packageDetailsSavePackageDetails({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_ipd_master_services + 'packageDetails/editPackageDetails',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_ipd_master_services + 'packageDetails/savePackageDetails',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fetchPackageDetailsByOrgId({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'packageDetails/fetchPackageDetailsByOrgId',
    {
      signal,
    }
  );
  return data;
}

export async function therapyDetailsFetchTherapyDetails({ signal }) {
  const { data } = await axiosInstance(
    hmis_ipd_master_services + 'therapyDetails/fetchTherapyDetails',
    {
      signal,
    }
  );
  return data.map((el) => ({
    ...el,
    label: el.name,
  }));
}
