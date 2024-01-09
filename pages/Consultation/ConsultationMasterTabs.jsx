import { lazy } from 'react';
import BasicTabs from 'components/Tabs';

import ObserVationTab from './ObserVation';
import { Loadable } from 'utils/retry';
import DiagnosisTab from './Diagnosis/DiagnosisTab';

const LabOrder = Loadable(lazy(() => import('./Orders')));

const TABLIST = [
  { label: 'Observations', component: <ObserVationTab /> },
  { label: 'Diagnosis', component: <DiagnosisTab /> },

  { label: 'Orders', component: <LabOrder /> },

  { label: 'Diagnosis', component: 2 },
  { label: 'Diagnosis', component: 2 },
  { label: 'Diagnosis', component: 2 },
];
export default function ConsultationMasterTabs() {
  return <BasicTabs tabList={TABLIST} />;
}
