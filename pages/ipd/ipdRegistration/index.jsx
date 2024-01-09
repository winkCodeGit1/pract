import DialogBox from 'components/DialogBox';
import BasicTabs from 'components/Tabs';
import EmergencyRegistration from './EmergencyRegistration';
import AppointmentForm from 'pages/opd-ipd-registration/Forms/AppointmentForm';

const TABLIST = [
  { label: 'Emergency Registration', component: <EmergencyRegistration /> },
  { label: 'Other Registration', component: <AppointmentForm /> },
];

export default function IPDRegistration({ onClose }) {
  return (
    <DialogBox open onClose={onClose} title='IPD Registration' fullScreen>
      <BasicTabs tabList={TABLIST} />
    </DialogBox>
  );
}
