import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const steps = [
    {
        label: 'Pre-Screening',
        description: 'In Progress',
    },
    {
        label: 'Blood Donation',
        description: 'In Progress',
    },
    {
        label: 'Blood Screening',
        description: 'In Progress',
    },
    {
        label: 'Blood Grouping',
        description: 'In Progress',
    },
];

export default function BloodTimelineTab() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const details = (date) => {
        return (
            <Stack>
                <Typography variant="caption">{date}</Typography>
                <Typography variant="caption" style={{ textDecoration: 'underline' }} >
                    Check Details
                </Typography>
            </Stack>
        );
    };

    return (
        // height: 140, overflowY: 'auto'
        <Box sx={{ mawidth: 400, paddingLeft: 2 }}>
            <Stepper sx={{}} activeStep={activeStep} orientation="vertical"  >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 0 ?
                                    details('21 Sep 2023, 11:35AM')
                                    : index === 1 ?
                                        details('08 Oct 2023, 2:44AM')
                                        : index === 2 ?
                                            details('10 Nov 2023, 8:15AM')
                                            : index === 3 ?
                                                details('8 Dec 2023, 9:12AM')
                                                : null}>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box >
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {
                activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 1 }}>
                        {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )
            }
        </Box >
    );
}
