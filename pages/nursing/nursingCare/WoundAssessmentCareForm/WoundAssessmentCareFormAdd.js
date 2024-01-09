/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel, Grid, MenuItem, ToggleButton } from '@mui/material';
import FormWrapper from 'components/FormWrapper';
import {
  FormProvider,
  RHFTextField,
  RHFDateTimePicker,
  RHFToggleButtonChipVariant,
  RHFAutoComplete,
  RHFSelect,
  RHFRadioGroup,
} from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { statusOption } from 'utils/constants';
import * as yup from 'yup';

const schema = yup.object().shape({
  dateTime: yup.date().typeError('Required'),
  foodCategory: yup
    .object()
    .typeError('Food Category is Required')
    .nullable()
    .required('Food Category is Required'),
  FoodItm: yup.string().required('Food Item is required'),
});

const defaultValues = {
  dateTime: null,
  foodCategory: null,
  FoodItm: '',
};

export default function WoundAssessmentCareFormAdd({ onClose, selectedRow }) {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  function onSave(data) {
    console.log(data);
  }

  return (
    <FormWrapper
      maxWidth='md'
      title='Add Wound Assessment Care Form Record'
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSave)}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <RHFTextField name='length' label='Length' placeholder='Enter Length' />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField name='breadth' label='Breadth' placeholder='Enter Breadth' />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField label='Depth' name='depth' placeholder='Enter Depth' />
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Type' name='woundType'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Area' name='woundArea'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Edge' name='woundEdge'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Status' name='woundStatus'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Odour' name='woundOdour'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Wound Bed' name='woundBed'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Drainage Intensity' name='drainageIntensity'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Periwound Skin' name='periwoundSkin'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFSelect label='Drainage Type' name='drainageType'>
              <MenuItem value=''> Select Option </MenuItem>
              {[].map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={4}>
            <RHFRadioGroup
              label='Pain'
              name='pain'
              options={statusOption}
              getOptionLabel={['Yes', 'No']}
            />
          </Grid>
          <Grid item xs={4}>
            <RHFRadioGroup
              label='Edema'
              name='edema'
              options={statusOption}
              getOptionLabel={['Yes', 'No']}
            />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField label='Food Itm' name='FoodItm' placeholder='Food Item' />
          </Grid>
          <Grid item xs={4}>
            <RHFTextField label='Food Itm' name='FoodItm' placeholder='Food Item' />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
