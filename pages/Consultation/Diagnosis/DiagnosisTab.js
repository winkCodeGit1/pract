import {
  Grid,
  Table,
  IconButton,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';

import {
  RHFTextField,
  RHFToggleButtonChipVariant,
  RHFAutoCompleteVitrulized,
} from 'components/hook-form';

import { useQuery } from '@tanstack/react-query';
import { icdCodeGetAllIcdCodeByVersion } from 'pages/api/master';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import DeleteIcon from 'assets/DeleteIcon';

export default function DiagnosisTab({ stateName, isIpd }) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: stateName + '.additionalDiagnosis',
  });

  const { data: diagnosisList } = useQuery({
    queryKey: ['icdCodeGetAllIcdCodeByVersion'],
    queryFn: icdCodeGetAllIcdCodeByVersion,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Additional Diagnosis</TableCell>
                <TableCell>Certainty</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>
                  <IconButton
                    size='small'
                    color='primary'
                    onClick={() => {
                      append({ name: null, certainty: '', remarks: '' });
                    }}
                    disabled={watch('diagnosis')?.additionalDiagnosis?.length === 3}
                    variant='contained'
                  >
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {fields?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align='center'>
                    <RHFAutoCompleteVitrulized
                      name={`${stateName}.additionalDiagnosis[${index}].name`}
                      options={diagnosisList || []}
                      placeholder='Select Diagnosis'
                      size='small'
                      // sx={{ maxWidth: '300px', width: '100%' }}
                      fullWidth
                      getOptionDisabled={(option) =>
                        watch('diagnosis')?.additionalDiagnosis?.some(
                          (item) => item?.name?.id === option?.id
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <RHFToggleButtonChipVariant
                      name={`${stateName}.additionalDiagnosis[${index}].certainty`}
                      exclusive
                    >
                      <ToggleButton size='small' color='primary' value='Confirmed'>
                        Confirmed
                      </ToggleButton>
                      <ToggleButton size='small' color='primary' value='Presumed'>
                        Presumed
                      </ToggleButton>
                    </RHFToggleButtonChipVariant>
                  </TableCell>

                  <TableCell>
                    <RHFTextField
                      name={`${stateName}.additionalDiagnosis[${index}].remarks`}
                      maxRows={2}
                      multiline
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                      disabled={index === 0}
                    >
                      <DeleteIcon disable={index === 0 ? true : false} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {isIpd && (
        <Grid item xs={12} mt={2}>
          <Typography variant='h6'>Saved Additional Data </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields && fields.length > 0 ? (
                  fields?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.medicineNameId?.MedicineName}</TableCell>
                      <TableCell>{item.noDays}</TableCell>
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
        </Grid>
      )}

      <Grid item xs={12}>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Final Diagnosis</TableCell>

                <TableCell>Remark</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <RHFAutoCompleteVitrulized
                    name={stateName + '.finalDiagnosis.name'}
                    options={diagnosisList}
                    placeholder='Select Diagnosis'
                    size='small'
                    // sx={{ maxWidth: '300px', width: '100%' }}
                  />
                </TableCell>
                <TableCell colSpan={4}>
                  <RHFTextField
                    name={stateName + '.finalDiagnosis.remarks'}
                    maxRows={2}
                    multiline
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
