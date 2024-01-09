import { Grid, Typography } from '@mui/material';
import DonorImg from 'assets/Images/bbmsdonor.png';
import { FormProvider, RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const defaultValues = {
    bloodbagId: '',
};
export default function Saviour({ dialogProperty, title }) {
    const methods = useForm({
        mode: 'onChange',
        defaultValues,
    });
    const {
        handleSubmit,
        // formState: { isSubmitting },
    } = methods;

    const onSubmit = () => {
        console.log('Submitted');
    };

    const handleDialogCloseBtn = () => {
        dialogProperty(false);
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid item container>
                        <Grid item xs={4}>
                            <img alt='Donor-Img' src={DonorImg} width={180} />
                        </Grid>
                        <Grid item container xs={8} direction={'column'}>
                            <Grid item>
                                <Typography variant='h4'>A New Saviour has added to the list #{title}</Typography>
                            </Grid>
                            <Grid item>
                                <p>Please add the blood bag id to the Donor id to follow and to track the blood donation process further</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField
                            label='Blood Bag Id'
                            name='bloodbagId'
                            placeholder='Enter Blood Bag Id'
                            required
                        />
                        <LoadingButton type='submit' variant='contained' onClick={handleDialogCloseBtn}>
                            Add & Link
                        </LoadingButton>
                    </FormProvider>
                </Grid>
            </Grid>
        </>
    );
}