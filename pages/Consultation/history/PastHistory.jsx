import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { historyTypeGetActivePastHistoryTypes } from 'pages/api/master';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { restrict } from 'utils/restrict';
export default function PastHistory({ stateName }) {
  const { control, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: `${stateName}.pastHistory`,
  });

  const { data: pastHistory, isPending } = useQuery({
    queryKey: ['historyTypeGetActivePastHistoryTypes'],
    queryFn: historyTypeGetActivePastHistoryTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  useEffect(() => {
    if (watch(`${stateName}.pastHistory`)?.length === 0) {
      const mappeddata = (pastHistory || [])?.map((item) => ({
        ...item,
        disease: item.historyDataName,
      }));
      setValue(`${stateName}.pastHistory`, mappeddata || []);
    }
  }, [pastHistory]);

  return (
    <div>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Disease</TableCell>
              <TableCell></TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography>{item.disease}</Typography>
                </TableCell>
                <TableCell>
                  <RHFToggleButtonChipVariant
                    size='small'
                    name={`${stateName}.pastHistory[${index}].status`}
                    exclusive
                  >
                    <ToggleButton value='Yes' size='small' color='primary'>
                      Yes
                    </ToggleButton>
                    <ToggleButton value='No' size='small' color='error'>
                      No
                    </ToggleButton>
                  </RHFToggleButtonChipVariant>
                </TableCell>

                <TableCell>
                  <RHFDatePicker
                    name={`${stateName}.pastHistory[${index}].year`}
                    views={['month', 'year']}
                    disableFuture
                    // openTo='year'
                    disabled={watch(`${stateName}.pastHistory[${index}].status`) !== 'Yes'}
                  />
                </TableCell>
                <TableCell>
                  <RHFTextField
                    size='small'
                    multiline
                    name={`${stateName}.pastHistory[${index}].remarks`}
                  />
                </TableCell>
              </TableRow>
            ))}
            {isPending && (
              <TableRow>
                <TableCell>Loading Data...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={4}>
          <RHFTextField
            name={`${stateName}.pastHistoryRemark`}
            placeholder='Enter Remarks'
            multiline
            inputProps={{ maxLength: 200 }}
            onInput={restrict.remarks}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name={`${stateName}.surgicalHistory`}
            placeholder='Enter Surgical History'
            multiline
            inputProps={{ maxLength: 200 }}
            onInput={restrict.remarks}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField
            name={`${stateName}.vaccinationHistory`}
            placeholder='Enter Vaccination History'
            multiline
            inputProps={{ maxLength: 200 }}
            onInput={restrict.remarks}
          />
        </Grid>
      </Grid>
    </div>
  );
}
