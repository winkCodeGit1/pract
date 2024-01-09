import axiosInstance from 'utils/axios';
import { hmis_transport_master_service, hmis_transport_service } from '../urls';

// key same as function name

//+++++++++++++++++++++++++++ Transport - Fuel service ++++++++++++++++++++++++++++++++++++++++++
export async function fuelTypeSaveFuelType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_transport_master_service + 'fuelType/editFuelType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_master_service + 'fuelType/saveFuelType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function fuelTypeGetAllFuelType({ signal }) {
  const { data } = await axiosInstance(hmis_transport_master_service + 'fuelType/getAllFuelType', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.type }));
}

//+++++++++++++++++++++++++++ Transport - Vehicle +++++++++++++++++++++++++++++++++++++++++++++++++

export async function vehClassSaveVehClass({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_transport_master_service + 'vehClass/editVehClass',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_master_service + 'vehClass/saveVehClass',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function vehClassGetAllVehClass({ signal }) {
  const { data } = await axiosInstance(hmis_transport_master_service + 'vehClass/getAllVehClass', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.className }));
}

//+++++++++++++++++++++++++++ Transport-BatterType ++++++++++++++++++++++++++++++
export async function saveBatteryType({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_transport_master_service + 'batteryType/editBatteryType',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_master_service + 'batteryType/saveBatteryType',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
export async function getBatteryType({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'batteryType/getBatteryType',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.name }));
}

//+++++++++++++++++++++++++++ Transport-VehicleTransport  ++++++++++++++++++++++++++++++

export async function vehicleMasterSaveVehicleMaster({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_transport_master_service + 'vehicleMaster/editVehicleMaster',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_master_service + 'vehicleMaster/saveVehicleMaster',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function vehicleMasterGetAllVehicleMasterByOrgId({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'vehicleMaster/getAllVehicleMasterByOrgId',
    {
      signal,
    }
  );

  const mappedData = data?.map((e) => ({
    ...e,
    yearOfManufacture: e.yearOfManufacture?.split(', ').slice(0, 2).join(', ') ?? 'null',
  }));
  return mappedData;
}

export async function fuelTypeGetAllActiveFuelType({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'fuelType/getAllActiveFuelType',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.type }));
}

export async function vehClassGetAllActiveVehClass({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'vehClass/getAllActiveVehClass',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.className }));
}

export async function batteryTypeGetAlActiveBatteryType({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'batteryType/getAlActiveBatteryType',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.type }));
}

//+++++++++++++++++++++++++++ Transport-insurance   ++++++++++++++++++++++++++++++
export async function insuranceFileSaveInsuranceFile({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'insuranceFile/editInsuranceFile',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'insuranceFile/saveInsuranceFile',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function insuranceFileGetAllInsuranceFile({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'insuranceFile/getAllInsuranceFile',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    dateOfInsurance: e.dateOfInsurance.split(', ').slice(0, 2).join(', '),
  }));
}

export async function vehicleMasterGetAllActiveRegistrationNum({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'vehicleMaster/getAllActiveRegistrationNum',
    {
      signal,
    }
  );
  console.log(data, '----data');
  return data.map((el) => ({ ...el, label: el.registrationName }));
}

//+++++++++++++++++++++++++++ Transport Vehicle Registration   ++++++++++++++++++++++++++++++
export async function vehicleRegistrationSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'vehicleRegistration/editVehicleRegistration',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'vehicleRegistration/saveVehicleRegistration',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function vehicleRegistrationGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'vehicleRegistration/getAllVehicleRegistration',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    registrationDate: e.registrationDate.split(', ').slice(0, 2).join(', '),
    registrationValidUpto: e.registrationValidUpto.split(', ').slice(0, 2).join(', '),
  }));
}

//+++++++++++++++++++++++++++ Transport-RTO File   ++++++++++++++++++++++++++++++++

export async function rtoFileGetAllRtoFile({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'rtoFile/getAllRtoFile', {
    signal,
  });

  return data.map((e) => ({
    ...e,
    passedOnDate: e.passedOnDate?.split(', ').slice(0, 2).join(', '),
    validUpto: e.validUpto?.split(',').slice(0, 2).join(','),
  }));
}

export async function rtoFileSaveRtoFile({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_transport_service + 'rtoFile/editRtoFile', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_transport_service + 'rtoFile/saveRtoFile', req, {
      signal,
    });
    return data;
  }
}
//+++++++++++++++++++++++++++ Transport Vehicle availability   ++++++++++++++++++++++++++++++
export async function vehicleAvailabilityGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'vehicleAvailability/getAllVehicleAvailability',
    {
      signal,
    }
  );

  return data;
}

export async function vehicleCategoryGetAllList({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_master_service + 'vehicleCategory/getAllVehCategory',
    {
      signal,
    }
  );
  console.log(data, '----data');
  return data.map((el) => ({ ...el, label: el.category }));
}

export async function vehicleAvailabilitySave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'vehicleAvailability/editVehicleAvailability',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'vehicleAvailability/saveVehicleAvailability',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport Pollution File   ++++++++++++++++++++++++++++++

export async function pollutionFileGetAllPollutionFile({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'pollutionFile/getAllPollutionFile',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    checkedOn: e.checkedOn.split(',').slice(0, 2).join(', '),
    validUpto: e.validUpto.split(',').slice(0, 2).join(','),
  }));
}

