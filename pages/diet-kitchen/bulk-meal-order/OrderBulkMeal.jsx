/* eslint-disable no-unused-vars */
import {
  MenuItem,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@mui/material';
import { RHFTextField, RHFSelect } from 'components/hook-form';
import { FormProvider } from 'components/hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { toast } from 'react-toastify';
import { AddCircle, Delete } from '@mui/icons-material';
import {
  BulkMealOrderGetById,
  BulkMealOrderSave,
  mealTypeGetAll,
  orderSetGetAll,
} from 'pages/api/diet-kitchen';
import { useEffect } from 'react';

const defaultArrayObj = {
  mealType: '',
  orderSet: '',
  qty: '',
};

const defaultValues = {
  orders: [defaultArrayObj],
};
const orderSchema = yup.object().shape({
  mealType: yup.string().required('Required'),
  orderSet: yup.string().required('Required'),
  qty: yup
    .number()
    .nullable()
    .typeError('Invalid Number')
    .required('Required')
    .min(1, 'minimum value should be 1'),
});

const schema = yup.object().shape({
  orders: yup.array().of(orderSchema),
});

export default function OrderBulkMeal({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['mealTypeAll'], queryFn: mealTypeGetAll });
  const { data: orderSet } = useQuery({ queryKey: ['orderSetAll'], queryFn: orderSetGetAll });

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  console.log(row);
  const { handleSubmit, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orders',
  });

  const mutation = useMutation({
    mutationFn: (req) => {
      BulkMealOrderSave({ req, isEditMode });
    },
    onSuccess: () => {
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['FoodItemAll'] });
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (isEditMode) {
      BulkMealOrderGetById(row.trackingId)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          toast.error('Failed to get value');
        });
    }
  }, [isEditMode]);

  return (
    <FormWrapper
      onClose={onClose}
      title='Order Meal'
      maxWidth='md'
      onSubmit={handleSubmit(onSubmit)}
      fullWidth
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 1 / 3, p: 0.5, '&.MuiTableCell-root:first-of-type': { p: 1 } }}
              >
                Meal Type
              </TableCell>
              <TableCell sx={{ width: 1 / 3, p: 0.5 }}>Order Set</TableCell>
              <TableCell sx={{ p: 0.5 }}>Qty</TableCell>
              <TableCell sx={{ p: 0.5 }}>
                <IconButton
                  title='Add Row'
                  color='secondary'
                  size='small'
                  onClick={() => append({ defaultArrayObj })}
                >
                  <AddCircle />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell sx={{ p: 0.5, '&.MuiTableCell-root:first-of-type': { p: 0.5 } }}>
                  <RHFSelect name={`orders[${index}].mealType`}>
                    <MenuItem value=''> Select Option </MenuItem>
                    {data?.map((option) => (
                      <MenuItem key={option.mealtypeid} value={option.mealtypeid}>
                        {option.mealname}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <RHFSelect name={`orders[${index}].orderSet`}>
                    <MenuItem value=''> Select Option </MenuItem>
                    {orderSet?.map((option) => (
                      <MenuItem key={option.orderId} value={option.orderId}>
                        {option.orderSetname}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <RHFTextField name={`orders[${index}].qty`} placeholder='Enter Qty' />
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <IconButton
                    tabIndex={-1}
                    size='small'
                    disabled={index === 0}
                    onClick={() => remove(index)}
                  >
                    <Delete fontSize='small' color={index === 0 ? 'disabled' : 'error'} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FormProvider>
    </FormWrapper>
  );
}
