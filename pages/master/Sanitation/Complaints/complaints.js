// import React from 'react';

import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { Description, Receipt, ReceiptLong, Task } from '@mui/icons-material';
import Table from 'components/table';
import Label from 'components/Label';

const statusMap = {
    1: { label: 'Completed', color: 'success' },
    2: { label: 'InProcess', color: 'warning' },
    3: { label: 'Pending', color: 'error' },
};
const statics = [
    {
        label: 'Total Complaints',
        count: 5,
        icon: <Description color='primary' />,
        color: 'primary',
    },
    {
        label: 'Pending Complaints',
        count: 1,
        icon: <ReceiptLong color='error' />,
        color: 'error',
    },
    {
        label: 'Inprogress Complaints',
        count: 2,
        icon: <Receipt color='warning' />,
        color: 'warning',
    },
    {
        label: 'Completed Complaints',
        count: 2,
        icon: <Task color='success' />,
        color: 'success'
    },
];

const data = [
    {
        staffName: 'Surya',
        department: 'OPD',
        dateReceived: '12/12/2003',
        dateClosed: '23/12/2023',
        status: '1',
        remarks: '-N/A-',
    },
    {
        staffName: 'Karthik',
        department: 'IPD',
        dateReceived: '12/12/2023',
        dateClosed: '-',
        status: '2',
        remarks: 'Not Clean',
    },
    {
        staffName: 'Pawan',
        department: 'OPD',
        dateReceived: '20/12/2023',
        dateClosed: '-',
        status: '2',
        remarks: '-N/A-',
    },
    {
        staffName: 'Kalyan',
        department: 'Surgery',
        dateReceived: '12/12/2023',
        dateClosed: '23/12/2023',
        status: '1',
        remarks: '-N/A-',
    },
    {
        staffName: 'Sriram',
        department: 'OPD',
        dateReceived: '12/12/2023',
        dateClosed: '-',
        status: '3',
        remarks: '-N/A-',
    },
];

function CardItem({ item }) {
    return (
        <Stack
            component={Paper}
            elevation={2}
            direction='row'
            spacing={2}
            px={2}
            alignItems='center'
            sx={{ borderRadius: '4px', border: '1px solid', borderColor: 'primary.lighter' }}
        >
            <Stack py={1}>
                <Avatar
                    sx={{
                        backgroundColor: item.color + '.lighter',
                    }}
                >
                    {item.icon}
                </Avatar>
            </Stack>
            <Divider orientation='vertical' />
            <Stack py={1}>
                <Stack>
                    <Typography variant='h6'>{item.count}</Typography>
                </Stack>
                <Stack>
                    <Typography variant='subtitle2' color='text.secondary'>
                        {item.label}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default function Complaints() {

    const columnsDef = [
        {
            header: 'Staff',
            accessorKey: 'staffName',
        },
        {
            header: 'Department',
            accessorKey: 'department',
        },
        {
            header: 'Start Date',
            accessorKey: 'dateReceived',
        },
        {
            header: 'Close Date',
            accessorKey: 'dateClosed',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            Cell: ({ row }) => (
                <Label
                    sx={{ minWidth: 120 }}
                    variant={'ghost'}
                    color={statusMap[row.original.status].color}
                >
                    {statusMap[row.original.status].label}
                </Label>
            ),
        },
        {
            header: 'Remarks',
            accessorKey: 'remarks',
        },
    ];

    return (
        <div>
            <Box px={2} pt={2}>
                <Stack direction='row' container spacing={2} justifyContent='center' py={2}>
                    {statics.map((item) => (
                        <CardItem item={item} key={item} />
                    ))}
                </Stack>
            </Box>

            <Table
                // title={path}
                columns={columnsDef}
                // loading={}
                data={data}
                enableStickyHeader
                enableColumnResizing
                rowNumberMode='original'
                enableRowNumbers
                enableRowVirtualization
                // enableRowActions
                layoutMode='grid'
            />
        </div>
    );
}
