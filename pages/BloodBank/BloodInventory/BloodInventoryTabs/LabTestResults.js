import { Avatar, Card, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { BiotechRounded, Close, VolunteerActivismRounded } from '@mui/icons-material';

export default function LabTestResults({ data, onClose }) {

    const details = (title, date) => {
        return (
            <Grid container spacing={1}>
                <Grid item>
                    <Avatar >
                        <BiotechRounded />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Stack>
                        <Typography >
                            {title}
                        </Typography>
                        <Typography variant="caption">{date}</Typography>
                        <Typography variant="caption" color='primary' style={{ textDecoration: 'underline' }} >
                            Check Details
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        );
    };
    return (
        <Card  >
            <Grid container justifyContent='center' alignItems='center' spacing={1}>
                <Grid container justifyContent='right' padding={1}>
                    <IconButton size='small' onClick={onClose}>
                        <Close fontSize='medium' />
                    </IconButton>
                </Grid>
                <Grid container paddingLeft={3} spacing={1}>
                    <Grid item>
                        <Avatar >
                            <VolunteerActivismRounded />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography fontWeight='bold'>
                            {data?.donorRegistrationNumber}
                        </Typography>
                        <Typography>
                            {data?.donorName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item paddingBottom={2}>
                    <Card style={{ borderRadius: 2, padding: 10 }}>
                        <Grid container spacing={1} >
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13} >
                                    Type of Blood
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    Plasma
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13}>
                                    Date of Expiry
                                </Typography>
                                <Typography textAlign='center' fontSize={13}>
                                    20 Oct 2024
                                </Typography>
                            </Grid>
                            <Grid item> <Divider orientation='vertical' /></Grid>
                            <Grid item>
                                <Typography fontWeight='bold' textAlign='center' fontSize={13} >
                                    Expires in
                                </Typography >
                                <Typography textAlign='center' fontSize={13}>
                                    7 Days
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}> <Divider orientation='horizontal' /></Grid>
                <Grid container spacing={1} paddingLeft={3} paddingTop={2}>
                    <Grid item padding={1}>
                        <Typography fontWeight='bold'>
                            Lab Test Results
                        </Typography>
                    </Grid>
                    <Grid item>
                        {details('Hepatitis B virus(HBV)', '21 Sep 2023, 11:35AM')}
                    </Grid>
                    <Grid item>
                        {details('HIV (Types 1 & 2)', '21 Oct 2023, 12:35AM')}
                    </Grid>
                    <Grid item>
                        {details('Human T-Lymphotropic virus', '13 Sep 2023, 10:35AM')}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}