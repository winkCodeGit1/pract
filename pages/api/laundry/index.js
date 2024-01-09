import axiosInstance from 'utils/axios';
import { hmis_laundry_services } from '../urls';

export async function LocationDeptGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'LocationDeptMapping/getAllDepartments',
    {
      signal,
    }
  );

  return data.map((el) => ({ ...el, label: el.departName }));
}

//+++++++++++++++++++++++++++ Laundry - Linen Process  ++++++++++++++++++++++

export async function linenProcessGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'linenProcess/getAllLinenProcesses',
    {
      signal,
    }
  );

  return data.map((el) => ({ ...el, label: el.processName }));
}

export async function LinenProcessSaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'linenProcess/editLinenProcess',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'linenProcess/saveLinenProcess',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Laundry - Linen Laundry Item  ++++++++++++++++++++++
export async function laundryItemCategoryGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'laundryItemCategory/getAllLaundryItemCategories',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.categoryName }));
}

export async function laundryItemCategorySaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'laundryItemCategory/editlaundryItemCategory',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'laundryItemCategory/savelaundryItemCategory',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
//+++++++++++++++++++++++++++ Laundry - Linen Category  ++++++++++++++++++++++
export async function laundryItemGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_laundry_services + 'laundryItem/getAllLaundryItems', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.itemName }));
}

export async function laundryItemSaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'laundryItem/editlaundryItem',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'laundryItem/savelaundryItem',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
//+++++++++++++++++++++++++++ Laundry - Linen Supply  ++++++++++++++++++++++
export async function linenSupplyGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_laundry_services + 'linenSupply/getAllLinenSupply', {
    signal,
  });
  return data.map((el) => ({
    ...el,
    supplyDate: el.supplyDate.split(', ').slice(0, 2).join(', '),
  }));
}

export async function linenSupplySave(req) {
  const { data } = await axiosInstance.post(
    hmis_laundry_services + 'linenSupply/savelinenSupply',
    req
  );
  return data;
}

export async function getLinenOrderDetailsById({ queryKey, signal }) {
  console.log(queryKey, '--queryKey');
  const { data } = await axiosInstance(
    `${hmis_laundry_services}linenOrderDetails/getLinenOrderDetailsById/${queryKey[1]}`,
    { signal }
  );

  return data;
}
//+++++++++++++++++++++++++++ Laundry - Linen Receipt Details  ++++++++++++++++++++++
export async function linenReceiptDetailsGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'linenReceiptDetails/getAllLinenReceiptDetails',
    {
      signal,
    }
  );
  return data;
}

export async function linenReceiptDetailsSave({ signal, req }) {
  const { data } = await axiosInstance.put(
    hmis_laundry_services + 'linenReceiptDetails/saveLinenReceiptDetails',
    req,
    {
      signal,
    }
  );
  return data;
}

//+++++++++++++++++++++++++++ Laundry - Linen Receipt  ++++++++++++++++++++++
export async function linenReceiptGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_laundry_services + 'linenReceipt/getAllLinenReceipts', {
    signal,
  });
  return data;
}
export async function linenReceiptSave({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_laundry_services + 'linenReceipt/saveLinenReceipt',
    req,
    {
      signal,
    }
  );
  return data;
}

//+++++++++++++++++++++++++++ Laundry - Linen Order Details  ++++++++++++++++++++++
export async function linenOrderDetailsGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'linenOrderDetails/getAllLinenOrderDetails',
    {
      signal,
    }
  );
  return data;
}
export async function linenOrderDetailsSave({ signal, req }) {
  const { data } = await axiosInstance.put(
    hmis_laundry_services + 'linenOrderDetails/saveLinenOrderDetails',
    req,
    {
      signal,
    }
  );
  return data;
}
//+++++++++++++++++++++++++++ Laundry - Linen Order  ++++++++++++++++++++++
export async function linenOrderGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_laundry_services + 'linenOrder/getAllLinenOrders', {
    signal,
  });
  return data.map((el) => ({ ...el, orderDate: el.orderDate.split(', ').slice(0, 2).join(', ') }));
}
export async function linenOrderSave(req) {
  const { data } = await axiosInstance.post(
    hmis_laundry_services + 'linenOrder/saveLinenOrder',
    req
  );
  return data;
}
export async function linenOrderById({ queryKey, signal }) {
  const { data } = await axiosInstance(
    `${hmis_laundry_services}linenOrder/getLinenOrderById/${queryKey[1]}`,
    { signal }
  );

  return data?.linenOrderDetailsDtos?.map((el) => ({
    id: el.id,
    LinenItemCode: el.linenItemId,
    Qty: el.orderQty,
    Processed: el.linenProcessId,
  }));
}

//+++++++++++++++++++++++++++ Laundry - Linen Item Utilization  ++++++++++++++++++++++
export async function laundryItemUtilizationGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'laundryItemUtilization/getAllLaundryItemsUtilization',
    {
      signal,
    }
  );
  return data?.map((el) => ({
    ...el,
    consumptionDate: el.consumptionDate.split(', ').slice(0, 2).join(', '),
  }));
}
export async function laundryItemUtilizationSave({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_laundry_services + 'laundryItemUtilization/saveLaundryItemUtilization',
    req,
    {
      signal,
    }
  );
  return data;
}
//+++++++++++++++++++++++++++ Laundry - Linen Equipment  ++++++++++++++++++++++

export async function equipmentGetAll({ signal }) {
  const { data } = await axiosInstance(hmis_laundry_services + 'equipment/getAllEquipment', {
    signal,
  });
  return data.map((el) => ({ ...el, label: el.machineName }));
}
export async function equipmentSaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'equipment/editEquipment',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'equipment/saveEquipment',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Laundry - Linen washing-dry-cleaning-controller  ++++++++++++++++++++++
export async function washingDryCleaningLinenGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'washingDryCleaningLinen/getAllWashingDryCleaningLinen',
    {
      signal,
    }
  );
  return data;
}
export async function washingDryCleaningLinenSave({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_laundry_services + 'washingDryCleaningLinen/saveWashingDryCleaningLinen',
    req,
    {
      signal,
    }
  );
  return data;
}

//+++++++++++++++++++++++++++ Laundry - Linen Location  ++++++++++++++++++++++

export async function locationMasterGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'locationMaster/getAllLocationMaster',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.locationName }));
}
export async function locationMasterSaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'locationMaster/editLocationMaster',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'locationMaster/saveLocationMaster',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

//+++++++++++++++++++++++++++ Laundry - Linen Location department mapping  ++++++++++++++++++++++
export async function LocationDeptMappingGetAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_laundry_services + 'LocationDeptMapping/getAllLocationDeptMapping',
    {
      signal,
    }
  );
  return data.map((el) => ({ ...el, label: el.locationName }));
}
export async function LocationDeptMappingSaveData({ signal, req, row }) {
  if (row) {
    const { data } = await axiosInstance.put(
      hmis_laundry_services + 'LocationDeptMapping/editLocationDeptMapping',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_laundry_services + 'LocationDeptMapping/saveLocationDeptMapping',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
