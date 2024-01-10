/** @format */

import {
  // Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableRow,
  Grid,
  Table,
  // TableHead,
  // Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//local
import { failedSaveMessage, saveMessage } from 'utils/constants';
import { RHFTextField, RHFAutoComplete } from 'components/hook-form';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { FormProvider } from 'components/hook-form';
import FormWrapper from 'components/FormWrapper';
import { restrict } from 'utils/restrict';

//api
import { vehicleMasterSaveVehicleMaster } from 'pages/api/transport';
import {
  vehClassGetAllActiveVehClass,
  fuelTypeGetAllActiveFuelType,
  batteryTypeGetAlActiveBatteryType,
} from 'pages/api/transport';

const defaultValues = {
  registrationNumber: '',
  classOfVehicleId: '',
  model: '',
  type: '',
  className: '',
  chassisNumber: '',
  engineNumber: '',
  yearOfManufacture: '',
  seatingCapacity: '',
  cylinder: '',
  cubicCapacity: '',
  unladenWeight: '',
  fuelTypeId: '',
  color: '',
  mainTankCapacity: '',
  reservedTankCapacity: '',
  wheelBase: '',
  typesOfBody: '',
  batteryTypeId: '',
  sizeOfTyres: '',
  airPressureFront: '',
  batteryNumber: '',
  batteryVoltage: '',
  batteryCompany: '',
  remarks: '',
};

const Schema = yup.object().shape({
  registrationNumber: yup.string().required('Registration Number is Required '),
  classOfVehicleId: yup
    .object()
    .typeError('Required')
    .nullable()
    .required('Vehicle Class Required'),
  fuelTypeId: yup.object().typeError('Required').nullable().required('Fuel Type is Required'),
  batteryTypeId: yup.object().typeError('Required').nullable().required('Battery Type is Required'),
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '6px',
  border: `1px solid ${theme.palette.grey[300]}`,
  '&.MuiTableCell-root:first-of-type': {
    paddingLeft: '6px',
  },
}));
export default function AddVehicleTransports({ onClose, isEditMode, row }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { data: classVehicle } = useQuery({
    queryKey: ['vehClassGetAllActiveVehClass'],
    queryFn: vehClassGetAllActiveVehClass,
  });

  const { data: fuelTypes } = useQuery({
    queryKey: ['fuelTypeGetAllActiveFuelType'],
    queryFn: fuelTypeGetAllActiveFuelType,
  });

  const { data: batteryTypes } = useQuery({
    queryKey: ['batteryTypeGetAlActiveBatteryType'],
    queryFn: batteryTypeGetAlActiveBatteryType,
  });

  const mutation = useMutation({
    mutationFn: (req) => vehicleMasterSaveVehicleMaster({ req, isEditMode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleMasterGetAllVehicleMasterByOrgId'] });
      toast.success(saveMessage);
      onClose();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });
  console.log(mutation);
  const onSubmit = (data) => {
    const req = {
      ...data,
      id: data?.id ?? 0,
      classOfVehicleId: data?.classOfVehicleId?.id,
      fuelTypeId: data?.fuelTypeId?.id,
      batteryTypeId: data?.batteryTypeId?.id,
    };
    console.log(data, req);
    mutation.mutate(req);
  };
  console.log(row, 'row');

  useEffect(() => {
    if (isEditMode) {
      let obj = {
        ...row,
        yearOfManufacture: new Date(row.yearOfManufacture),
        classOfVehicleId: classVehicle?.find((el) => el.id === +row.classOfVehicleId),
        fuelTypeId: fuelTypes?.find((el) => el.id === +row.fuelTypeId),
        batteryTypeId: batteryTypes?.find((el) => el.id === +row.batteryTypeId),
      };
      console.log(row, '-----row');
      reset({ ...obj });
    }
  }, [isEditMode, row, classVehicle, fuelTypes, batteryTypes]);
  console.log(isEditMode);

  return (
    <FormWrapper
      onClose={onClose}
      title={`${isEditMode ? 'Edit' : 'Add'} Vehicle Transport`}
      maxWidth='xl'
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={mutation.isPending}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Table>
            <TableBody>
              <TableRow>
                <StyledTableCell size='small'>
                  Registration No.<span style={{ color: 'red' }}>*</span>
                </StyledTableCell>
                <StyledTableCell align='left' colSpan={3}>
                  <RHFTextField
                    variant='standard'
                    name='registrationNumber'
                    size='small'
                    placeholder='Registration No.'
                    fullWidth
                    required
                  />
                </StyledTableCell>
                <StyledTableCell>
                  Class of Vehicle<span style={{ color: 'red' }}>*</span>
                </StyledTableCell>
                <StyledTableCell>
                  <RHFAutoComplete
                    variant='standard'
                    name='classOfVehicleId'
                    size='small'
                    placeholder='Class of Vehicle'
                    options={classVehicle || []}
                    fullWidth
                    required
                  />
                </StyledTableCell>
                <StyledTableCell>Year of Manufacture</StyledTableCell>
                <StyledTableCell>
                  <RHFDatePicker
                    format='MM-dd-yyyy'
                    name='yearOfManufacture'
                    size='small'
                    placeholder='Year of Manufacture'
                    fullWidth
                    variant='standard'
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell size='small'>Model</StyledTableCell>
                <StyledTableCell align='left'>
                  <RHFTextField
                    variant='standard'
                    name='model'
                    inputProps={{ maxLength: 4 }}
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    size='small'
                    placeholder='Model'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Make</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    name='make'
                    size='small'
                    placeholder='Make'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Classis Number</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Classis Number'
                    fullWidth
                    name='chassisNumber'
                  />
                </StyledTableCell>
                <StyledTableCell>Engine Number</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Engine Number'
                    fullWidth
                    name='engineNumber'
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell size='small'>Seating Capacity</StyledTableCell>
                <StyledTableCell align='left'>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Seating Capacity'
                    fullWidth
                    name='seatingCapacity'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 2 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Cylinder</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Cylinder'
                    name='cylinder'
                    fullWidth
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 2 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Cubic Capacity</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Cubic Capacity'
                    name='cubicCapacity'
                    fullWidth
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 5 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Unladen Weight</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Unladen Weight'
                    fullWidth
                    name='unladenWeight'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 5 }}
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell size='small'>
                  Fuel Type<span style={{ color: 'red' }}>*</span>
                </StyledTableCell>
                <StyledTableCell align='left'>
                  <RHFAutoComplete
                    variant='standard'
                    size='small'
                    placeholder='Fuel Type'
                    options={fuelTypes || []}
                    name='fuelTypeId'
                    fullWidth
                    required
                  />
                </StyledTableCell>
                <StyledTableCell>Color</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Color'
                    name='color'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Main Tank Capacity</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Main Tank Capacity'
                    fullWidth
                    name='mainTankCapacity'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 6 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Reserved Tank Capacity</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Reserved Tank Capacity'
                    fullWidth
                    name='reservedTankCapacity'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 5 }}
                  />
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell size='small'>Wheel Base</StyledTableCell>
                <StyledTableCell align='left'>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Wheel Base'
                    name='wheelBase'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Type Of Body</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Type Of Body'
                    name='typesOfBody'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Size Of Tyres</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Size Of Tyres'
                    fullWidth
                    name='sizeOfTyres'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 6 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Air Pressure (Front)/(Rear)</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <RHFTextField
                      variant='standard'
                      size='small'
                      placeholder='Front'
                      sx={{ width: '100px' }}
                      name='airPressureFront'
                      onInput={(e) => {
                        restrict.number(e);
                      }}
                      inputProps={{ maxLength: 3 }}
                    />
                    <span style={{ fontSize: '19px', fontWeight: 600 }}>/</span>
                    <RHFTextField
                      variant='standard'
                      size='small'
                      placeholder='Rear'
                      sx={{ width: '100px' }}
                      name='airPressureRear'
                      onInput={(e) => {
                        restrict.number(e);
                      }}
                      inputProps={{ maxLength: 3 }}
                    />
                  </div>
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell size='small'>
                  Battery Type<span style={{ color: 'red' }}>*</span>
                </StyledTableCell>
                <StyledTableCell align='left'>
                  <RHFAutoComplete
                    variant='standard'
                    size='small'
                    name='batteryTypeId'
                    placeholder='Battery Type'
                    options={batteryTypes || []}
                    fullWidth
                    required
                  />
                </StyledTableCell>
                <StyledTableCell>Battery Number</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Battery Number'
                    name='batteryNumber'
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell>Battery Voltage</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Battery Voltage'
                    fullWidth
                    name='batteryVoltage'
                    onInput={(e) => {
                      restrict.number(e);
                    }}
                    inputProps={{ maxLength: 5 }}
                  />
                </StyledTableCell>
                <StyledTableCell>Battery Company</StyledTableCell>
                <StyledTableCell>
                  <RHFTextField
                    variant='standard'
                    size='small'
                    placeholder='Battery Company'
                    fullWidth
                    name='batteryCompany'
                  />
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell size='small'>Remark</StyledTableCell>
                <StyledTableCell colSpan={7}>
                  <RHFTextField
                    multiline
                    placeholder='Remark'
                    fullWidth
                    name='remarks'
                    variant='standard'
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
