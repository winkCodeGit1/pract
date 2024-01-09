import axiosInstance from 'utils/axios';
import { hmis_lab_master_services } from '../urls';

export async function labTestAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labTest/all', signal);

  return data;
}
export async function labTestGetBySampleId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labTest/getBySampleId/' + queryKey[1],
    signal
  );

  return data;
}
export async function labTestById(id) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labTest/' + id);

  return data;
}
export async function labTestSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_lab_master_services + 'labTest/save', req, {
      signal,
    });
    return data;
  }
}

export async function labSampleTypeAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labSampleType/all', signal);

  return data;
}

export async function labSampleTypeSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'labSampleType/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_lab_master_services + 'labSampleType/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function labAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'lab/all', signal);

  return data;
}

export async function labSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'lab/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_lab_master_services + 'lab/save', req, {
      signal,
    });
    return data;
  }
}

export async function labTestMethodAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labTestMethod/all', signal);

  return data.map((el) => ({ ...el, label: el.methodName }));
}

export async function labTestMethodSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTestMethod/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_lab_master_services + 'labTestMethod/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function labTestUnitAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labTestUnit/all', signal);

  return data;
}

export async function labTestUnitSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTestUnit/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_lab_master_services + 'labTestUnit/save', req, {
      signal,
    });
    return data;
  }
}

export async function labSpecimenContainerAll({ signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labSpecimenContainer/all',
    signal
  );

  return data;
}

export async function labSpecimenContainerSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(
      hmis_lab_master_services + 'labSpecimenContainer/edit',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_lab_master_services + 'labSpecimenContainer/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function labGroupTestAll({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labGroupTest/all', signal);

  return data;
}
export async function labGroupTestById(id) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labGroupTest/' + id);

  return data;
}

export async function labGroupTestSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.put(hmis_lab_master_services + 'labGroupTest/edit', req, {
      signal,
    });
    return data;
  } else {
    const { data } = await axiosInstance.post(hmis_lab_master_services + 'labGroupTest/save', req, {
      signal,
    });
    return data;
  }
}

export async function labTestGetAllTests({ signal }) {
  const { data } = await axiosInstance(hmis_lab_master_services + 'labTest/getAllTests', {
    signal,
  });
  return data;
}
export async function labOrderGetBacklogLabOrderDetail({ queryKey, signal }) {
  if (queryKey[1] === 'today') {
    const { data } = await axiosInstance(hmis_lab_master_services + 'labOrder/getLabOrderDetail', {
      signal,
    });
    return data;
  } else if (queryKey[1] === 'backlog') {
    const { data } = await axiosInstance(
      hmis_lab_master_services + 'labOrder/getBacklogLabOrderDetail',
      {
        signal,
      }
    );
    return data;
  }
  return [];
}
export async function labOrderGetSampleByConsultationId({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labOrder/getSampleByConsultationId/' + queryKey[1],
    {
      signal,
    }
  );
  return data;
}
export async function labSampleCollect({ signal, req }) {
  const { data } = await axiosInstance.post(
    hmis_lab_master_services + 'labSampleCollect/save',
    req,
    {
      signal,
    }
  );
  return data;
}

export async function collectedLabOrderAllDetail({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labOrder/getCollectedLabOrderDetail/' + queryKey[1],
    {
      signal,
    }
  );
  return data;
}
export async function labTestResultPrintById({ signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labTestResult/printById/' + 120,
    { signal }
  );
  return data;
}
export async function labSampleCollectCollectedSample({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_lab_master_services + 'labSampleCollect/collectedSample/' + queryKey[1],
    { signal }
  );
  return data;
}
export async function labTestResultSave({ signal, req }) {
  const { data } = await axiosInstance.post(hmis_lab_master_services + 'labTestResult/save', req, {
    signal,
  });
  return data;
}
