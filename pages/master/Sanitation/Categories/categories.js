/** @format */

import { Button, IconButton, useTheme } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import EditIcon from 'assets/EditIcon';
import AddCategories from './AddCategories';
import { allSanitationCategories } from 'pages/api/master';
import Label from 'components/Label';

export default function Categories({ path }) {
    const theme = useTheme();
    const [openCategory, setOpenCategory] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const columnsDef = [
        {
            header: 'Category Name',
            accessorKey: 'categoryName',
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
        queryKey: ['allSanitationCategories'],
        queryFn: allSanitationCategories,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: true,
    });
    return (
        <>
            {openCategory && (
                <AddCategories
                    onClose={() => {
                        setOpenCategory(false);
                        setSelectedRow(null);
                        setIsEditMode(false);
                    }}
                    row={selectedRow}
                    isEditMode={isEditMode}
                    categoriesDetail={data}
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
                                onClick={() => setOpenCategory((ps) => !ps)}
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
                                setOpenCategory(true);
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
