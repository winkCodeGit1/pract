import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
// import {
//     TableRow,
//     TableCell,
//     TableHead,
//     TableBody,
//     TableContainer,
// } from '@mui/material';
import Table from 'components/table';
import { useState } from 'react';
import MedicationChartAdd from './MedicationChartAdd';
import { Grid, IconButton } from '@mui/material';
import { BarChart } from 'components/chart';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HeartRate_Options, PulseRate_Options, RespiratoryRate_Options, Spo2_Options, Temperature_Options } from 'utils/MedicationChart';


const path = 'nursing-care-Medication-chart-record';

export default function MedicationChart() {
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    const columnsDef = [
        {
            header: 'Drug Allergies',
            accessorKey: 'nursingCareGiven',
        },

        {
            header: 'Problems',
            accessorKey: 'staffName',
        },
        // {
        //     header: 'Status',
        //     accessorKey: 'status',
        //     Cell: ({ row }) => (
        //         <Label sx={{ minWidth: 120 }} variant={'ghost'} color={row.original.status}>
        //             {row.original.status.label}
        //         </Label>
        //     ),
        // },
    ];


    return (
        <>
            {openAdd && (
                <MedicationChartAdd
                    selectedRow={selectedRow}
                    onClose={() => {
                        setOpenAdd(false);
                        setSelectedRow();
                    }}
                />
            )}
            <Table
                title={path}
                columns={columnsDef}
                // loading={}
                data={[]}
                enableStickyHeader
                enableColumnResizing
                rowNumberMode='original'
                enableRowNumbers
                enableRowVirtualization
                enableRowActions
                renderTopToolbarCustomActions={() => (
                    <Button
                        endIcon={<Add />}
                        color='primary'
                        onClick={() => setOpenAdd((ps) => !ps)}
                        variant='contained'
                    >
                        Add
                    </Button>
                )}
                renderRowActions={({ row }) => (
                    <IconButton
                        onClick={() => {
                            setOpenAdd(true);
                            setSelectedRow(row);
                        }}
                    >
                        <Edit />
                    </IconButton>
                )}
            />



            <Grid >
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Vital Signs
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid spacing={2} sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ flex: 1, marginRight: '16px' }}>
                                <BarChart options={RespiratoryRate_Options} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ flex: 1, marginRight: '16px' }}>
                                <BarChart options={PulseRate_Options} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ flex: 1, marginRight: '16px' }}>
                                <BarChart options={Spo2_Options} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ flex: 1, marginRight: '16px' }}>
                                <BarChart options={Temperature_Options} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ flex: 1, marginRight: '16px' }}>
                                <BarChart options={HeartRate_Options} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid >


            {/* <Grid>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Diagnosis
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: '30%' }}>Additional Diagnosis</TableCell>
                                            <TableCell>Certainty</TableCell>
                                            <TableCell>Remark</TableCell>

                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        &nbsp;

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid > */}
        </>
    );
}
