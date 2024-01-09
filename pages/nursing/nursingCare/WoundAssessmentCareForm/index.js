import { Add, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
// import Label from 'components/Label';
import Table from 'components/table';
import { useState } from 'react';
import WoundAssessmentCareFormAdd from './WoundAssessmentCareFormAdd';

const path = 'nursing-Wound-Assessment-CareForm-sheet';

export default function WoundAssessmentCareForm() {
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState();

    const columnsDef = [
        {
            header: 'Length',
            accessorKey: 'dateTime',
        },
        {
            header: 'Wound Area',
            accessorKey: 'nursingCareGiven',
        },

        {
            header: 'Pain',
            accessorKey: 'staffName',
        },
        {
            header: 'Breadth',
            accessorKey: 'staffName',
        },
        {
            header: 'Wound Edge',
            accessorKey: 'staffName',
        },
        {
            header: 'Edema',
            accessorKey: 'staffName',
        },
        {
            header: 'Depth',
            accessorKey: 'staffName',
        },
        {
            header: 'Wound Status',
            accessorKey: 'staffName',
        },
        {
            header: 'Drainage Intensity',
            accessorKey: 'staffName',
        },
        {
            header: 'Wound Type',
            accessorKey: 'staffName',
        },
        {
            header: 'Wound Odour',
            accessorKey: 'staffName',
        },
        {
            header: 'Periwound Skin',
            accessorKey: 'staffName',
        },
        {
            header: 'Wound Bed',
            accessorKey: 'staffName',
        },
        {
            header: 'Drainage Type',
            accessorKey: 'staffName',
        },
        {
            header: 'Staff Name',
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
                <WoundAssessmentCareFormAdd
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
