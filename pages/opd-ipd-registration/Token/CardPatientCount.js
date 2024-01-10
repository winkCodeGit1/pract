import PropTypes from 'prop-types';
import { Box, Card, Typography, CardContent } from '@mui/material';
import Scrollbar from 'components/Scrollbar';

export default function CardPatientCount({ tokens }) {
  return (
    <>
      <Scrollbar
        sx={{
          maxHeight: '450px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            columnGap: 1,
            rowGap: '11px',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            // border: (theme) => `1px solid ${theme.palette.grey[400]}`
          }}
        >
          {!!tokens.length &&
            tokens?.map((value, index) => (
              <PostContent
                key={index}
                title={value.patientName}
                Counter={value.counter}
                index={index}
                id={value.id}
              />
            ))}
        </Box>
      </Scrollbar>
    </>
  );
}

PostContent.propTypes = {
  comment: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ title, id }) {
  return (
    <Card sx={{ minWidth: 275, margin: '5px 2px' }} elevation={0}>
      <CardContent
        sx={{
          pt: 4.5,
          width: 1,
        }}
      >
        <Typography gutterBottom variant='h6' color='text.primary'>
          {title}
        </Typography>

        <Typography variant='h7' color='text.primary' sx={{ display: 'block' }}>
          ID:{id}
        </Typography>
      </CardContent>
    </Card>
  );
}
