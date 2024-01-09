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
import { historyTypeGetActiveFamilyHistoryTypes } from 'pages/api/master';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { restrict } from 'utils/restrict';

export default function FamilyHistory({ stateName }) {
  const { control, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: `${stateName}.familyHistory`,
  });

  const { data: familyHistoryData, isPending } = useQuery({
    queryKey: ['historyTypeGetActiveFamilyHistoryTypes'],
    queryFn: historyTypeGetActiveFamilyHistoryTypes,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
  useEffect(() => {
    if (watch(`${stateName}.familyHistory`)?.length === 0) {
      const mappeddata = (familyHistoryData || [])?.map((item) => ({
        ...item,
        historyDataName: item.historyDataName,
      }));
      setValue(`${stateName}.familyHistory`, mappeddata || []);
    }
  }, [familyHistoryData]);

  console.log(familyHistoryData, 'familyHistoryData');

  return (
    <div>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant='body2'>Consanguineous Marriage</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <RHFToggleButtonChipVariant size='small' name={`${stateName}.maritalStatus`} exclusive>
            <ToggleButton value='Yes' size='small' color='primary'>
              Yes
            </ToggleButton>
            <ToggleButton value='No' size='small' color='error'>
              No
            </ToggleButton>
          </RHFToggleButtonChipVariant>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Disease</TableCell>
                  <TableCell>Father</TableCell>
                  <TableCell>Mother</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>{item.historyDataName}</Typography>
                    </TableCell>
                    <TableCell>
                      <RHFToggleButtonChipVariant
                        size='small'
                        name={`${stateName}.familyHistory[${index}].fatherStatus`}
                        exclusive
                      >
                        <ToggleButton value='Yes' size='small' color='primary'>
                          Yes
                        </ToggleButton>
                        <ToggleButton value='No' size='small' color='error'>
                          No
                        </ToggleButton>
                        <ToggleButton value='notKnown' size='small' color='standard'>
                          Not Known
                        </ToggleButton>
                      </RHFToggleButtonChipVariant>
                    </TableCell>

                    <TableCell>
                      <RHFToggleButtonChipVariant
                        size='small'
                        name={`${stateName}.familyHistory[${index}].motherStatus`}
                        exclusive
                      >
                        <ToggleButton value='Yes' size='small' color='success'>
                          Yes
                        </ToggleButton>
                        <ToggleButton value='No' size='small' color='error'>
                          No
                        </ToggleButton>
                        <ToggleButton value='notKnown' size='small' color='standard'>
                          Not Known
                        </ToggleButton>
                      </RHFToggleButtonChipVariant>
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
        </Grid>
        <Grid item xs={12} sm={12} md={1}>
          <Typography variant='body2'>Remarks</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <RHFTextField
            name={`${stateName}.familyHistoryRemark`}
            placeholder='Enter Remarks'
            multiline
            inputProps={{ maxLength: 200 }}
            onInput={restrict.remarks}
            // sx={{ mt: 2, maxWidth: '300px' }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