export async function pollutionFileSavePollutionFile({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'pollutionFile/editPollutionFile',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'pollutionFile/savePollutionFile',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport Tyres   ++++++++++++++++++++++++++++++

export async function tyresGetAllTyres({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'tyres/getAllTyres', {
    signal,
  });

  return data.map((e) => ({
    ...e,
    dateOfIssue: e.dateOfIssue.split(', ').slice(0, 2).join(', '),
    dateOfReplacement: e.dateOfReplacement.split(',').slice(0, 2).join(','),
  }));
}

export async function tyresSaveTyres({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_transport_service + 'tyres/editTyres', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_transport_service + 'tyres/saveTyres', req, {
      signal,
    });
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport Damage   ++++++++++++++++++++++++++++++

export async function damageGetAllDamage({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'damage/getAllDamage', {
    signal,
  });

  return data;
}

export async function damageSaveDamage({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_transport_service + 'damage/editDamage', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_transport_service + 'damage/saveDamage', req, {
      signal,
    });
    return data;
  }
}
//+++++++++++++++++++++++++++ Transport - Vehicle Accessories   ++++++++++++++++++++++++++++++

export async function vehicleAccessoriesGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'accessories/getAllAccessories', {
    signal,
  });

  return data.map((el) => ({ ...el, dateOfChange: el.dateOfChange.split(',').slice(0, 2).join() }));
}

export async function vehicleAccessoriesDataSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'accessories/editAccessories',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'accessories/saveAccessories',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
//+++++++++++++++++++++++++++ Transport Battery ++++++++++++++++++++++++++++++
export async function batteryGetAllBattery({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'battery/getAllBattery', {
    signal,
  });

  return data.map((e) => ({
    ...e,
    dateOfChangeRecharge: e.dateOfChangeRecharge?.split(', ').slice(0, 2).join(', '),
  }));
}

export async function batterySaveBattery({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_transport_service + 'battery/editBattery', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_transport_service + 'battery/saveBattery', req, {
      signal,
    });
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport Major Change  ++++++++++++++++++++++++++++++

export async function majorChangeGetAllMajorChange({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'majorChange/getAllMajorChange', {
    signal,
  });

  return data.map((e) => ({
    ...e,
    dateWorkshopIn: e.dateWorkshopIn?.split(', ').slice(0, 2).join(', '),
    dateWorkshopOut: e.dateWorkshopOut?.split(',').slice(0, 2).join(','),
  }));
}

export async function majorChangeSaveMajorChange({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'majorChange/editMajorChange',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'majorChange/saveMajorChange',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport attached-fixed ++++++++++++++++++++++++++++++

export async function AttachedOrFixedVehicleGetAllAttachedorFixedVehicle({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'AttachedOrFixedVehicle/getAllAttachedorFixedVehicle',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    dateOfAttachment: e.dateOfAttachment.split(', ').slice(0, 2).join(', '),
    attachedUpto: e.attachedUpto.split(',').slice(0, 2).join(','),
  }));
}

export async function AttachedOrFixedVehicleSaveAttachedorFixedVehicle({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'AttachedOrFixedVehicle/editAttachedorFixedVehicle',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'AttachedOrFixedVehicle/saveAttachedorFixedVehicle',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
//+++++++++++++++++++++++++++ Transport Vehicle Oil   ++++++++++++++++++++++++++++++
export async function oilGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'oil/getAllOil', {
    signal,
  });

  return data.map((el) => ({
    ...el,
    dateOfChangeOrFilling: el.dateOfChangeOrFilling?.split(', ').slice(0, 2).join(', '),
  }));
}
export async function oilSave({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(hmis_transport_service + 'oil/editOil', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_transport_service + 'oil/saveOil', req, {
      signal,
    });
    return data;
  }
}
//+++++++++++++++++++++++++++ Transport vehicle log-book ++++++++++++++++++++++++++++++

export async function vehicleLogBookGetAllVehicleLogBook({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'vehicleLogBook/getAllVehicleLogBook',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    fromDateTime: e.fromDateTime.split(', ').slice(0, 2).join(', '),
    toDateTime: e.toDateTime.split(',').slice(0, 2).join(','),
  }));
}

export async function vehicleLogBookSaveVehicleLogBook({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'vehicleLogBook/editVehicleLogBook',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'vehicleLogBook/saveVehicleLogBook',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport vehicle -request ++++++++++++++++++++++++++++++

export async function vehicleRequestGetAllVehicleRequest({ signal }) {
  const { data } = await axiosInstance(
    hmis_transport_service + 'vehicleRequest/getAllVehicleRequest',
    {
      signal,
    }
  );

  return data.map((e) => ({
    ...e,
    dateOfRequest: e.dateOfRequest?.split(', ').slice(0, 2).join(', '),
    demandForDatetime: e.demandForDatetime?.split(',').slice(0, 2).join(','),
  }));
}

export async function vehicleRequestSaveVehicleRequest({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'vehicleRequest/editVehicleRequest',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'vehicleRequest/saveVehicleRequest',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Transport work-order ++++++++++++++++++++++++++++++

export async function workOrderGetAllWorkOrder({ signal }) {
  const { data } = await axiosInstance(hmis_transport_service + 'workOrder/getAllWorkOrder', {
    signal,
  });

  return data.map((e) => ({
    ...e,
    dateWorkshopIn: e.dateWorkshopIn.split(', ').slice(0, 2).join(', '),
    dateWorkshopOut: e.dateWorkshopOut.split(',').slice(0, 2).join(','),
  }));
}

export async function workOrderSaveWorkOrder({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_transport_service + 'workOrder/editWorkOrder',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_transport_service + 'workOrder/saveWorkOrder',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
