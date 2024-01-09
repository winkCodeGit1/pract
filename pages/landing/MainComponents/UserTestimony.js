import { useState } from 'react';
import { Card, Typography, Rating, Stack, Box } from '@mui/material/';
import { styled } from '@mui/material/styles';

const Item = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '16px 20px',
  margin: 12,
  [theme.breakpoints.down('lg')]: {
    padding: '8px 12px',
    margin: 8,
  },
}));

export default function UserTestimony() {
  const [value, setValue] = useState(2);

  return (
    <Box pt={4} mx={{ xs: 2, md: 4 }}>
      <Typography align='center' color='primary' variant='h5'>
        User Testimonials
      </Typography>
      <Stack flexDirection={{ md: 'row' }} justifyContent='center' alignItems='center'>
        <Item>
          <Typography variant='subtitle1'>Ganesh Praval</Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            style={{ textAlign: 'justify' }}
          >
            Great medical office, wonderful and warm experience from start to finish. Appreciate Dr.
            Ravikant taking time to go over the diagnosis clearly and treatment options. Was
            referred over by my general doctor and can see why. Highly recommended.
          </Typography>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Item>

        <Item>
          <Typography variant='subtitle1'>Pavitra Pujari</Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            style={{ textAlign: 'justify' }}
          >
            Dr. Salma did a great job with my first ever health exam. She explained everything to me
            in a very clear manner. She was also kind and friendly. All of the staff was great –
            they were helpful, patient and helped with my insurance.
          </Typography>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Item>

        <Item>
          <Typography variant='subtitle1'>Misbha Warangle</Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            style={{ textAlign: 'justify' }}
          >
            Wonderful experience. Dr. Mallik was a wonderful surgeon, and the staff was always
            helpful and kind. They ensured I had a smooth prep, surgery, and follow-up. I am so glad
            I chose it and would highly recommend to anyone.
          </Typography>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Item>
      </Stack>
    </Box>
  );
}
