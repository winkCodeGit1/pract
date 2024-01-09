import { Avatar, Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material';
import BasicTabs from 'components/Tabs';
import { Close, VolunteerActivismRounded } from '@mui/icons-material';
import ComingSoon from 'pages/ComingSoon';
import RequiredComponentsTab from './RequiredComponentsTab';

export default function BloodRequestsTimeline({ data, onClose }) {
    const TABLIST = [
        {
            label: 'Required Components', component: <RequiredComponentsTab />
        },
        { label: 'Required History', component: <ComingSoon height={200} /> },
    ];
    return (
        <Card  >
            <Grid container justifyContent='center' alignItems='center' spacing={1}>
                <Grid container justifyContent='right' padding={1}>
                    <IconButton size='small' onClick={onClose}>
                        <Close fontSize='medium' />
                    </IconButton>
                </Grid>
                <Grid container paddingLeft={4} spacing={1}>
                    <Grid item>
                        <Avatar >
                            <VolunteerActivismRounded />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight='bold'>
                            {data?.bookingId}
                        </Typography>
                        <Typography>
                            {data?.procedureName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card style={{ borderRadius: 2, padding: 10, marginInline: 20 }}>
                        <Grid container spacing={2} xs={12}>
                            <Grid item xs={5} >
                                <Typography fontWeight='bold' fontSize={13}>
                                    Priority
                                </Typography>
                                <Grid   >
                                    <Box sx={{ bgcolor: 'purple', border: 2, borderColor:'ButtonHighlight' }} >
                                        <Typography textAlign='center' fontSize={13} color='whitesmoke'>
                                            HIGH
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item  > <Divider orientation='vertical' /></Grid>
                            <Grid item xs={5}>
                                <Typography fontWeight='bold' fontSize={13}>
                                    Status
                                </Typography>
                                <Grid   >
                                    <Box sx={{ bgcolor: 'skyblue', border: 2, borderColor: 'ButtonHighlight' }} >
                                        <Typography textAlign='center' fontSize={13} color='whitesmoke'>
                                            RAISED
                                        </Typography>
                                    </Box>
                                </Grid>
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

