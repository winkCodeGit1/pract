/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';
import { allSanitationManpower } from 'pages/api/master';
import Label from 'components/Label';
import AddManpower from './AddManPower';

export default function Manpower({ path }) {
    const theme = useTheme();
    const [openManpower, setOpenManpower] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const columnsDef = [
        {
            header: 'Staff Name',
            accessorKey: 'staffName',
        },
        {
            header: 'Building Name',
            accessorKey: 'buildingName',
        },
        {
            header: 'Floor Name',
            accessorKey: 'floorName',
        },
        {
            header: 'Status',
            accessorKey: 'active',

            Cell: ({ row }) => (
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(row.original.active && 'success') || 'error'}
                >
                    {row.original.active ? 'Active' : 'Inactive'}
                </Label>
            ),
        },
    ];
    const { data, isLoading } = useQuery({
        queryKey: ['allSanitationManpower'],
        queryFn: allSanitationManpower,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: true,
    });
    return (
        <>
            {openManpower && (
                <AddManpower
                    onClose={() => {
                        setOpenManpower(false);
                        setSelectedRow(null);
                        setIsEditMode(false);
                    }}
                    row={selectedRow}
                    isEditMode={isEditMode}
                    manpowerDetails={data}
                />
            )}

            <Table
                title={path}
                columns={columnsDef}
                data={data || []}
                enableStickyHeader
                enableColumnResizing
                enableColumnFilters
                enableRowVirtualization
                layoutMode='grid'
                loading={isLoading}
                enableActionColumn
                enableRowActions
                renderTopToolbarCustomActions={() => {
                    return (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                endIcon={<Add />}
                                color='primary'
                                onClick={() => setOpenManpower((ps) => !ps)}
                                variant='contained'
                            >
                                Add
                            </Button>
                        </div>
                    );
                }}
                renderRowActions={({ row }) => (
                    <>
                        <IconButton
                            color='secondary'
                            onClick={() => {
                                setSelectedRow(row.original);
                                setIsEditMode(true);
                                setOpenManpower(true);
                            }}
                            sx={{ mr: 1 }}
                        // size='small'
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            />
        </>
    );
}