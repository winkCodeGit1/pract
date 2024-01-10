import { Button, Grid } from '@mui/material';
import Table from 'components/table';
import FormWrapper from 'components/FormWrapper';
import AddMedication from './AddMedication';

export default function Medication() {
  const [open, setOpen] = React.useState(false);
  const columnsDef = [
    {
      header: 'Medication Frequency Name',
      accessorKey: 'id',
    },
    {
      header: 'Short Name',
      accessorKey: 'shortname',
      id: 'shortname',
    },
    {
      header: 'No Of Times',
      accessorKey: 'noOfTimes',
      id: '',
    },
  ];
}
