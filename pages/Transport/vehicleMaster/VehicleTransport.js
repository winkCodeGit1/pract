/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  TableHead,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '6px',
  border: `1px solid ${theme.palette.grey[300]}`,
  '&.MuiTableCell-root:first-of-type': {
    paddingLeft: '6px',
  },
}));
export default function VehicleTransport() {
  return (
    <div>
      <TableContainer>
        <Table align='left' size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={8} align='center'>
                <Typography variant='h6'>Vehicle Transport Form</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell size='small'>Registration No</StyledTableCell>
              <StyledTableCell align='left' colSpan={3}>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Registration No.'
                  fullWidth
                />
              </StyledTableCell>
              <StyledTableCell>Class of Vehicle</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Class of Vehicle'
                  fullWidth
                />
              </StyledTableCell>
              <StyledTableCell>Year of Manufacture</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Year of Manufacture'
                  fullWidth
                />
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell size='small'>Model</StyledTableCell>
              <StyledTableCell align='left'>
                <TextField variant='standard' size='small' placeholder='Model' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Make</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Make' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Classis Number</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Classis Number' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Engine Number</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Engine Number' fullWidth />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell size='small'>Seating Capacity</StyledTableCell>
              <StyledTableCell align='left'>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Seating Capacity'
                  fullWidth
                />
              </StyledTableCell>
              <StyledTableCell>Cylinder</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Cylinder' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Cubic Capacity</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Cubic Capacity' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Unladen Weight</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Unladen Weight' fullWidth />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell size='small'>Fuel Type</StyledTableCell>
              <StyledTableCell align='left'>
                <TextField variant='standard' size='small' placeholder='Fuel Type' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Color</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Color' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Main Tank Capacity</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Main Tank Capacity'
                  fullWidth
                />
              </StyledTableCell>
              <StyledTableCell>Reserved Tank Capacity</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Reserved Tank Capacity'
                  fullWidth
                />
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell size='small'>Wheel Base</StyledTableCell>
              <StyledTableCell align='left'>
                <TextField variant='standard' size='small' placeholder='Wheel Base' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Type Of Body</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Type Of Body' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Size Of Tyres</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Size Of Tyres' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Air Pressure (Front)/(Rear)</StyledTableCell>
              <StyledTableCell>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <TextField
                    variant='standard'
                    size='small'
                    placeholder='Front'
                    sx={{ width: '100px' }}
                  />
                  <span style={{ fontSize: '19px', fontWeight: 600 }}>/</span>
                  <TextField
                    variant='standard'
                    size='small'
                    placeholder='Rear'
                    sx={{ width: '100px' }}
                  />
                </div>
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell size='small'>Battery Type</StyledTableCell>
              <StyledTableCell align='left'>
                <TextField variant='standard' size='small' placeholder='Battery Type' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Battery Number</StyledTableCell>
              <StyledTableCell>
                <TextField variant='standard' size='small' placeholder='Battery Number' fullWidth />
              </StyledTableCell>
              <StyledTableCell>Battery Voltage</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Battery Voltage'
                  fullWidth
                />
              </StyledTableCell>
              <StyledTableCell>Battery Company</StyledTableCell>
              <StyledTableCell>
                <TextField
                  variant='standard'
                  size='small'
                  placeholder='Battery Company'
                  fullWidth
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell size='small'>Remark</StyledTableCell>
              <StyledTableCell colSpan={7}>
                <TextField variant='standard' size='small' placeholder='Remark' fullWidth />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
