/** @format */

import axiosInstance from 'utils/axios';
import { hmis_opd_services } from '../urls';
// import { hmis_master_services } from '../urls';

export async function consultationSaveConsultation(req) {
  console.log(req);
  const { data } = await axiosInstance.post(
    hmis_opd_services + 'consultation/saveConsultation',
    req
  );

  return data;
}
