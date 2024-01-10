import { Grid } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'components/FormWrapper';
import { restrict } from 'utils/restrict';

//local
import { RHFTextField, RHFAutoComplete, RHFRadioGroup } from 'components/hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { saveMessage, failedSaveMessage, statusOption } from 'utils/constants';

//api
import {
  therapyDetailsFetchTherapyDetails,
  durationTypeGetAlldurationTypes,
  packageDetailsSavePackageDetails,
} from 'pages/api/master';

const defaultValues = {
  therapyId: '',
  duration: '',
  name: '',
  durationTypeId: '',
  active: true,
  therapyName: '',
  durationType: '',
  durationTypeName: '',
};

const Schema = yup.object().shape({
  therapyId: yup
    .object()
    .shape()
    .nullable()
    .typeError('Therapy Details is Required')
    .required('Therapy Details  is Required'),
  durationTypeId: yup
    .object()
    .shape()
    .nullable()
    .typeError('Duration Type is required')
    .required('Duration Type is required'),
  duration: yup.string().required('Required'),
  name: yup.string().required('Package Details Required'),
  active: yup.boolean(),
});

export default function AddPackage({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const { errors } = methods;

  console.log(errors);

  const { data: therapyDetails } = useQuery({
    queryKey: ['therapyDetailsFetchTherapyDetails'],
    queryFn: therapyDetailsFetchTherapyDetails,
  });

  const { data: durationDetails } = useQuery({
    queryKey: ['durationTypeGetAlldurationTypes'],
    queryFn: durationTypeGetAlldurationTypes,
  });

  const mutation = useMutation({
    mutationFn: (req) => packageDetailsSavePackageDetails({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchPackageDetailsByOrgId'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const req = {
      id: data?.id ?? 0,
      name: data?.name,
      therapyId: data?.therapyId?.id,
      duration: data?.duration,
      durationTypeId: data?.durationTypeId?.id,
      active: data['active'],
    };
    console.log(data);

    mutation.mutate(req);
  };

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        therapyId: therapyDetails?.find((el) => el.id === +row.therapyId),
        durationTypeId: durationDetails?.find((el) => el.id === +row.durationTypeId),
      };
      reset({ ...obj });
    }
  }, [isEditMode, row, therapyDetails, durationDetails]);
  console.log(isEditMode);
  // useEffect(() => {
  //   if (isEditMode) {
  //     let obj = {
  //       ...row,
  //       therapyId:
  //     }
  //     reset({ ...row });
  //   }
  // }, [isEditMode, reset, row]);
  // console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Package Details`}
      maxWidth='xs'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='therapyId'
              placeholder='Select Therapy Details'
              options={therapyDetails || []}
              label='Therapy Details'
              required
            ></RHFAutoComplete>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='name'
              placeholder='Package Details'
              label='Package Details'
              onInput={(e) => {
                restrict.alphanumerichypenbracketscommaspacedotunderscore(e);
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name='duration'
              placeholder='Duration'
              label='Duration'
              inputProps={{ maxLength: 1 }}
              onInput={(e) => {
                restrict.number(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutoComplete
              name='durationTypeId'
              options={durationDetails || []}
              placeholder='Select Duration Type'
              label='Units'
            ></RHFAutoComplete>
          </Grid>
          {isEditMode ? (
            <Grid item xs={12}>
              <RHFRadioGroup
                label=''
                name='active'
                options={statusOption}
                getOptionLabel={['Active', 'Inactive']}
              />
            </Grid>
          ) : null}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
