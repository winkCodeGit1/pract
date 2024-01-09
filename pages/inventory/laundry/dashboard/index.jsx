/* eslint-disable no-unused-vars */
import { Add } from '@mui/icons-material';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Avatar, Button, Divider, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

//Local imports
import Table from 'components/table';
//api
import { linenOrderGetAll, linenOrderSave } from 'pages/api/laundry';
import LinenManagement from '../laundry/LinenManagement';
import LinenReceipt from './LinenReceipt';
import Receive from './Receive';
import useAuth from 'hooks/useAuth';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';

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

export default function Laundry({ path }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [openLinenOrderCollection, setOpenLinenOrderCollection] = useState(false);
  const [openLinenReceipt, setOpenLinenReceipt] = useState(false);
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
  ];

  const mutation = useMutation({
    mutationFn: (req) => linenOrderSave(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['linenOrderGetAll'] });
      toast.success(saveMessage);
      setOpenLinenOrderCollection(false);
      setSelectedRow(null);
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const handleSubmitLinenOrder = (req) => {
    const reqData = {
      id: 0,
      collectionLocation: req?.location.id,
      deptCollectedFrom: req?.department?.departId,
      staffIdCollectedFrom: 1,
      linenOrderDetailsDtos: req.linen?.map((e, i) => ({
        id: i,
        linenItemId: e?.LinenItemCode?.id,
        orderQty: e.Qty,
        orderUom: 1,
        linenProcessId: e?.Processed?.id,
        lastUpdatedBy: user.staffId,
      })),
    };
    mutation.mutate(reqData);
  };
  return (
    <>
      {openLinenReceipt && (
        <LinenReceipt
          onClose={() => {
            setOpenLinenReceipt(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
        />
      )}

      {openLinenOrderCollection && (
        <LinenManagement
          onClose={() => {
            setOpenLinenOrderCollection(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
          type='LinenOrder'
          onSubmitLinenOrder={handleSubmitLinenOrder}
          loading={mutation.isPending}
        />
      )}

      {/* {openLinenOrderCollection && (
        <LinenManagement
          onClose={handleCloseLinenOrder}
          row={selectedRow}
          type='LinenOrder'
          onSubmitLinenOrder={handleSubmitLinenOrder}
        />
      )} */}

      {openReceive && (
        <Receive
          selectedRow={selectedRow}
          onClose={() => {
            setOpenReceive(false);
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
        renderTopToolbarCustomActions={() => (
          <Button
            endIcon={<Add />}
            color='primary'
            onClick={() => setOpenLinenOrderCollection((ps) => !ps)}
            variant='contained'
          >
            Linen Order
          </Button>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            sx={{ fontStyle: 'unset !important', color: 'unset !important', m: 0 }}
            key={0}
            onClick={() => {
              setSelectedRow(row.original);
              // setOpenLinen(true);
              setOpenLinenReceipt(true);
              closeMenu();
            }}
          >
            View Receipt
          </MenuItem>,
          // <MenuItem
          //   key={1}
          //   onClick={() => {
          //     setOpenReceive(true);
          //     closeMenu();
          //   }}
          //   sx={{ m: 0 }}
          // >
          //   Receive
          // </MenuItem>,
        ]}
      />
    </>
  );
}
