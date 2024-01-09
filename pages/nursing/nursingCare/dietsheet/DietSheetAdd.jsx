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
import * as yup from 'yup';

const schema = yup.object().shape({
    dateTime: yup.date().typeError('Required'),
    foodCategory: yup
        .object()
        .typeError('Food Category is Required')
        .nullable()
        .required('Food Category is Required'),
    FoodItm: yup.string().required('Food Item is required'),
});

const defaultValues = {
    dateTime: null,
    foodCategory: null,
    FoodItm: '',
};

export default function DietSheetAdd({ onClose, selectedRow }) {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { handleSubmit } = methods;

    function onSave(data) {
        console.log(data);
    }

    return (
        <FormWrapper
            maxWidth='xs'
            title='Add Diet Sheet Record'
            onClose={onClose}
            onSubmit={handleSubmit(onSave)}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <RHFDateTimePicker name='dateTime' label='DateTime' />
                    </Grid>

                    <Grid item xs={12}>
                        <RHFAutoComplete name='nurseCareGiven' label='Select Food Category'
                            // options={buildingType}
                            placeholder='Select Building'
                            // onInputChange={() => setValue('floorItm', [defaultFloorItemsArray])}
                            required> </RHFAutoComplete>
                    </Grid>

                    <Grid item xs={12}>
                        <RHFTextField name='FoodItm' placeholder='Food Item' />
                    </Grid>
                </Grid>
            </FormProvider>
        </FormWrapper>
    );
}
