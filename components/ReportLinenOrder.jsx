import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import ahmis1 from '../assets/Images/ahmis1.png';
import call from '../assets/Images/call.png';
import mail from '../assets/Images/mail.png';
import BottomLine from '../../src/assets/Images/labReport.png';
import LinenManagement from 'pages/inventory/laundry/laundry/LinenManagement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linenOrderSave } from 'pages/api/laundry';
import { toast } from 'react-toastify';
import { failedSaveMessage, saveMessage } from 'utils/constants';
import useAuth from 'hooks/useAuth';

const alignContentHeader = {
  display: 'flex',
  justifyContent: 'end',
};

const textContent = {
  marginLeft: '10px',
  fontSize: '0.875rem',
};

export default function ReportLinenDialog({ onClose, children, maxWidth = 'xs', row, ...others }) {
  const componentRef = useRef();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [openLinen, setOpenLinen] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const mutation = useMutation({
    mutationFn: (req) => linenOrderSave(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['linenOrderGetAll'] });
      toast.success(saveMessage);
      setOpenLinen(false);
      onClose();
    },
    onError: (error) => {
      toast(failedSaveMessage);
      console.log(error);
    },
  });

  const handleSubmitLinenOrder = (req) => {
    const reqData = {
      id: 0,
      collectionLocation: req?.location.id,
      deptCollectedFrom: req?.department?.departId,
      staffIdCollectedFrom: 1,
      linenOrderDetailsDtos: req.linen?.map((e, i) => ({
        id: i,
        linenItemId: e?.LinenItemCode?.id,
        orderQty: e.Qty,
        orderUom: 1,
        linenProcessId: e?.Processed?.id,
        lastUpdatedBy: user.staffId,
      })),
    };
    mutation.mutate(reqData);
  };

  return (
    <>
      {openLinen && (
        <LinenManagement
          onClose={() => {
            setOpenLinen(false);
            onClose();
          }}
          row={row}
          type='LinenOrder'
          onSubmitLinenOrder={handleSubmitLinenOrder}
          loading={mutation.isPending}
        />
      )}
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
        maxWidth={maxWidth}
        {...others}
      >
        <div ref={componentRef}>
          <DialogTitle>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={ahmis1} alt='AHMIS' />
                  <span style={{ marginLeft: '10px', fontSize: '0.995rem', alignSelf: 'center' }}>
                    Bharat Electronics Hospital
                  </span>
                </p>
              </Grid>
              <Grid item xs={8} align='right'>
                <p style={alignContentHeader}>
                  <img src={call} alt='logo' style={{ width: '20px', height: '20px' }} />
                  <span style={textContent}>845689546 || 845689546</span>
                </p>
                <p style={alignContentHeader}>
                  <img src={mail} alt='logo' />
                  <span style={textContent}>info@hospital.com</span>
                </p>
              </Grid>
            </Grid>
            <img
              src={BottomLine}
              alt='divider'
              style={{ width: '100%', height: '20px', marginTop: '10px' }}
            />
          </DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenLinen(true);
            }}
            variant='contained'
            color='success'
          >
            Edit
          </Button>
          <Button onClick={handlePrint} variant='contained' color='primary'>
            Print
          </Button>
          <Button onClick={onClose} variant='contained' color='error'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
