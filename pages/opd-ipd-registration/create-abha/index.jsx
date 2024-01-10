import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import useAbhaCreationStore, { allSteps } from 'stores/useAbhaCreationStore';
import StepOneConsentCollection from './StepOne';
import StepTwoAadharAuthentication from './StepTwo';
import StepThreeCommunicationDetails from './StepThree';
import StepFourAbhaAddressCreation from './StepFour';
import StepFiveViewProfile from './StepFive';

function RenderActiveStep({ step, ...others }) {
  if (step === 0) {
    return <StepOneConsentCollection {...others} />;
  }
  if (step === 1) {
    return <StepTwoAadharAuthentication {...others} />;
  }
  if (step === 2) {
    return <StepThreeCommunicationDetails {...others} />;
  }
  if (step === 3) {
    return <StepFourAbhaAddressCreation {...others} />;
  }
  if (step === 4) {
    return <StepFiveViewProfile {...others} />;
  }
}

export default function CreateAbha({ onClose }) {
  const activeStep = useAbhaCreationStore((store) => store.activeStep);

  return (
    <Stack>
      <Stack>
        <Stepper activeStep={activeStep}>
          {allSteps.map((s) => {
            return (
              <Step key={s.label}>
                <StepLabel>{s.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Stack>
      <Stack sx={{ px: 1, pt: 2 }}>
        <RenderActiveStep step={activeStep} onClose={onClose} />
      </Stack>
    </Stack>
  );
}
