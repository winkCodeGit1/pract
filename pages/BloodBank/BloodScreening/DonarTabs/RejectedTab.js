/** @format */

import { useQuery } from '@tanstack/react-query';
import { getAllregList } from 'pages/api/bloodbank';
import DonorTable from './DonorTable';
export default function RejectedTab() {

  const { data, isLoading } = useQuery({
    queryKey: ['getAllregList'],
    queryFn: getAllregList,
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
