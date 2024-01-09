/** @format */

import { useQuery } from '@tanstack/react-query';
import { getAllIndividualDonorList } from 'pages/api/bloodbank';
import BloodInventoryTable from './BloodInventoryTable';

export default function RedCellsTab({title}) {

    const { data, isLoading } = useQuery({
        queryKey: ['getAllIndividualDonorList'],
        queryFn: getAllIndividualDonorList,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: true
    });

    return (
        <>
            <BloodInventoryTable
                title={title}
                isLoading={isLoading}
                data={data}
            />
        </>
    );
}
