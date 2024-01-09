/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel, Grid, ToggleButton } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import {
    FormProvider,
    RHFTextField,
    RHFDateTimePicker,
    RHFToggleButtonChipVariant,
    RHFAutoComplete,
} from 'components/hook-form';
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//     // PresentComplaint: yup.object().typeError('uired'),
//     // nurseCareGiven: yup.string().required(),
//     // status: yup.boolean().required(),
// });

const defaultValues = {
    PresentComplaint: null,
    duration: '',
    units: '',
    remarks: '',
    status: true,
};

export default function ComplainDurationAdd({ onClose, selectedRow }) {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(),
    });
    const { handleSubmit } = methods;

    function onSave(data) {
        console.log(data);
    }

    return (
        <FormWrapper
            maxWidth='xs'
            title='Add Complaint and Duration'
            onClose={onClose}
            onSubmit={handleSubmit(onSave)}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <RHFAutoComplete name='PresentComplaint'
                            // options={buildingType}
                            placeholder='Present Complaint'
                            label='Building'
                            // onInputChange={() => setValue('floorItm', [defaultFloorItemsArray])}
                            required></RHFAutoComplete>
                    </Grid>

                    <Grid item xs={12}>
                        <RHFTextField name='duration' label='Duration' />
                        <RHFAutoComplete name='units'
                            // options={buildingType}
                            placeholder='Present Complaint'
                            label='Units'
                            // onInputChange={() => setValue('floorItm', [defaultFloorItemsArray])}
                            required></RHFAutoComplete>
                    </Grid>
                    <Grid item xs={12}>
                        <RHFTextField name='remarks' label='Remarks' />
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel>Cured</FormLabel>
                        <RHFToggleButtonChipVariant minimumOne name='status' exclusive>
                            <ToggleButton value={true} color='success' size='small'>
                                Yes
                            </ToggleButton>
                            <ToggleButton value={false} color='error' size='small'>
                                No
                            </ToggleButton>
                        </RHFToggleButtonChipVariant>
                    </Grid>
                </Grid>
            </FormProvider>
        </FormWrapper>
    );
}
