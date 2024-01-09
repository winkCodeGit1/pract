import { Email, Person, PhoneAndroid, VerifiedUser } from '@mui/icons-material';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { ProfileBackground } from 'assets';
import MyAvatar from 'components/MyAvatar';
import useAuth from 'hooks/useAuth';

const Profile = ({ onClose }) => {
  const { user } = useAuth();

  return (
    <Dialog open onClose={onClose} maxWidth='xs' fullWidth>
      <Box
        sx={{
          position: 'relative',
          pb: 4,
        }}
      >
        <Box sx={{ position: 'absolute', width: '100%' }}>
          <ProfileBackground />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <MyAvatar sx={{ height: 100, width: 100, fontSize: 52 }} />

          <Typography align='center' variant='h3'>
            {user?.username}
          </Typography>
          <Typography align='center' variant='body2' color='text.secondary'>
            {user?.roles[0]}
          </Typography>
        </Box>
        <Box px={5} pt={2}>
          <Stack display='flex' flexDirection='row' spacing={2} alignItems='flex-end'>
            <Stack>
              <Person color='primary' />
            </Stack>
            <Stack>
              <Typography style={{ paddingLeft: '30px' }}>some text hj ksdbj,</Typography>
            </Stack>
          </Stack>

          <Stack display='flex' flexDirection='row' spacing={2} alignItems='flex-end'>
            <Stack>
              <Email color='primary' />
            </Stack>
            <Stack>
              <Typography style={{ wordBreak: 'break-all', paddingLeft: '30px' }}>
                {user?.email || 'demo@bel.com'}
              </Typography>
            </Stack>
          </Stack>

          <Stack display='flex' flexDirection='row' spacing={2} alignItems='flex-end'>
            <Stack>
              <PhoneAndroid color='primary' />
            </Stack>
            <Stack>
              <Typography style={{ paddingLeft: '30px' }}>
                {user?.mobileNo || user?.username || 'NA'}
              </Typography>
            </Stack>
          </Stack>

          <Stack display='flex' flexDirection='row' spacing={2} alignItems='flex-end'>
            <Stack>
              <VerifiedUser color='success' />
            </Stack>
            <Stack>
              <Typography style={{ paddingLeft: '30px' }}>
                You have logged in successfully!
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Profile;
