/* eslint-disable no-unused-vars */
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Avatar, Chip, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Table from 'components/table';
import { linenOrderGetAll, linenSupplySave } from 'pages/api/laundry';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import LinenManagement from '../laundry/LinenManagement';
import Receive from './Receive';

const statusMap = {
  1: { label: 'Collection', color: 'primary' },
  2: { label: ' Pending', color: 'warning' },
  3: { label: 'Processed', color: 'success' },
  4: { label: 'Not Received', color: 'error' },
  5: { label: 'Processing', color: 'info' },
};

function CardItem({ title = 'Title', count = 56 }) {
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
        <Avatar sx={{ backgroundColor: statusMap[title].color + '.lighter' }}>
          <LocalLaundryServiceIcon color={statusMap[title].color} />
        </Avatar>
      </Stack>
      <Divider orientation='vertical' />
      <Stack py={1}>
        <Stack>
          <Typography variant='h6'>{count}</Typography>
        </Stack>
        <Stack>
          <Typography variant='subtitle2' color='text.secondary'>
            {statusMap[title].label}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function LinenSupply({ path }) {
  const queryClient = useQueryClient();
  const [openDetails, setOpenDetails] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data, isPending } = useQuery({
    queryKey: ['linenOrderGetAll'],
    queryFn: linenOrderGetAll,
  });

  const columnsDef = [
    {
      header: 'Collection Location',
      accessorKey: 'collectionLocationName',
    },
    {
      header: 'Department Collected From',
      accessorKey: 'deptCollectedFromName',
    },
    {
      header: 'Order Date',
      accessorKey: 'orderDate',
    },
    {
      header: 'Staff Id Collected From',
      accessorKey: 'staffIdCollectedFromName',
    },
    {
      header: 'Status',
      accessorKey: 'staffIdCollectedFromName',
    },
  ];

  const mutation = useMutation({
    mutationFn: (req) => linenSupplySave(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['linenOrderGetAll'] });
      toast.success(saveMessage);
      setOpenDetails(false);
      setSelectedRow(null);
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const handleSubmitLinenOrder = (data) => {
    const req = {
      id: 0,
      supplyLocation: data.location?.id,
      deptSuppliedTo: data.department?.departId,
      staffIdSuppliedTo: 1,
      dtos: data.linen?.map((e, i) => ({
        id: i,
        linenOrderDetailsId: e.id,
        supplyQty: e.SupplyQty,
      })),
    };
    mutation.mutate(req);
  };

  return (
    <>
      {openReceive && (
        <Receive
          selectedRow={selectedRow}
          onClose={() => {
            setOpenReceive(false);
          }}
        />
      )}

      {openDetails && (
        <LinenManagement
          row={selectedRow}
          type='LinenSupply'
          onSubmitLinenOrder={handleSubmitLinenOrder}
          loading={mutation.isPending}
          onClose={() => {
            setOpenDetails(false);
            setSelectedRow(null);
          }}
        />
      )}

      <Stack direction='row' spacing={2} justifyContent='center' py={2}>
        <CardItem title='1' count={20}></CardItem>
        <CardItem title='2' count={1}></CardItem>
        <CardItem title='3' count={2}></CardItem>
        <CardItem title='4' count={5}></CardItem>
        <CardItem title='5' count={12}></CardItem>
      </Stack>

      <Table
        title={path}
        columns={columnsDef}
        loading={isPending}
        data={data}
        enableRowActions
        renderRowActions={({ row }) => (
          <Stack direction='row' spacing={1}>
            <Chip
              label='Supply'
              variant='outlined'
              color='primary'
              size='small'
              onClick={() => {
                setSelectedRow(row.original);
                setOpenDetails(true);
              }}
            />
          </Stack>
        )}
      />
    </>
  );
}
