// eslint-disable-next-line no-unused-vars
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

import ahmis1 from '../assets/Images/ahmis1.png';
import call from '../assets/Images/call.png';
import mail from '../assets/Images/mail.png';
import labWatermark from '../assets/Images/labWatermark.png';
import BottomLine from 'assets/Images/labReport.png';
import useAuth from 'hooks/useAuth';
import { Call, Email } from '@mui/icons-material';
import jsPDF from 'jspdf';

import 'jspdf-autotable';

const generatePdf = (data) => {
  let margin = 10;

  const pdf = new jsPDF('p', 'mm', 'a4');
  var width = pdf.internal.pageSize.getWidth();
  var height = pdf.internal.pageSize.getHeight();
  function addHeaderAndFooter() {
    const totalPages = pdf.internal.getNumberOfPages();
    const lastPage = pdf.internal.getNumberOfPages() - 1;
    const img = new Image();
    img.src = labWatermark;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // let eventName = pdf.splitTextToSize('Event: ssadas', 150);
      // pdf.text(eventName, W / 2, margin + 4, { align: 'center' });
      // margin + 5;
      // let splitTitle = pdf.splitTextToSize('Enclosure: ' + 'sdas', 150);
      // pdf.text(splitTitle, W / 2, margin + 4, { align: 'center' });
      // FOOTER
      let str = 'Page ' + i + ' of ' + totalPages;
      pdf.setFontSize(10);
      pdf.text(str, width - 28, height - 10);
      pdf.addImage(img, 'PNG', width / 2 - 20, height / 2, 40, 50);
      if (lastPage === i) {
        pdf.text(str, width - 28, height - 10);
      }
    }
  }

  pdf.setFontSize(10);

  let Y = margin;
  Y += 12;
  const img = new Image();
  img.src = ahmis1;
  pdf.addImage(ahmis1, 'PNG', 10, 10, 20, 20);
  let eventName = pdf.splitTextToSize('Bharat Electronics Hospital', 150);
  pdf.text(eventName, 34, 22);
  pdf.addImage(call, 'PNG', width - 54, 15, 4, 4);
  pdf.text('845689546 || 845689546', width - 10, 18, {
    align: 'right',
  });
  pdf.addImage(mail, 'PNG', width - 47, 21, 4, 3);
  pdf.text('info@hospital.com', width - 10, 24, {
    align: 'right',
  });
  Y += 27;
  pdf.addImage(BottomLine, 'PNG', 0, 33, width, 5);
  pdf.text(data?.patientName, 10, 45);
  pdf.text('Age: 21', 10, 51);
  pdf.text(`Gender: ${data?.gender}`, 10, 57);
  pdf.text(`Ref. By:  Dr. ${data?.doctorName}`, 10, 63);

  pdf.text(`Order Date: ${data?.registeredOn}`, width - 10, 45, { align: 'right' });
  pdf.text(`Collected on: ${data?.collectedOn}`, width - 10, 51, { align: 'right' });
  pdf.text(`Reported on: ${data?.registeredOn}`, width - 10, 57, { align: 'right' });

  // pdf.line(90, 60, 90, 75);
  Y += 19;
  pdf.autoTable({
    html: '#my-table',
    startY: Y,
    margin: {
      top: margin * 2.3,
      bottom: margin * 2,
      left: margin,
      right: margin,
    },
    theme: 'plain',
    useCss: true,
    styles: {
      textColor: [0, 0, 0],
    },
    headStyles: {
      textColor: '#000000',
      lineColor: 255,
      fontWeight: '600',
      border: { top: 1, bottom: 1, left: 0, right: 0 },
      lineWidth: 1, // Line width for header row borders
      fillColor: [200, 200, 200], // Fill color for header row
    },
    footStyles: {
      textColor: '#000000',
      lineColor: 255,
      border: { top: 1, bottom: 1, left: 0, right: 0 },
      lineWidth: 1, // Line width for header row borders
      fillColor: [200, 200, 200], // Fill color for header row
    },
  });
  console.log(pdf, 'pdf');
  addHeaderAndFooter();

  pdf.autoPrint();

  // Open the PDF in a new tab/window
  pdf.output('dataurlnewwindow');
};

export default function LabReportDialog({
  onClose,
  children,
  type,
  maxWidth = 'xs',
  patientData,
  ...others
}) {
  //   let tokenComponentRef = useRef();
  const { user } = useAuth();

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      maxWidth={maxWidth}
      {...others}
    >
      <DialogTitle>
        <Grid container alignItems='center'>
          <Grid item xs={1}>
            <img src={ahmis1} alt='AHMIS' />
          </Grid>
          <Grid item xs={7} sx={{ pl: 2 }}>
            {user?.orgName && <label>{user?.orgName}</label>}
            <br />
            {user?.orgAddress && <label>{user?.orgAddress}</label>}
            {type && <label>{type}</label>}
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography
              alignItems='center'
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              variant='body2'
            >
              <Call color='secondary' fontSize='small' />
              &nbsp; 845689546 || 845689546
            </Typography>
            <Typography
              alignItems='center'
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              variant='body2'
            >
              <Email color='warning' fontSize='small' />
              &nbsp; info@hospital.com
            </Typography>
          </Grid>
        </Grid>
        <img
          src={BottomLine}
          alt='divider'
          style={{ width: '100%', height: '20px', marginTop: '10px' }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <div className='page-break' />
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='contained' color='error'>
          Close
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            generatePdf(patientData);
          }}
        >
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}
