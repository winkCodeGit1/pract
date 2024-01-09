/* eslint-disable react/no-unescaped-entities */
import { Grid, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RHFAutoComplete, RHFTextField } from 'components/hook-form';
import { adviceGetAllAdvicesByOrgId } from 'pages/api/master';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function DosAndDont() {
  const { setValue } = useFormContext();
  const { data } = useQuery({
    queryKey: ['adviceGetAllAdvicesByOrgId'],
    queryFn: adviceGetAllAdvicesByOrgId,
  });
  useEffect(() => {
    return () => {
      setValue('dos', []);
      setValue('dosRemark', '');
      setValue('dont', []);
      setValue('dontRemark', '');
    };
  }, []);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        align='center'
        component={Paper}
        sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, padding: '10px 0px' }}
      >
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={2}>
            DO'S
          </Grid>
          <Grid item xs={9}>
            <RHFAutoComplete
              multiple
              name='dos'
              options={data?.dos || []}
              getOptionLabel={(option) => option?.advice}
              filterSelectedOptions
            />
          </Grid>
          <Grid item xs={2}>
            Remark
          </Grid>
          <Grid item xs={9}>
            <RHFTextField
              name='dosRemark'
              placeholder='Remarks'
              multiline
              maxRows={3}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        align='center'
        component={Paper}
        sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, padding: '10px 0px' }}
      >
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={2}>
            DONT'S
          </Grid>
          <Grid item xs={9}>
            <RHFAutoComplete
              multiple
              options={data?.donts || []}
              name='dont'
              getOptionLabel={(option) => option?.advice}
              filterSelectedOptions
            />
          </Grid>
          <Grid item xs={2}>
            Remark
          </Grid>
          <Grid item xs={9}>
            <RHFTextField
              name='dontRemark'
              placeholder='Remarks'
              multiline
              maxRows={3}
              inputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
