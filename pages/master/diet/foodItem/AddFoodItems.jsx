import { useEffect, Fragment } from 'react';
import {
  Grid,
  Typography,
  Divider,
  ToggleButton,
  Button,
  FormLabel,
  Stack,
  MenuItem,
  IconButton,
} from '@mui/material';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { AddCircle, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
//
import { restrict } from 'utils/restrict';
import {
  RHFTextField,
  RHFToggleButtonChipVariant,
  RHFRadioGroup,
  RHFSelect,
} from 'components/hook-form';
import useAuth from 'hooks/useAuth';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { failedSaveMessage, saveMessage, statusOption } from 'utils/constants';
import { dietArticleGetAll, foodItemSave, getFoodItem } from 'pages/api/diet-kitchen';

const defaultArrayObj = {
  id: '',
  quantity: '',
};

const defaultValues = {
  foodItemName: '',
  foodItemPrice: '',
  foodType: 'V',
  status: true,
  dietArticleDtos: [defaultArrayObj],
};

const Schema = yup.object().shape({
  foodItemName: yup.string().trim().required('Food Item is Required'),
  foodItemPrice: yup.string().trim().required('Food Price Required'),
});

export default function AddFoodItem({ onClose, row }) {
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
    name: 'dietArticleDtos',
  });

  const mutation = useMutation({
    mutationFn: (req) => foodItemSave({ req, row }),
    onSuccess: () => {
      onClose();
      toast.success(saveMessage);
      queryClient.invalidateQueries({ queryKey: ['FoodItemAll'] });
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    let req = {
      foodItemName: data.foodItemName,
      foodType: data.foodType,
      createdBy: user.staffId,
      foodItemPrice: data.foodItemPrice,
      status: data.status,
      dietArticleDtos: data.dietArticleDtos.map((el) => ({
        id: el.id,
        quantity: el.quantity,
      })),
    };
    if (row) {
      delete req.createdBy;
      req.modifiedBy = user.staffId;
      req.foodId = data.foodId;
    }
    mutation.mutate(req);
  };

  const { data: articleData } = useQuery({
    queryKey: ['getFoodItem', row?.foodId],
    queryFn: getFoodItem,
    enabled: !!row?.foodId,
    staleTime: 0,
    gcTime: 0,
  });

  console.log(articleData, '---articleData');

  const { data: dietData } = useQuery({
    queryKey: ['DietArticleGetAll'],
    queryFn: dietArticleGetAll,
  });

  useEffect(() => {
    if (row && articleData) {
      reset({ ...row, dietArticleDtos: articleData });
    }
  }, [row, articleData]);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${row ? ' Edit' : 'Add'} Food Item`}
      maxWidth='sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFTextField
              name='foodItemName'
              placeholder='Enter Food Name'
              label='Food Name'
              required
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name='foodItemPrice'
              placeholder='Enter Price'
              label='Price'
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
          <Grid item xs={6} align='center'>
            <FormLabel>Select Veg/Non-Veg</FormLabel>
            <RHFToggleButtonChipVariant minimumOne name='foodType' exclusive>
              <ToggleButton value='V' color='success' size='small'>
                Veg
              </ToggleButton>
              <ToggleButton value='N' color='error' size='small'>
                Non-Veg
              </ToggleButton>
            </RHFToggleButtonChipVariant>
          </Grid>
          {row && (
            <Grid item xs={12}>
              <RHFRadioGroup
                label=''
                name='status'
                options={statusOption}
                getOptionLabel={['Active', 'Inactive']}
              />
            </Grid>
          )}
        </Grid>

        <Stack
          mt={2}
          spacing={1}
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Stack>
            <Typography variant='subtitle2'>Select Articles</Typography>
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
                <RHFSelect name={`dietArticleDtos[${index}].id`} defaultValue={item.item}>
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
                  name={`dietArticleDtos[${index}].quantity`}
                  // inputMode='decimal'
                  placeholder='Enter Qty'
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
