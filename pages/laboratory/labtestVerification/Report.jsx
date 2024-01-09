import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LabReportDialog from 'components/LabReportDialog';
import ahmis1 from 'assets/Images/ahmis1.png';
import { useQuery } from '@tanstack/react-query';
import { labTestResultPrintById } from 'pages/api/lab';
import React, { useEffect, useState } from 'react';
import { groupBy } from 'utils/lodash';
export default function Report({ onClose, row }) {
  const [groupedTest, setGroupTest] = useState({});
  const [singleTest, setSingleTest] = useState([]);
  const { data } = useQuery({
    queryKey: ['labTestResultPrintById', row?.consultationId],
    queryFn: labTestResultPrintById,
    enabled: !!row?.consultationId,
  });
  console.log(data, 'data');

  useEffect(() => {
    let mappedData = groupBy(data?.labReport || [], (obj) => obj.groupTestName);
    const { NA, ...others } = mappedData;
    setGroupTest(others);
    if (NA) {
      setSingleTest([...NA]);
    }
  }, [data]);
  console.log(groupedTest, singleTest, 'groupedData');
  return (
    <LabReportDialog onClose={onClose} maxWidth='lg' patientData={data} fullWidth>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant='h6'>{data?.patientName}</Typography>
          <Typography variant='body1'>Age: 21</Typography>
          <Typography variant='body1'>Gender: {data?.gender}</Typography>
          <Typography variant='body1'>
            Ref. By: Dr. <b>{data?.doctorName}</b>
          </Typography>
        </Grid>

        <Grid item xs={4} textAlign='right'>
          <Typography variant='body1'>
            <b style={{ fontWeight: 600 }}>Order Date</b>: {data?.registeredOn}
          </Typography>
          <Typography variant='body1'>
            <b style={{ fontWeight: 600 }}>Collected on</b>: {data?.collectedOn}
          </Typography>
          <Typography variant='body1'>
            <b style={{ fontWeight: 600 }}>Reported on</b>: {data?.registeredOn}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer sx={{ position: 'relative', mt: 2 }}>
        <img
          src={ahmis1}
          alt='img'
          style={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            zIndex: 0,
            opacity: 0.2,
            width: '120px',
            height: '120px',
          }}
        />
        <Table
          size='small'
          className='reportTanle'
          sx={{
            border: 0,
            '&.reportTanle tbody tr td': { border: 'none' },
            zIndex: 2,
            position: 'relative',
          }}
          id='my-table'
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Investigation
              </TableCell>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Result
              </TableCell>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Reference Value
              </TableCell>
              <TableCell
                sx={{
                  background: 'white',
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Unit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedTest)?.map(([key, values]) => (
              <React.Fragment key={key}>
                <TableRow>
                  <TableCell colSpan={4} style={{ fontWeight: 700 }}>
                    {key}
                  </TableCell>
                </TableRow>
                {values.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item?.labTestName}</TableCell>
                    <TableCell>{item?.testResult}</TableCell>
                    <TableCell>
                      {Number(item?.minValue)}-{Number(item?.maxValue)}
                    </TableCell>
                    <TableCell>{item?.unit}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}

            {singleTest.length > 0 && (
              <>
                <TableRow sx={{ borderTop: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                  <TableCell colSpan={4}></TableCell>
                </TableRow>
                {singleTest.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item?.labTestName}</TableCell>
                    <TableCell>{item?.testResult}</TableCell>
                    <TableCell>
                      {Number(item?.minValue)}-{Number(item?.maxValue)}
                    </TableCell>
                    <TableCell>{item?.unit}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                style={{ fontSize: 12 }}
                sx={{ borderTop: (theme) => `1px solid ${theme.palette.grey[200]}` }}
              >
                Thanks for Reference
              </TableCell>
              <TableCell
                style={{ fontSize: 12 }}
                colSpan={3}
                sx={{ borderTop: (theme) => `1px solid ${theme.palette.grey[200]}` }}
              >
                ***End of Report***
              </TableCell>
            </TableRow>
            <TableRow style={{ paddingTop: '100px' }}>
              <TableCell
                style={{
                  fontSize: 12,
                  paddingTop: '100px',
                  verticalAlign: 'bottom',
                  // borderBottom: 0,
                }}
                colSpan={4}
                align='right'
              >
                Doctor Signature
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </LabReportDialog>
  );
}
