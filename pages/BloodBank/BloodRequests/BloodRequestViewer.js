import { BloodtypeRounded, VolunteerActivismRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import FormWrapper from 'components/FormWrapper';


export default function BloodRequestViewer({ onClose, onClick, data, response }) {
    return (
        <FormWrapper
            onClose={onClose}
            title='Blood Request Details'
            maxWidth='sm'>
            <Grid container direction="column" xs={12} >
                <Grid item container spacing={1} p={2} >
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
                <Grid item xs={12}>
                    <Card style={{ borderRadius: 2, padding: 10 }}>
                        <Grid container spacing={2} justifyContent='center' >
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
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontSize={13} fontWeight='bold' textAlign='center'>
                                    Date of Transfusion
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    08-07-2023
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                    Donation <br />from Relative
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    Yes
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13} >
                                    Ordering <br />Physician/Nurse
                                </Typography >
                                <Typography textAlign='center' fontSize={13}>
                                    Narayana
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {response ? <>
                        <Grid item container xs={12} p={2} direction='row' justifyContent='center' spacing={1}>
                            <Grid item>
                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography fontWeight='bold' fontSize={17}>
                                        Blood Request Reference ID
                                    </Typography>
                                    <Typography fontWeight='bold' fontSize={17}>
                                        #BRR_12344224
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item><Divider orientation='vertical' /></Grid>
                            <Grid item justifyContent='center' alignItems='center' >
                                <Stack justifyContent='center' alignItems='center'>
                                    <Typography fontWeight='bold' fontSize={17}>
                                        Blood Request Transfusion ID
                                    </Typography>
                                    <Typography fontWeight='bold' fontSize={17}>
                                        #BTID_13242525
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </> :
                        <>
                            <Grid item container xs={12} p={2} direction='column' justifyContent='left' spacing={1}>
                                <Grid item>
                                    <Typography fontWeight='bold' fontSize={17}>
                                        Required Components
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Divider />
                                </Grid>

                                {(data?.componentDetails[0].componentType && data?.componentDetails[0].units) ? <>
                                    {data?.componentDetails?.map((field, index) => (
                                        <Grid container item spacing={1} key={index}>
                                            <Grid item >
                                                <Stack alignItems='flex-end' >
                                                    <Typography fontSize={13} >
                                                        {(field?.componentType && field?.units) &&
                                                            field?.componentType + ' :'}
                                                    </Typography >
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <Stack  >
                                                    <Typography fontSize={13}>
                                                        {(field?.componentType && field?.units) &&
                                                            field?.units + ' Units'}
                                                    </Typography >
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    ))}

                                </> : <Grid item>
                                    <Typography fontSize={13}>
                                        N/A
                                    </Typography >
                                </Grid>
                                }
                            </Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <LoadingButton variant='contained' onClick={onClick}>
                                    Raise Request
                                </LoadingButton>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
        </FormWrapper >
    );
}

