import {
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
import { RHFRadioGroup, RHFTextField, RHFToggleButtonChipVariant } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { historyTypeGetActivePersonalHistoryTypes } from 'pages/api/master';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const frequency = ['Day', 'Weeks', 'Months'];
export default function PersonalHistory({ stateName }) {
  const { control, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: `${stateName}.personalHistory`,
  });


  const { data: personalHistoryData, isPending } = useQuery({
    queryKey: ['historyTypeGetActivePersonalHistoryTypes'],
    queryFn: historyTypeGetActivePersonalHistoryTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  useEffect(() => {
    if (watch(`${stateName}.personalHistory`)?.length === 0) {
      const mappeddata = (personalHistoryData || [])?.map((item) => ({
        ...item,
        historyDataName: item.historyDataName,
        frequency: 'Day',
      }));
      setValue(`${stateName}.personalHistory`, mappeddata || []);
    }
  }, [personalHistoryData]);

  return (
    <div>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Disease</TableCell>
              <TableCell></TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Consumption</TableCell>
              <TableCell>Frequency</TableCell>
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
                    name={`${stateName}.personalHistory[${index}].status`}
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
                    name={`${stateName}.personalHistory[${index}].year`}
                    views={['month', 'year']}
                    disableFuture
                    // openTo='year'
                    disabled={watch(`${stateName}.personalHistory[${index}].status`) !== 'Yes'}
                  />
                </TableCell>
                <TableCell>
                  <RHFTextField
                    size='small'
                    multiline
                    name={`${stateName}.personalHistory[${index}].consumption`}
                  />
                </TableCell>
                <TableCell>
                  <RHFRadioGroup
                    name={`${stateName}.personalHistory[${index}].frequency`}
                    options={frequency}
                    disabled={watch(`${stateName}.personalHistory[${index}].status`) !== 'Yes'}
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
    </div>
  );
}
