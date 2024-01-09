import { Avatar, Card, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import bloodbag from 'assets/Images/bloodbank/bloodbag.png';
import BasicTabs from 'components/Tabs';
import { BloodtypeRounded, Close, VolunteerActivismRounded } from '@mui/icons-material';
import BloodTimelineTab from './BloodTimelineTab';
import ComingSoon from 'pages/ComingSoon';

export default function BloodBagTimeline({ data, onClose }) {
    const TABLIST = [
        {
            label: 'Blood Journey Timeline', component: <BloodTimelineTab />
        },
        { label: 'Donors Details', component: <ComingSoon height={200} /> },
    ];
    return (
        <Card  >
            <Grid container justifyContent='center' alignItems='center' spacing={1}>
                <Grid container justifyContent='right' padding={1}>
                    <IconButton size='small' onClick={onClose}>
                        <Close fontSize='medium' />
                    </IconButton>
                </Grid>
                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                    <img alt='Blood-Bag' src={bloodbag}
                        style={{ height: '50%', width: '50%' }} />
                </Grid>
                <Avatar >
                    <VolunteerActivismRounded />
                </Avatar>
                <Grid item>
                    <Typography fontWeight='bold'>
                        {data?.donorRegistrationNumber}
                    </Typography>
                    <Typography>
                        {data?.donorName} 
                    </Typography>
                </Grid>
                <Grid item>
                    <Card style={{ borderRadius: 2, padding: 10 }}>
                        <Grid container spacing={1} >
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
                                <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                    Type of Blood
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    Whole Blood
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13} >
                                    Unit No.
                                </Typography >
                                <Typography textAlign='center' fontSize={13}>
                                    04
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item>
                    <Card style={{ borderRadius: 2, padding: 10 }}>
                        <Grid container spacing={1} >
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                    Date of Collection
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    08 July 2023
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                    Blood Bag No.
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    #BID_1258879344
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item >
                    <BasicTabs tabList={TABLIST || undefined} />
                </Grid>
            </Grid>
        </Card>
    );
}

