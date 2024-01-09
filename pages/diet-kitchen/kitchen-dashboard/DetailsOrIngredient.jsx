import { Box, Typography } from '@mui/material';
import DialogBox from 'components/DialogBox';

const DetailsOrIngredient = ({ onClose }) => {
  return (
    <DialogBox maxWidth='md' fullWidth onClose={onClose} title='Details (Ingredients)'>
      <Box>
        <Typography align='center' variant='h6' color='error'>
          This is the Details to all the ingredients.
        </Typography>
      </Box>
    </DialogBox>
  );
};

export default DetailsOrIngredient;
