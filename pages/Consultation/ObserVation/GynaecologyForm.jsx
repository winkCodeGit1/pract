/* eslint-disable no-unused-vars */
import ExposureIcon from '@mui/icons-material/Exposure';
import { Button, Card, CardHeader, Grid, IconButton, ToggleButton } from '@mui/material';
import {
  FormProvider,
  RHFTextarea,
  RHFToggleButton,
  RHFToggleButtonChipVariant,
} from 'components/hook-form';

import { toggleButtonGroupStyle, toggleButtonStyle } from 'utils/cssStyles';
import { useForm } from 'react-hook-form';

import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPerSpeculumCervixData, saveGynaecology } from 'pages/api/consultation/observations';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';

const defaultValues = {
  perSpeculumCervixId: '',
  notes: '',
  status: true,
  staffId: 1,
  registrationId: 25,
};
export default function GynaecologyForm() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [showNote, setShowNote] = useState({});

  const handleShowNote = (index) => {
    if (showNote[index]) {
      setShowNote((ps) => ({ ...ps, [index]: '' }));
    } else {
      setShowNote((ps) => ({ ...ps, [index]: true }));
    }
  };

  const { data: perSpeculumCervixData } = useQuery({
    queryKey: ['fetchPerSpeculumCervixData'],
    queryFn: fetchPerSpeculumCervixData,
    placeholderData: [],
  });
  const mutation = useMutation({
    mutationFn: (req) => saveGynaecology({ req }),
    onSuccess: () => {
      toast(saveMessage);
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });
  const onSave = async (data) => {
    console.log(data, '...data');

    const selectedId = perSpeculumCervixData.find(
      (el) => el.perSpeculumCervixType === data.perSpeculumCervixId
    )?.id;

    const req = {
      ...data,
      notes: data.notes,
      status: data.status,
      perSpeculumCervixId: selectedId,
    };
    console.log(req, '---req');
    mutation.mutate(req);
  };
  console.log(errors, 'errors');

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
      <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
        <CardHeader
          disableTypography
          sx={{
            padding: '3px 13px',
            background: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
            fontSize: '17px',
          }}
          title='Gynaecology'
        />

        <Grid container spacing={2} alignItems='center' marginBottom='20px'>
          <Grid item xs={2} textAlign='right' padding={'15px'}>
            P/S(Per Speculum)-Cervix
          </Grid>
          <Grid item xs={8}>
            <RHFToggleButton
              name='perSpeculumCervixId'
              sx={{ ...toggleButtonGroupStyle, justifyContent: 'left' }}
              exclusive
            >
              {perSpeculumCervixData.map((item) => (
                <ToggleButton
                  key={item.perSpeculumCervixId}
                  value={item?.perSpeculumCervixType}
                  size='small'
                  sx={{
                    ...toggleButtonStyle,

                    wordBreak: 'keep-all',
                  }}
                >
                  {item.perSpeculumCervixType}
                </ToggleButton>
              ))}
              <RHFToggleButtonChipVariant minimumOne name='status' exclusive>
                <ToggleButton value={true} size='small' color='success'>
                  VIA +ve
                </ToggleButton>
                <ToggleButton value={false} size='small' color='error'>
                  VIA -ve
                </ToggleButton>
              </RHFToggleButtonChipVariant>
            </RHFToggleButton>
          </Grid>
          <Grid item xs={2} textAlign='right'>
            <IconButton onClick={() => handleShowNote(0)}>
              <ExposureIcon />
            </IconButton>
          </Grid>

          {showNote[0] && (
            <>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
                <RHFTextarea
                  sx={{ maxWidth: '600px', width: '100%', marginTop: '5px', marginLeft: '20px' }}
                  multiline
                  minRows={2}
                  placeholder='Notes'
                  name='notes'
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid item display='flex' direction='row' spacing={2} justifyContent='flex-end'>
          <Button size='medium' variant='contained' onClick={handleSubmit(onSave)}>
            Submit
          </Button>
        </Grid>
      </Card>
    </FormProvider>
  );
}
