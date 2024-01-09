import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography } from '@mui/material';
import { FormProvider, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { BloodScreeningGroupingSave } from 'pages/api/bloodbank';

export default function BloodGrouping() {

    const NewUserSchema = Yup.object().shape({
        antiAtest: Yup.string().required('Anti A is required'),
        antiBtest: Yup.string().required('Anti B is required'),
        antiAbtest: Yup.string().required('Anti AB is required'),
        antiDone: Yup.string().required('Anti D1 is required'),
        antiDtwo: Yup.string().required('Anti D2 is required'),
        acells: Yup.string().required('A cells is required'),
        bcells: Yup.string().required('B cells is required'),
        ocells: Yup.string().required('O cells is required'),
        abo: Yup.string().required('ABO is required'),
        rhd: Yup.string().required('RH(D) is required'),
    });

    const defaultValues = {
        id: null,
        antiAtest: null,
        antiBtest: null,
        antiAbtest: null,
        antiDone: null,
        antiDtwo: null,
        acells: null,
        bcells: null,
        ocells: null,
        abo: null,
        rhd: null,
    };

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        mode: 'onChange',
        defaultValues,
    });

    const mutation = useMutation({
        mutationFn: (req) => BloodScreeningGroupingSave({ req }),
        onSuccess: () => {
            // queryClient.invalidateQueries(['getPaymentModeGetallPaymentModes']);
            toast(saveMessage);
            // onclose();
        },
        onError: (error) => {
            toast(failedSaveMessage);
            console.log(error);
        },
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;



    const onSubmit = async (data) => {
        var request = {
            id: +data.id,
            antiAtest: data.antiAtest,
            antiBtest: data.antiBtest,
            antiAbtest: data.antiAbtest,
            antiDone: data.antiDone,
            antiDtwo: data.antiDtwo,
            acells: data.acells,
            bcells: data.bcells,
            ocells: data.ocells,
            abo: data.abo,
            rhd: data.rhd,
        };
        console.log(request);
        reset();
        mutation.mutate(request);

    };

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} padding={2}>
                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={12}>
                            <Typography variant='h6' sx={{ mb: 3 }}>
                                Blood Screening & Grouping
                            </Typography>
                            <Grid container xs={12} spacing={2.4}>
                                <Grid item xs={12} md={12}>
                                    <Typography variant='subtitle2' >
                                        Cell Grouping
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2.4}>
                                    <RHFTextField
                                        label='Anti A'
                                        name='antiAtest'
                                        placeholder='Anti A'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2.4}>
                                    <RHFTextField
                                        label='Anti B'
                                        name='antiBtest'
                                        placeholder='Anti B'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2.4}>
                                    <RHFTextField
                                        label='Anti AB'
                                        name='antiAbtest'
                                        placeholder='Anti AB'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2.4}>
                                    <RHFTextField
                                        label='Anti D1'
                                        name='antiDone'
                                        placeholder='Anti D1'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2.4}>
                                    <RHFTextField
                                        label='Anti D2'
                                        name='antiDtwo'
                                        placeholder='Anti D2'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid item xs={12} md={12}>
                            <Grid container xs={12} spacing={2.4}>
                                <Grid item xs={12} md={12}>
                                    <Typography variant='subtitle2' >
                                        Serum Grouping
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <RHFTextField
                                        label='A Cells'
                                        name='acells'
                                        placeholder='A Cells'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <RHFTextField
                                        label='B Cells'
                                        name='bcells'
                                        placeholder='B Cells'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <RHFTextField
                                        label='O Cells'
                                        name='ocells'
                                        placeholder='O Cells'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid item xs={12} md={12}>
                            <Grid container xs={12} spacing={2.4}>

                                <Grid item xs={12} md={12}>
                                    <Typography variant='subtitle2' >
                                        Blood Group
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RHFTextField
                                        label='ABO'
                                        name='abo'
                                        placeholder='ABO'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RHFTextField
                                        label='Rh(D)'
                                        name='rhd'
                                        placeholder='Rh(D)'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack alignItems='center' sx={{ mt: 3 }}>
                            <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                                Save
                            </LoadingButton>
                        </Stack>
                    </Grid>

                </Grid>
            </FormProvider>
        </>
    );
}