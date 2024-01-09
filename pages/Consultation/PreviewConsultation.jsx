import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import ahmis1 from '../../assets/Images/ahmis1.png';
import leaf from '../../assets/Images/leaf.png';
import useAuth from 'hooks/useAuth';
import { useFormContext } from 'react-hook-form';
import { viewDateFormat } from 'utils/date';
import { LoadingButton } from '@mui/lab';

export default function PreviewConsultation({ onClose, addedMedicines, onSubmit, loading }) {
  const { user } = useAuth();
  const theme = useTheme();
  const { getValues } = useFormContext();
  console.log(getValues(), 'getValues');

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      maxWidth='lg'
      fullWidth
    >
      <DialogTitle>
        <Grid container alignItems='center'>
          <Grid item xs={2}>
            <img src={ahmis1} alt='AHMIS' />
          </Grid>
          <Grid item xs={8} align='center'>
            {user?.orgName && <label>{user?.orgName}</label>}
            <br />
            {user?.orgAddress && <label>{user?.orgAddress}</label>}
          </Grid>
          <Grid item xs={2} align='center'>
            <img src={leaf} alt='logo' />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='subtitle1'>Complaints & observation</Typography>
        <Typography component='span' variant='subtitle2'>
          Chief Complaints :{' '}
        </Typography>
        <Typography variant='body2' component='span'>
          {getValues('complain')}
        </Typography>
        <br />
        <Typography component='span' variant='subtitle2'>
          Chief Complaints Notes :{' '}
        </Typography>
        <Typography variant='body2' component='span'>
          {getValues('complainNote')}
        </Typography>
        <br />
        <Typography component='span' variant='subtitle2'>
          Examination Notes :{' '}
        </Typography>
        <Typography variant='body2' component='span'>
          {getValues('ExaminationNotes')}
        </Typography>
        <Divider />
        {addedMedicines?.length > 0 && (
          <>
            <fieldset
              style={{
                padding: '8px 8px',
                border: `1px solid ${theme.palette.grey[400]}`,
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <legend>
                <Typography variant='subtitle2'>Prescription</Typography>
              </legend>

              <TableContainer sx={{ mb: 1.3 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Drug name</TableCell>
                      <TableCell>UoM</TableCell>
                      <TableCell>Number of Days</TableCell>
                      <TableCell>Interval</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>AF/BF</TableCell>
                      <TableCell>Total Quantity</TableCell>
                      <TableCell>Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedMedicines.length > 0 ? (
                      addedMedicines?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.medicineNameId?.MedicineName}</TableCell>
                          <TableCell>{item.dosage}</TableCell>
                          <TableCell>{item.noDays}</TableCell>
                          <TableCell>{item.drugIntervalId?.drugIntervalName}</TableCell>
                          <TableCell>{item.dosage}</TableCell>
                          <TableCell>{item.isBf === '1' ? 'AF' : 'BF'}</TableCell>
                          <TableCell>{item.totalQuantity}</TableCell>
                          <TableCell>{item.remarks}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align='center'>
                          No Data
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography component='span' variant='subtitle2'>
                Note:&nbsp;
              </Typography>
              {getValues('prescriptionNote')}
            </fieldset>
          </>
        )}
        <fieldset
          style={{
            padding: '8px 8px',
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <legend>
            <Typography variant='subtitle2'>Clinical History</Typography>
          </legend>

          <Typography variant='body1'>Past History</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>disease</TableCell>
                  <TableCell>status</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getValues('patientHistory')?.pastHistory.filter(
                  (item) => !(item.status === undefined || item.status === null)
                )?.length > 0 ? (
                  getValues('patientHistory')
                    ?.pastHistory.filter(
                      (item) => !(item.status === undefined || item.status === null)
                    )
                    ?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.disease}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{viewDateFormat(item.year)?.split('-')[2] || '-'}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align='center'>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Typography component='span' variant='subtitle2'>
                Remark:&nbsp;
              </Typography>
              {getValues('patientHistory')?.pastHistoryRemark}
            </Grid>
            <Grid item xs={3}>
              <Typography component='span' variant='subtitle2'>
                Surgical History:&nbsp;
              </Typography>
              {getValues('patientHistory')?.surgicalHistory}
            </Grid>
            <Grid item xs={3}>
              <Typography component='span' variant='subtitle2'>
                Vaccination History: &nbsp;
              </Typography>
              {getValues('patientHistory')?.vaccinationHistory}
            </Grid>
          </Grid>

          <Typography variant='body1' sx={{ mt: 1.5 }}>
            Personal History
          </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>disease</TableCell>
                  <TableCell>status</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Consumption</TableCell>
                  <TableCell>FreQuency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getValues('patientHistory')?.personalHistory.filter(
                  (item) => !(item.status === undefined || item.status === null)
                )?.length > 0 ? (
                  getValues('patientHistory')
                    ?.personalHistory.filter(
                      (item) => !(item.status === undefined || item.status === null)
                    )
                    ?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.historyDataName}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{viewDateFormat(item.year)?.split('-')[2] || '-'}</TableCell>
                        <TableCell>{item.consumption}</TableCell>
                        <TableCell>{item.frequency}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align='center'>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant='body1' sx={{ mt: 1.5 }}>
            Family History
          </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>disease</TableCell>
                  <TableCell>Father</TableCell>
                  <TableCell>Mother</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getValues('patientHistory')?.familyHistory.filter(
                  (item) => item.fatherStatus !== null || item.motherStatus !== null
                )?.length > 0 ? (
                  getValues('patientHistory')
                    ?.familyHistory.filter(
                      (item) => item.fatherStatus !== null || item.motherStatus !== null
                    )
                    ?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.historyDataName}</TableCell>
                        <TableCell>{item.fatherStatus}</TableCell>
                        <TableCell>{item.motherStatus}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align='center'>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography component='span' variant='subtitle2'>
            Remark:&nbsp;
          </Typography>
          {getValues('patientHistory')?.familyHistoryRemark || '-'}

          <Typography component='span' variant='subtitle2' align='right' sx={{ ml: 4 }}>
            Consanguineous Marriage:{' '}
            <span
              style={{
                color:
                  getValues('patientHistory')?.maritalStatus === 'Yes'
                    ? 'green'
                    : getValues('patientHistory')?.maritalStatus === 'No'
                    ? 'red'
                    : 'black',
              }}
            >
              {getValues('patientHistory').maritalStatus || 'N/A'}
            </span>
          </Typography>
        </fieldset>
        <fieldset
          style={{
            padding: '8px 8px',
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <legend>
            <Typography variant='subtitle2'>Diagnosis</Typography>
          </legend>
          <Typography variant='body1'>Additional Diagnosis</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Certainty</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getValues('diagnosis')?.additionalDiagnosis.length > 0 ? (
                  getValues('diagnosis')?.additionalDiagnosis?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.name?.label}</TableCell>
                      <TableCell>{item?.certainty}</TableCell>
                      <TableCell>{item?.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align='center'>
                      No Medecines
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {getValues('diagnosis')?.finalDiagnosis?.name && (
            <>
              <Typography variant='body1'>Final Diagnosis</Typography>
              <TableContainer>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Diagnosis</TableCell>
                      <TableCell>Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {getValues('diagnosis')?.finalDiagnosis?.name?.diagTerm || '-'}
                      </TableCell>
                      <TableCell>
                        {getValues('diagnosis')?.finalDiagnosis?.remarks || '-'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </fieldset>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} variant='contained' color='error'>
          Close
        </Button>
        <LoadingButton variant='contained' color='primary' onClick={onSubmit} loading={loading}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
