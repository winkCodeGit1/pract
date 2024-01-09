/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllregList } from 'pages/api/bloodbank';
import AddBloodDonorForm from '../Forms/AddBloodDonorForm';
import DonorTable from './DonorTable';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
export default function AllDonorsTab() {

  const [openAdd, setAddOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getAllregList'],
    queryFn: getAllregList,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true
  });

  const AddDonorButton = () => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          endIcon={<Add />}
          color='primary'
          onClick={() => setAddOpen((ps) => !ps)}
          variant='contained'
        >
          Add Donor
        </Button>
      </div>
    );
  };

  return (
    <>
      {openAdd && (
        <AddBloodDonorForm
          onClose={() => {
            setAddOpen(false);
          }}
        />
      )}
      <DonorTable
        isLoading={isLoading}
        data={data}
        AddDonorButton={AddDonorButton}
      />
    </>
  );
}
