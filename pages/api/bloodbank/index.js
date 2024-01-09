import axiosInstance from 'utils/axios';
import { hmis_bloodbank_services } from '../urls';

export async function DonorRegistrationSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    //   const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
    //     signal,
    //   });
    //   return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'DonorRegistration/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}
export async function CampRegistrationSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    //   const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
    //     signal,
    //   });
    //   return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'CampRegistration/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}


export async function BloodScreeningGroupingSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    //   const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
    //     signal,
    //   });
    //   return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'BloodScreeningGrouping/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function BloodCrossmatchingSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    //   const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
    //     signal,
    //   });
    //   return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'BloodCrossMatching/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function BloodLabtestScreeningSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    //   const { data } = await axiosInstance.put(hmis_lab_master_services + 'labTest/edit', req, {
    //     signal,
    //   });
    //   return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'BloodLabTestScreeing/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function getAllregList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + 'DonorRegistration/getAll', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.donorName }));
}

export async function physicalExaminationDetailSave({ signal, req, isEditMode }) {
  if (isEditMode) {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'PhysicalExamination/save',
      req,
      {
        signal,
      }
    );
    return data;
  } else {
    const { data } = await axiosInstance.post(
      hmis_bloodbank_services + 'PhysicalExamination/save',
      req,
      {
        signal,
      }
    );
    return data;
  }
}

export async function getOTAllbloodregList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + 'OTBloodRequest/getAll', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.procedureName }));
}


export async function getAllIndividualDonorList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + `DonorRegistration/getAllDonors/${'Individual'}`, req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.donorName }));
}
export async function getAllCampDonorList({ signal, req, queryKey }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + `DonorRegistration/getAllDonors/${queryKey[1]}`, req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.donorName }));
}
export async function getAllCampList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + 'CampRegistration/getAll', req, {
    signal,
  });
  return data.map((item) => ({ ...item }));
}

export async function getAllById({ queryKey, signal }) {
  const { data } = await axiosInstance(
    hmis_bloodbank_services + `DonorRegistration/getById/${queryKey[1]}`,
    {
      signal,
    }
  );
  return data;
}


export async function getAllbloodstageList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + 'DonorRegistration/getFetchStage', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.donorName }));
}

export async function getAllbloodInLabTestingList({ signal, req }) {
  const { data } = await axiosInstance(hmis_bloodbank_services + 'DonorRegistration/getFetchStageInLabTesting', req, {
    signal,
  });
  return data.map((item) => ({ ...item, label: item.donorName }));
}


export async function donorRegistrationStageUpdate({ queryKey, signal }) {
  const { data } = await axiosInstance(
    // hmis_bloodbank_services + `DonorRegistration/getById/${queryKey[1]}`,
    hmis_bloodbank_services + `DonorRegistration/updateStageNew/${queryKey[1]}`,
    {
      signal,
    }
  );
  return data;
}
