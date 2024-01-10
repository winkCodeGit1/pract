import { useQuery } from '@tanstack/react-query';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { profileAccountAbhaCard, profileAccountQrCode } from 'pages/api/abha-creation';
import Footer from './Footer';
import { Stack, Typography } from '@mui/material';

export default function StepFiveViewProfile({ onClose }) {
  return (
    <>
      <Stack spacing={4} minHeight={300}>
        <Stack>
          <Typography variant='h6' color='primary'>
            ABHA CARD
          </Typography>
          <AbhaCard />
        </Stack>
        <Stack>
          <Typography variant='h6' color='primary'>
            QR CODE
          </Typography>
          <QrCode />
        </Stack>
      </Stack>
      <Footer onClose={onClose} />
    </>
  );
}
function QrCode() {
  const { xToken } = useAbhaCreationStore();

  const { data: qrCode, isSuccess } = useQuery({
    queryKey: ['profileAccountQrCode', { xToken }],
    queryFn: profileAccountQrCode,
  });

  if (isSuccess && qrCode) {
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(qrCode)))}`;

    return (
      <div>
        <object type='image/png' data={dataUrl}>
          Your browser does not support the object tag.
        </object>
      </div>
    );
  }

  return <div>Loading QrCode...</div>;
}

function AbhaCard() {
  const { xToken } = useAbhaCreationStore();

  const { data: abhaCard, isSuccess } = useQuery({
    queryKey: ['profileAccountAbhaCard', { xToken }],
    queryFn: profileAccountAbhaCard,
  });

  if (isSuccess && abhaCard) {
    const dataUrl = `data:image/png;base64,${btoa(
      String.fromCharCode(...new Uint8Array(abhaCard))
    )}`;

    return (
      <div>
        <object type='image/png' data={dataUrl}>
          Your browser does not support the object tag.
        </object>
      </div>
    );
  }

  return <div>Loading Abha Card...</div>;
}
