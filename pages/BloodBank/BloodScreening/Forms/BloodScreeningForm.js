import { LoadingButton } from '@mui/lab';
import { Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { BloodLabtestScreeningSave } from 'pages/api/bloodbank';
import { Close } from '@mui/icons-material';
// import { useEffect, useState } from 'react';
// import { restrict } from 'utils/restrict';
// import Saviour from './Saviour';
// import DialogBox from 'components/DialogBox';

// export default function BloodScreenFrom({ data, onClose, selectRow, isEditMode }) {
export default function BloodScreenFrom({ data, onClose }) {

    const statusOption = [true, false];
    // const queryClient = useQueryClient();
    // const [dialogOpen, setdialogOpen] = useState(false);


    const NewUserSchema = Yup.object().shape({
        trycruStatus: Yup.string().required('Trypanosoma Cruzi Status is required'),
        trycruRemark: Yup.string().required('Trypanosoma Cruzi Remark is required'),
        hbvStatus: Yup.string().required('Hepatitis B virus Status is required'),
        hbvRemark: Yup.string().required('Hepatitis B virus Remark is required'),
        hcvStatus: Yup.string().required('Hepatitis C virus Status is required'),
        hcvRemark: Yup.string().required('Hepatitis C virus Remark is required'),
        hivStatus: Yup.string().required('HIV Status is required'),
        hivRemark: Yup.string().required('HIV Remark is required'),
        htlvStatus: Yup.string().required('Human T-Lymphotropic virus Status is required'),
        htlvRemark: Yup.string().required('Human T-Lymphotropic virus Remark is required'),
        syptpStatus: Yup.string().required('Treponema Pallidum Status is required'),
        syptpRemark: Yup.string().required('Treponema Pallidum Remark is required'),
        zikvStatus: Yup.string().required('Zika virus Status is required'),
        zikvRemark: Yup.string().required('Zika virus Remark is required'),
        wnvStatus: Yup.string().required('West Nile virus(WNV) NAT Status is required'),
        wnvRemark: Yup.string().required('West Nile virus(WNV) NAT Remakr is required'),
        banStatus: Yup.string().required('Babesia Antibody & NAT Status is required'),
        banRemark: Yup.string().required('Babesia Antibody & NAT Remark is required'),
        psmStatus: Yup.string().required('Plasmodium species Status is required'),
        psmRemark: Yup.string().required('Plasmodium species Remark is required'),
    });



    const defaultValues = {
        id: null,
        trycruStatus: null,
        trycruRemark: null,
        hbvStatus: null,
        hbvRemark: null,
        hcvStatus: null,
        hcvRemark: null,
        hivStatus: null,
        hivRemark: null,
        htlvStatus: null,
        htlvRemark: null,
        syptpStatus: null,
        syptpRemark: null,
        zikvStatus: null,
        zikvRemark: null,
        wnvStatus: null,
        wnvRemark: null,
        banStatus: null,
        banRemark: null,
        psmStatus: null,
        psmRemark: null,
        donorId: data?.donorRegistrationNumber,


    };

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        mode: 'onChange',
        defaultValues,
    });

    const mutation = useMutation({
        mutationFn: (req) => BloodLabtestScreeningSave({ req }),
        onSuccess: () => {
            // handledialog();
            // queryClient.invalidateQueries(['getAllregList']);
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

    // useEffect(() => {
    //     if (isEditMode) {
    //         reset({
    //             ...selectRow,
    //         });
    //     }
    // }, [isEditMode, reset, selectRow]);

    // const handledialog = () => {
    //     setdialogOpen(true);
    // };

    // const handleDialogClose = () => {
    //     setdialogOpen(false);
    //     onClose();
    // };

    const onSubmit = async (data) => {
        var request = {
            id: +data.id,
            trycruStatus: data.trycruStatus,
            trycruRemark: data.trycruRemark,
            hbvStatus: data.hbvStatus,
            hbvRemark: data.hbvRemark,
            hcvStatus: data.hcvStatus,
            hcvRemark: data.hcvRemark,
            hivStatus: data.hivStatus,
            hivRemark: data.hivRemark,
            htlvStatus: data.htlvStatus,
            htlvRemark: data.htlvRemark,
            syptpStatus: data.syptpStatus,
            syptpRemark: data.syptpRemark,
            zikvStatus: data.zikvStatus,
            zikvRemark: data.zikvRemark,
            wnvStatus: data.wnvStatus,
            wnvRemark: data.wnvRemark,
            banStatus: data.banStatus,
            banRemark: data.banRemark,
            psmStatus: data.psmStatus,
            psmRemark: data.psmRemark,
            donorId: data.donorId,

        };
        console.log(request);
        reset();
        mutation.mutate(request);

    };

    return (
        <>
            <Card>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} padding={2}>
                        <Grid item container xs={12} md={12} justifyContent='right' padding={1} >
                            <IconButton size='small' onClick={onClose}>
                                <Close fontSize='medium' />
                            </IconButton>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h6' sx={{ mb: 4 }}>
                                    Blood Screening
                                </Typography>

                                <Grid container xs={12} spacing={3}  >
                                    <Grid item container xs={12} md={12} >
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='subtitle1'  >
                                                Donor ID: {data?.donorRegistrationNumber}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6} >
                                            <Typography variant='subtitle1' >
                                                Donar Name: {data?.donorName}
                                            </Typography>
                                        </Grid>


                                    </Grid>
                                    <Grid item container xs={12} sm={6}  >
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='Trypanosoma cruzi'
                                                name='trycruStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='trycruRemark'
                                                placeholder='Trypanosoma cruzi'

                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid item container xs={12} sm={6} >
                                        <Grid item xs={12} sm={6}>
                                            <RHFRadioGroup
                                                label='Hepatitis B virus (HBV)'
                                                name='hbvStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='hbvRemark'
                                                placeholder='Hepatitis B virus (HBV)'
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid item container xs={12} sm={6}>
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='Hepatitis C virus (HCV 3.0)'
                                                name='hcvStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='hcvRemark'
                                                placeholder='Hepatitis C virus (HCV 3.0)'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='HIV (Types 1 & 2)'
                                                name='hivStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='hivRemark'
                                                placeholder='HIV (Types 1 & 2)'
                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='Human T-Lymphotropic virus'
                                                name='htlvStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='htlvRemark'
                                                placeholder='Human T-Lymphotropic virus'

                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='Syphilis (Treponema Pallidum)'
                                                name='syptpStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='syptpRemark'
                                                placeholder='Syphilis (Treponema Pallidum)'
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6}>
                                            <RHFRadioGroup
                                                label='Zika virus (ZIKV) NAT'
                                                name='zikvStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='zikvRemark'
                                                placeholder='Zika virus (ZIKV) NAT'

                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6}>
                                            <RHFRadioGroup
                                                label='West Nile virus (WNV) NAT'
                                                name='wnvStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='wnvRemark'
                                                placeholder='West Nile virus (WNV) NAT'

                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6}>
                                            <RHFRadioGroup
                                                label='Babesia Antibody & NAT'
                                                name='banStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='banRemark'
                                                placeholder='Babesia Antibody & NAT'

                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item xs={12} sm={6}>
                                        <Grid item xs={12} sm={6} >
                                            <RHFRadioGroup
                                                label='Plasmodium species (Malaria)'
                                                name='psmStatus'
                                                options={statusOption}
                                                getOptionLabel={['Yes', 'No']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                label='Remarks'
                                                name='psmRemark'
                                                placeholder='Plasmodium species (Malaria)'

                                            />
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
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider>
                {/* <DialogBox open={dialogOpen}>
                    <Saviour dialogProperty={handleDialogClose} title={selectRow.donorRegistrationNumber} />
                </DialogBox> */}
            </Card>
        </>
    );
}