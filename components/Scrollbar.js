import { Box } from '@mui/material';
export const scrollStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#f0f0f0',
    transition: 'background-color 0.3s',
  },

  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: 'darkgray',
  },

  '&::-webkit-scrollbar-track': {
    // backgroundColor: 'white',
  },
};

export default function Scrollbar({ children, sx, ...other }) {
  return (
    <Box
      style={{ height: '100%', overflow: 'auto' }}
      sx={{
        ...sx,
        ...scrollStyle,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
