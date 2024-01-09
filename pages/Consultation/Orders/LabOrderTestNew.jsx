import {
  Autocomplete,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useCallback, useState } from 'react';

import Label from 'components/Label';
import DeleteIcon from 'assets/DeleteIcon';
import { SearchNotFound } from 'utils/cssStyles';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'components/hook-form';
import { labTestGetAllTests } from 'pages/api/lab';

export default function LabOrderTestNew({ stateName }) {
  const [allLabTest, setAllLabTest] = useState([]);
  const [term, setTerm] = useState('');

  const { control, watch } = useFormContext();
  const [selectedLabTest, setSelectedLabTest] = useState([]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: stateName,
  });
  const { data: labTest, isLoading } = useQuery({
    queryKey: ['labTestGetAllTests'],
    queryFn: labTestGetAllTests,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  const fetchData = useCallback(async () => {
    if (term.length > 3) {
      try {
        const filteredData = labTest.filter((item) =>
          item.labTestName?.toLowerCase()?.includes(term?.toLowerCase())
        );
        console.log(filteredData, 'filteredData');
        setAllLabTest(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [term]);

  return (
    <>
      <Autocomplete
        id='grouped-demo'
        options={allLabTest || []}
        loading={isLoading}
        sx={{ mb: 3 }}
        size='small'
        filterOptions={(x) => x}
        autoComplete
        value={selectedLabTest || []}
        multiple
        // filterSelectedOptions
        autoHighlight
        popupIcon={null}
        noOptionsText={<SearchNotFound searchQuery={term} sx={{ background: 'transparent' }} />}
        getOptionLabel={(option) => option.labTestName}
        getOptionDisabled={(option) => watch(stateName)?.some((el) => el.testId === option.testId)}
        disableClearable
        inputValue={term}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          setSelectedLabTest(newValue);
          if (newValue?.length > 0) {
            append(newValue[newValue?.length - 1]);
          }
        }}
        renderTags={() => null}
        onInputChange={(e, v) => {
          if (e && (e?.type === 'keydown' || e?.key === 'Enter')) {
            return;
          }
          setTerm(v);
          fetchData(v);
        }}
        renderOption={(props, option) => (
          <li
            {...props}
            key={props.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            // onClick={() => {
            //   // const newLabOrder = [...selectedLabOrder, option];
            //   // setSelectedLabOrder(newLabOrder);
            //   append(option);
            //   console.log(option, 'ListOption');
            // }}
          >
            <span>{option.labTestName}</span>
            {option.groupTest && <Label color='success'> Group Test</Label>}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            placeholder='Search by test name minimum 3 character '
            fullWidth
          />
        )}
      />
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Test Type</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.labTestName}</TableCell>
                <TableCell>{item.groupTest ? 'Group Test' : '-'}</TableCell>
                <TableCell>
                  <RHFTextField name={`${stateName}[${index}].remarks`} size='small' />
                </TableCell>

                <TableCell>
                  <IconButton
                    size='small'
                    onClick={() => {
                      console.log(item, 'item');
                      const filterData = selectedLabTest.filter(
                        (el) => el.global_id !== item.global_id
                      );
                      setSelectedLabTest(filterData);
                      remove(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
