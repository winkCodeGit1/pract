import * as yup from 'yup';
import { Button, Divider, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { findDuplicates } from 'utils/lodash';
import { restrict } from 'utils/restrict';
import useAuth from 'hooks/useAuth';
import FormWrapper from 'components/FormWrapper';
import { foodItemGetAll, getOrderSet, orderSetItemSave } from 'pages/api/diet-kitchen';
import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';

const defaultArrayObj = {
  foodId: '',
  quantity: '',
};

const defaultValues = {
  orderSetname: '',
  generalWardPrice: '',
  privateWardPrice: '',
  foodItem: [defaultArrayObj],
};

const Schema = yup.object().shape({
  orderSetname: yup.string().trim().required('Order Set Name is Required'),
  generalWardPrice: yup.string().trim().required('General Ward Price is Required'),
  privateWardPrice: yup.string().trim().required('Private Ward Price is Required'),
});

export default function AddOrderSet({ onClose, row }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'foodItem',
  });

  const mutation = useMutation({
    mutationFn: (req) => orderSetItemSave({ req, row }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['orderSetAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSave = (data) => {
    let req = {
      orderSetname: data.orderSetname,
      generalWardPrice: data.generalWardPrice,
      privateWardPrice: data.privateWardPrice,
      createdBy: user.staffId,
      foodItemDtos: data.foodItem.map((el) => ({
        foodId: el.foodId,
        quantity: el.quantity,
      })),
    };

    if (row) {
      delete req.createdBy;
      req.orderId = data.orderId;
      req.modifiedBy = user.staffId;
      req.status = data.status;
    }

    const isDuplicate = findDuplicates(data.foodItem, 'foodId');

    if (isDuplicate) {
      toast.error('Duplicate Food Item.');
      return;
    }
    console.log(isDuplicate);
    mutation.mutate(req);
  };

  const { data: orderData } = useQuery({
    queryKey: ['getOrderSet', row?.orderId],
    queryFn: getOrderSet,
    enabled: !!row?.orderId,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (row && orderData) {
      console.log(row, '--row');
      reset({ ...row, foodItem: orderData });
    }
  }, [row, orderData]);

  const { data: dietData } = useQuery({
    queryKey: ['foodItemGetAll'],
    queryFn: foodItemGetAll,
    staleTime: 0,
    gcTime: 0,
  });

  return (
    <FormWrapper
      onClose={onClose}
      title='Add Order Set'
      maxWidth='sm'
      onSubmit={handleSubmit(onSave)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFTextField
              name='orderSetname'
              placeholder='Enter Order Name'
              label='Order Set Name'
              required
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='generalWardPrice'
              placeholder='Enter Price'
              label='General-Ward'
              onInput={(e) => {
                restrict.decimal(e);
              }}
              InputProps={{
                startAdornment: (
                  <>
                    <Typography color='primary.main'>Rs.</Typography>
                    <Divider flexItem orientation='vertical'></Divider>
                  </>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='privateWardPrice'
              placeholder='Enter Price'
              label='Private-Ward'
              onInput={(e) => {
                restrict.decimal(e);
              }}
              InputProps={{
                startAdornment: (
                  <>
                    <Typography color='primary.main'>Rs.</Typography>
                    <Divider flexItem orientation='vertical'></Divider>
                  </>
                ),
              }}
              required
            />
          </Grid>
        </Grid>

        <Stack
          mt={2}
          spacing={1}
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Stack>
            <Typography variant='subtitle2'>Select Food Item</Typography>
          </Stack>
          <Stack>
            <Button
              size='small'
              variant='outlined'
              onClick={() => append(defaultArrayObj)}
              endIcon={<AddCircle />}
              style={{ marginBottom: '6px' }}
            >
              Add Row
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={1}>
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Grid item xs={8}>
                <RHFSelect name={`foodItem[${index}].foodId`} defaultValue={item.item}>
                  <MenuItem value=''> Select Option </MenuItem>
                  {dietData?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Grid>

              <Grid item xs={3}>
                <RHFTextField
                  name={`foodItem[${index}].quantity`}
                  // inputMode='decimal'
                  placeholder='Enter quantity'
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  tabIndex={-1}
                  size='small'
                  disabled={index === 0}
                  onClick={() => remove(index)}
                >
                  <Delete fontSize='small' color={index === 0 ? 'disabled' : 'error'} />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
