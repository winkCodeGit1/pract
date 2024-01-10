/** @format */

import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import MainHeader from 'layouts/main/MainHeader';
import AppointmentForm from './AppointmentForm';

export default function AssistantRegistration() {
  const theme = useTheme();
  return (
    <>
      <MainHeader isStaffLoginVal={true} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
        }}
      >
        <Container maxWidth='xl'>
          <AppointmentForm isSelf={false} />
        </Container>
      </Box>
    </>
  );
}
