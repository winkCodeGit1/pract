import { Button, Grid, Stack, Typography } from '@mui/material';

const circleButtonStyle = {
  borderRadius: '50%',
  width: '90px',
  height: '90px',
};

class generatertoken {
  constructor(i) {
    this.count = i;
  }

  generateToken() {
    return {
      label: `Token${this.count}`,
      id: new Date().getMilliseconds(),
      patientName: `Token${this.count}`,
      counter: 'c0',
      createdAt: new Date(),
    };
  }
}
let count = 0;
export function GenerateToken({ isToken }) {
  let token = new generatertoken(count + 1);
  const GenerateToken = () => {
    isToken((prevtoken) => [...prevtoken, token.generateToken(++count)]);
  };

  return (
    <Grid item xs={12} md={12}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          alignItems: 'center',
          flexDirection: 'column',
          margin: 'auto auto',
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='center'
          sx={{ mt: 12 }}
        >
          <Button
            variant='contained'
            color='primary'
            sx={circleButtonStyle}
            onClick={GenerateToken}
          ></Button>
        </Stack>
        <Typography>Generate Token</Typography>
      </div>
    </Grid>
  );
}
