import {
    Grid,
    IconButton,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    TableContainer,
    // Button,
} from '@mui/material';
import MuiTable from '@mui/material/Table';
import Table from 'components/table';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    RHFTextField,
    FormProvider,
    RHFAutoComplete,
} from 'components/hook-form';

// import { useQuery } from '@tanstack/react-query';
// import { icdCodeGetAllIcdCodeByVersion } from 'pages/api/master';

import { useFieldArray, useForm } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import DeleteIcon from 'assets/DeleteIcon';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import EditIcon from 'assets/EditIcon';

const defaultarry = {
    InvestigationDate: null,
    BodyPart: null,
    Details: '',
};
const defaultValues = {
    ExternalReportRadiology: [defaultarry]
};
const schema = yup.object().shape({
    ExternalReportRadiology: yup.array().of(
        yup.object().shape({
            InvestigationDate: yup.date().nullable().required('Investigation Date is required'),
            // Add validations for other fields
        })
    ),
});
const path = 'Laboratory-Investigation-record';
function RadiologyInvestigate() {
    // const [openAdd, setAddOpen] = useState(false);
    // const [openDelete, setDeleteOpen] = useState(false);
    const [loading] = useState(false);
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { handleSubmit, control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ExternalReportRadiology',
    });

    const onAdd = (data) => {
        console.log(data, '-------external report');
    };

    const columnsDef = [
        {
            header: 'Investigation Date',
            accessorKey: 'buildingName',
        },
        {
            header: 'Body Part',
            accessorKey: 'floorNamesList',
        },
        {
            header: 'Details',
            accessorKey: 'buildingName',
        },
        {
            header: 'Staff Name',
            accessorKey: 'buildingName',
        },


    ];

    return (
        <div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onAdd)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <MuiTable size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Investigation Date</TableCell>
                                        <TableCell>Body Part</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size='small'
                                                color='primary'
                                                onClick={() => {
                                                    append({ name: null, certainty: '', remarks: '' });
                                                }}
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
                                                <RHFDatePicker
                                                    name={`ExternalReportRadiology[${index}.InvestigationDate]`}
                                                    format='dd-MM-yyyy'
                                                    disableFuture
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <RHFAutoComplete
                                                    name={`ExternalReportRadiology[${index}.BodyPart]`}
                                                    placeholder='Select Category'
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <RHFTextField
                                                    name={`ExternalReportRadiology[${index}.Details]`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => {
                                                        remove(index);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </MuiTable>
                        </TableContainer>


                        <Grid container alignItems='center' justifyContent={'flex-end'}>
                            <LoadingButton type='submit' variant='contained' loading={loading} sx={{ mt: 1 }}>
                                Submit
                            </LoadingButton>
                        </Grid>



                    </Grid>


                    <Grid item xs={12}>
                        <Table
                            title={path}
                            columns={columnsDef}
                            // loading={isPending}
                            // data={floorType || []}
                            enableStickyHeader
                            enableColumnResizing
                            rowNumberMode='original'
                            enableColumnFilters
                            enableRowVirtualization
                            enableRowActions
                            layoutMode='grid'
                            // renderTopToolbarCustomActions={() => {
                            //     return (
                            //         <div style={{ display: 'flex', gap: '0.5rem' }}>
                            //             <Button
                            //                 endIcon={<Add />}
                            //                 color='primary'
                            //                 // onClick={() => {
                            //                 //     setAddOpen((ps) => !ps);
                            //                 //     setSelectedRow(null);
                            //                 // }}
                            //                 variant='contained'
                            //             >
                            //                 Add
                            //             </Button>
                            //         </div>
                            //     );
                            // }}
                            renderRowActions={() => (
                                <>
                                    <IconButton
                                        color='secondary'
                                        // onClick={() => {
                                        //     setSelectedRow(row.original);
                                        //     setIsEditMode(true);
                                        //     setAddOpen(true);
                                        // }}
                                        sx={{ mr: 1 }}
                                    // size='small'
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </>
                            )}
                        />

                    </Grid>
                </Grid>
            </FormProvider>
        </div>
    );
}

export default RadiologyInvestigate;



