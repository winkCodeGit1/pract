import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//@mui
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, Checkbox, Divider, Grid, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    FormProvider,
    RHFAutoComplete,
    RHFTextField,
} from 'components/hook-form';

import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import { useFieldArray, useForm } from 'react-hook-form';

import { CampRegistrationSave } from 'pages/api/bloodbank';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { getStates } from 'api';
import { BloodtypeRounded, ExpandMoreRounded, VolunteerActivismRounded } from '@mui/icons-material';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import BloodRequestViewer from './BloodRequestViewer';

const defaultValues = {
    patientId: null,
    componentDetails: [{ componentType: '', units: '' }],
};
const Schema = yup.object().shape({
    patientId: yup.object().typeError('Required').nullable().required('Required'),
    componentDetails: yup.array().of(
        yup.object().shape({
           // componentType: yup.string().required('Required'),
            units: yup.string().trim().required('Required'),
        })
    ),
    pincode: yup.string().trim().required('Required'),
});

export default function RaiseBloodRequest() {
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState([]);
    const { control } = useForm();
    const [openView, setOpenView] = useState(false);
    const queryClient = useQueryClient();
    const methods = useForm({
        resolver: yupResolver(Schema),
        mode: 'onChange',
        defaultValues,
    });

    const { watch, handleSubmit, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'componentDetails', // The name of the array field
    });
    useEffect(() => {
        // Add default values only once when the component mounts
        if (fields.length === 0) {
            append({});
        } else {
            null;
        }
        const allFormData = watch();
        setFormData(allFormData);
        console.log(allFormData);
    }, [fields, append, setFormData, watch, remove]);

    const removeItem = (index) => {
        // Get the current watch datare
        remove(index);
        const currentData = watch('componentDetails');
        const updatedData = [...currentData];
        updatedData.splice(index, 1);
        setValue('componentDetails', updatedData, { shouldDirty: true });
        setFormData(updatedData);
        console.log(formData);
    };

    const mutation = useMutation({
        mutationFn: (req) => CampRegistrationSave({ req }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAllCampList'] });
            toast(saveMessage);
        },
        onError: (error) => {
            toast(failedSaveMessage);
            console.log(error);
        },
    });

    const onSubmit = (data) => {

        var request = {
            ...data,
            PatientId: data.patientId.id,
            stateId: data.stateId.id,
            cityId: data.cityId.id,
            pincode: +data.pincode,
            address: data.address,
        };
        console.log(request);
        mutation.mutate(request);
    };

    const PatientId = watch('patientId')?.id;
    const { data: patientIds } = useQuery({
        queryKey: ['getStates', PatientId],
        queryFn: getStates,
        enabled: !!PatientId,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ margin: 2 }}>
                    <Grid container xs={12}>
                        <Grid item container xs={12} md={6} spacing={2} p={2}>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    name='patientId'
                                    options={patientIds}
                                    label='PatientId'
                                    placeholder='Select Patient Id'
                                    onInputChange={(d) => {
                                        setValue('patientId', d);
                                    }}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Card sx={{ margin: 2, padding: 2 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h6' sx={{ mb: 1 }}>
                                    Selected Patient Details
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1} p={2} >
                            <Grid item >
                                <Avatar >
                                    <VolunteerActivismRounded />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography fontWeight='bold' fontSize={17}>
                                    {'shanmuk'}
                                </Typography>
                                <Typography fontSize={13}>
                                    {'#1234654'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Card style={{ borderRadius: 2, padding: 10 }}>
                                <Grid container spacing={4} >
                                    <Grid item>
                                    </Grid>
                                    <Grid item>
                                        <Typography fontSize={13} fontWeight='bold' textAlign='center'>
                                            Date of Joining
                                        </Typography>
                                        <Typography textAlign='center' fontSize={13}>
                                            08-07-2023
                                        </Typography>
                                    </Grid>
                                    <Grid item> <Divider orientation='vertical' /></Grid>
                                    <Grid item>
                                        <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                            Cause of illness
                                        </Typography>
                                        <Typography textAlign='center' fontSize={13}>
                                            Fever
                                        </Typography>
                                    </Grid>
                                    <Grid item> <Divider orientation='vertical' /></Grid>
                                    <Grid item>
                                        <Typography fontWeight='bold' textAlign='center' fontSize={13} >
                                            Head Doctor Name
                                        </Typography >
                                        <Typography textAlign='center' fontSize={13}>
                                            Narayana
                                        </Typography>
                                    </Grid>
                                    <Grid item> <Divider orientation='vertical' /></Grid>
                                    <Grid item>
                                        <Typography fontSize={13} fontWeight='bold' textAlign='center'>
                                            Blood Group
                                        </Typography>
                                        <Stack direction='row' spacing={1}>
                                            <Typography textAlign='center' fontSize={13}>
                                                <BloodtypeRounded fontSize='small' />
                                            </Typography>
                                            <Typography textAlign='center' fontSize={13}>
                                                O+ve
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Card>
                    <Stack direction='row' p={2}>
                        <Checkbox
                            size='small'
                            checked={checked}
                            onChange={(event) => {
                                setChecked(event.target.checked);
                            }}
                        />
                        <Typography mt={1}>Blood Donation from Relative</Typography>
                    </Stack>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Transfusion Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container sx={12}>
                                <Grid item container xs={12} spacing={2} p={2}>
                                    <Grid item xs={12}>
                                        <RHFAutoComplete
                                            name='priority'
                                            options={['High', 'Medium', 'Low']}
                                            label='Priority'
                                            placeholder='Select Priority'
                                            onInputChange={(d) => {
                                                setValue('priority', d);
                                            }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RHFDatePicker
                                            name='transfusionDate'
                                            label='Date of Transfusion/Surgery'
                                            format='dd-MM-yyyy'
                                            required
                                            disableFuture
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid container sx={12}>
                                        {fields.map((field, index) => (
                                            <Grid item container xs={12} spacing={2} p={2} key={field.id}>
                                                <Grid item xs={12} md={index === 0 ? 6 : 6}>
                                                    <RHFAutoComplete
                                                        name={`componentDetails[${index}].componentType`}
                                                        options={[
                                                            { value: 'type1', label: 'Type 1' },
                                                            { value: 'type2', label: 'Type 2' },
                                                            { value: 'type3', label: 'Type 3' },
                                                        ]}
                                                        label='Component Type'
                                                        placeholder='Select Component Type'
                                                        onInputChange={(d) => {
                                                            setValue(`componentDetails[${index}].componentType`, d);
                                                        }}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={index === 0 ? 6 : 5}>
                                                    <RHFTextField
                                                        name={`componentDetails[${index}].units`}
                                                        label='Units'
                                                        placeholder='Select Units'
                                                        required
                                                    />
                                                </Grid>
                                                {index !== 0 &&
                                                    <Grid item xs={12} md={1} mt={2}>
                                                        <IconButton
                                                            color="error"
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                removeItem(index);
                                                            }} >
                                                            <Delete />
                                                        </IconButton>
                                                    </Grid>}
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoadingButton endIcon={<Add />} variant='contained' aria-label="add"
                                            onClick={() => append({})}>
                                            Add More
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RHFAutoComplete
                                            name='physicianId'
                                            options={patientIds}
                                            label='Ordering Physician/Nurse'
                                            placeholder='Select Physician/Nurse Id'
                                            onInputChange={(d) => {
                                                setValue('physicianId', d);
                                            }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RHFTextField
                                            label='Signature/Authentication of Healthcare Personnel'
                                            name='streetAddress'
                                            placeholder='Street Address Line'
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <LoadingButton variant='contained' onClick={() => setOpenView(true)} >
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Card>
                {openView && (
                    <BloodRequestViewer
                        data={formData}
                        onClick={handleSubmit(onSubmit)}
                        response={''}
                        onClose={() => {
                            setOpenView(false);
                        }}
                    />
                )}
            </FormProvider>
        </div >
    );
}

