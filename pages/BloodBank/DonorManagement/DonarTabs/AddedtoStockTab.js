/** @format */

import { useQuery } from '@tanstack/react-query';
import { getAllIndividualDonorList } from 'pages/api/bloodbank';
import { getAllCampDonorList } from 'pages/api/bloodbank';
import DonorTable from './DonorTable';

export default function AddedtoStockTab({ campId }) {

  const queryKey = (campId && campId.length > 0) ? ['getAllCampDonorList', campId] : ['getAllIndividualDonorList'];
  const queryFn = (campId && campId.length > 0) ? getAllCampDonorList : getAllIndividualDonorList;

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: true
  });


  return (
    <>
      <DonorTable
        isLoading={isLoading}
        data={data}
      />
    </>
  );
}
