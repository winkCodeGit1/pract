import { Box, Dialog } from '@mui/material';

const About = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose} maxWidth='sm' fullWidth>
      <Box minHeight={330}>About</Box>
    </Dialog>
  );
};

export default About;
