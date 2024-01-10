import { useEffect, useState } from 'react';
import { Chip, InputLabel, OutlinedInput, Stack, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { restrict } from 'utils/restrict';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { enrollmentEnrolAbhaAddress, enrollmentEnrolSuggestion } from 'pages/api/abha-creation';
import Footer from './Footer';

export default function StepFourAbhaAddressCreation({ onClose }) {
  const { txnId, handleNextStep, handleIsValidStep } = useAbhaCreationStore();

  const [abhaAddress, setAbhaAddress] = useState('');

  const { data: suggestions } = useQuery({
    queryKey: ['enrollmentEnrolSuggestion', { txnId }],
    queryFn: enrollmentEnrolSuggestion,
  });

  useEffect(() => {
    if (abhaAddress.length >= 6) {
      handleIsValidStep(true);
    } else {
      handleIsValidStep(false);
    }
  }, [abhaAddress]);

  const mutation = useMutation({
    mutationFn: enrollmentEnrolAbhaAddress,
    onSuccess: () => {
      handleNextStep();
    },
    onError: (error) => {
      toast.error('Failed to send OTP, please try again!');
      console.log(error);
    },
  });

  function handleNext() {
    const req = {
      txnId,
      abhaAddress,
      preferred: 0,
    };
    mutation.mutate(req);
  }

  return (
    <>
      <Box minHeight={300}>
        <Typography variant='h6'> Create you unique ABHA address</Typography>
        <Typography variant='subtitle1'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime magnam obcaecati expedita
          aliquid quisquam sit ullam molestias at dolorum ab.
        </Typography>
        <Typography variant='subtitle1'>
          Lorem ipsum dolor sit amet, ullam molestias at dolorum ab.
        </Typography>
        <Box mt={2}>
          <InputLabel required>
            <Typography variant='subtitle2' component='span'>
              Enter ABHA address
            </Typography>
          </InputLabel>
          <OutlinedInput
            placeholder='Enter unique address or select any suggested name'
            onInput={restrict.abhaAddress}
            sx={{
              p: 0,
              pl: 2,
              minWidth: 600,
              '& .MuiOutlinedInput-input': { fontSize: '1rem', padding: 0 },
            }}
            value={abhaAddress}
            onChange={(e) => setAbhaAddress(e.target.value)}
            endAdornment={
              <Stack
                sx={{
                  backgroundColor: 'lightgrey',
                  px: 2,
                  ml: 2,
                }}
              >
                <Typography variant='subtitle1' height='36px' marginTop='8px'>
                  @sbx
                </Typography>
              </Stack>
            }
          />
          <Box mt={1}>
            <Typography variant='subtitle2' component='span'>
              Suggestions:
            </Typography>
            &nbsp;&nbsp;
            {suggestions?.length
              ? suggestions.map((suggestedName) => (
                  <Chip
                    onClick={() => setAbhaAddress(suggestedName)}
                    sx={{ mr: 1, cursor: 'pointer' }}
                    title={suggestedName}
                    variant='outlined'
                    size='small'
                    label={suggestedName}
                    key={suggestedName}
                  />
                ))
              : 'No suggestion found! '}
          </Box>
        </Box>
      </Box>
      <Footer onClose={onClose} handleNextCb={handleNext} isLoading={mutation.isPending} />
    </>
  );
}
