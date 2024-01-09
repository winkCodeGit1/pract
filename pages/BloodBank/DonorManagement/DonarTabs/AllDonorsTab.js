/** @format */

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllIndividualDonorList } from 'pages/api/bloodbank';
import { getAllCampDonorList } from 'pages/api/bloodbank';
import DonorTable from './DonorTable';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import IndividualDonorForm from '../IndividualDonors/Forms/IndividualDonorForm';
import BarcodeViewer from '../IndividualDonors/Forms/BarcodeViewer';

export default function AllDonorsTab({ campId }) {
  const [openAdd, setAddOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [response, setResponse] = useState('');

  const queryKey = (campId && campId.length > 0) ? ['getAllCampDonorList', campId] : ['getAllIndividualDonorList'];
  const queryFn = (campId && campId.length > 0) ? getAllCampDonorList : getAllIndividualDonorList;

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
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

  const getFormResponse = (data) => {
    setResponse(data);
    setOpenView(true);
  };

  return (
    <>
      {openView && (
        <BarcodeViewer
          data={response}
          onClose={() => {
            setOpenView(false);
          }}
        />
      )}
      {openAdd && (
        <IndividualDonorForm
          campId={campId}
          onClose={() => {
            setAddOpen(false);
          }}
          getFormResponse={getFormResponse}
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
