/** @format */

// import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getOTAllbloodregList } from 'pages/api/bloodbank';
// import AddBloodDonorForm from '../Forms/AddBloodDonorForm';
import BloodRequestTable from './BloodRequestTable';
// import { Button } from '@mui/material';
// import { Add } from '@mui/icons-material';


export default function AllRequestsTab() {

  // const [openAdd, setAddOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getOTAllbloodregList'],
    queryFn: getOTAllbloodregList,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true
  });

  // const AddDonorButton = () => {
  //   return (
  //     <div style={{ display: 'flex', gap: '0.5rem' }}>
  //       <Button
  //         endIcon={<Add />}
  //         color='primary'
  //         onClick={() => setAddOpen((ps) => !ps)}
  //         variant='contained'
  //       >
  //         Add Donor...
  //       </Button>
  //     </div>
  //   );
  // };

  return (
    <>
      {/* {openAdd && (
        <AddBloodDonorForm
          onClose={() => {
            setAddOpen(false);
          }}
        />
      )} */}
      <BloodRequestTable
        isLoading={isLoading}
        data={data}
      // AddDonorButton={AddDonorButton}
      />
    </>
  );
}
