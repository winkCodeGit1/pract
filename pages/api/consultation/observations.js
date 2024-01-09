/** @format */

import axiosInstance from 'utils/axios';
import { hmis_opd_services } from '../urls';

export async function hypertensionProgressSaveHypertensionProgress(req) {
  console.log(req);
  const { data } = await axiosInstance.post(
    hmis_opd_services + 'hypertensionProgress/saveHypertensionProgress',
    req
  );

  return data;
}

export async function fetchPerSpeculumCervixData({ signal }) {
  const { data } = await axiosInstance.get(
    hmis_opd_services + 'perSpeculumCervix/getActivePerSpeculumCervix',

    signal
  );
  return data;
}

export async function saveGynaecology({ signal, req }) {
  console.log(req);
  const { data } = await axiosInstance.post(
    hmis_opd_services + 'gynaecology/saveGynaecology',
    req,
    {
      signal,
    }
  );
  return data;
}
