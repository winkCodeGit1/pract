import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Table from 'components/table';
import { useState } from 'react';
import ConcomitantMedicationAdd from './concomitantMedicationAdd';
import { IconButton } from '@mui/material';

const path = 'nursing-care-Concomitan-chart-record';

export default function ConcomitantMedication() {
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState();


    const columnsDef = [
        {
            header: 'Medicine Name',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Quantity',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'UoM',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Frequency',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Remarks',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Actions',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Start Date',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Last Date',
            accessorKey: 'nursingCareGiven',
        },
        {
            header: 'Staff Nurse',
            accessorKey: 'staffName',
        },
        // {
        //     header: 'Status',
        //     accessorKey: 'status',
        //     Cell: ({ row }) => (
        //         <Label sx={{ minWidth: 120 }} variant={'ghost'} color={row.original.status}>
        //             {row.original.status.label}
        //         </Label>
        //     ),
        // },
    ];


    return (
        <>
            {openAdd && (
                <ConcomitantMedicationAdd
                    selectedRow={selectedRow}
                    onClose={() => {
                        setOpenAdd(false);
                        setSelectedRow();
                    }}
                />
            )}
            <Table
                title={path}
                columns={columnsDef}
                // loading={}
                data={[]}
                enableStickyHeader
                enableColumnResizing
                rowNumberMode='original'
                enableRowNumbers
                enableRowVirtualization
                enableRowActions
                renderTopToolbarCustomActions={() => (
                    <Button
                        endIcon={<Add />}
                        color='primary'
                        onClick={() => setOpenAdd((ps) => !ps)}
                        variant='contained'
                    >
                        Add
                    </Button>
                )}
                renderRowActions={({ row }) => (
                    <IconButton
                        onClick={() => {
                            setOpenAdd(true);
                            setSelectedRow(row);
                        }}
                    >
                        <Edit />
                    </IconButton>
                )}
            />

        </>
    );
}
