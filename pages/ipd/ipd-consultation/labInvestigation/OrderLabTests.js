import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import Table from 'components/table';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import EditIcon from 'assets/EditIcon';

const path = 'Ordered-Lab-Tests-record';

export default function OrderLabTests() {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const singleColumnsDef = [
    {
      header: 'Test Name',
      accessorKey: 'buildingName',
    },
    {
      header: 'Date',
      accessorKey: 'floorNamesList',
    },
  ];

  const groupColumnsDef = [
    {
      header: 'Test Name',
      accessorKey: 'buildingName',
    },
    {
      header: 'Date',
      accessorKey: 'floorNamesList',
    },
  ];

  const radiologyColumnsDef = [
    {
      header: 'Test Name',
      accessorKey: 'buildingName',
    },
    {
      header: 'Date',
      accessorKey: 'floorNamesList',
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mb={2}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Pathology</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <SingleTests columnDef={singleColumnsDef} />
              <GroupTests columnDef={groupColumnsDef} />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12} mb={2}>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Radiology</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <RadiologyTests columnDef={radiologyColumnsDef} />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

function SingleTests({ columnDef }) {
  return (
    <Grid item xs={12}>
      <Table
        title={path}
        columns={columnDef}
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
  );
}

function GroupTests({ columnDef }) {
  return (
    <Grid item xs={12}>
      <Table
        title={path}
        columns={columnDef}
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
  );
}

function RadiologyTests({ columnDef }) {
  return (
    <Grid item xs={12}>
      <Table
        title={path}
        columns={columnDef}
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
  );
}
