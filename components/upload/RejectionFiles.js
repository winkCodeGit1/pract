import PropTypes from 'prop-types';
// @mui
import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils

// ----------------------------------------------------------------------

RejectionFiles.propTypes = {
  fileRejections: PropTypes.array,
};

export default function RejectionFiles({ fileRejections }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path } = file;

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant='subtitle2' noWrap>
              {/* {path} - {fData(size)} */}
            </Typography>

            {errors.map((error) => (
              <Typography key={error.code} variant='caption' component='p'>
                - {error.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
