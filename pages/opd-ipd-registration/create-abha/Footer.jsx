import { Divider, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';

export default function Footer({ onClose, handleNextCb, isLoading }) {
  const { activeStep, isCurrentStepValid } = useAbhaCreationStore();

  return (
    <>
      <Divider flexItem sx={{ borderStyle: 'dashed', pt: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 1 }}>
        <Button variant='contained' color='inherit' onClick={onClose} sx={{ mr: 1 }}>
          Close
        </Button>

        {activeStep !== 4 && (
          <LoadingButton
            disabled={!isCurrentStepValid}
            loading={isLoading}
            variant='contained'
            color='primary'
            onClick={handleNextCb}
          >
            Next
          </LoadingButton>
        )}

        {/* <Button onClick={handleNextStep}>FORCE NEXT</Button> */}
      </Box>
    </>
  );
}
