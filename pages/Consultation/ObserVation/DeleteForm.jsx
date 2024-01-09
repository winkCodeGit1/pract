import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function DeleteForm({ onClose, handleSuccess }) {
  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogContent sx={{ p: 2 }}>Are you sure. You want to delete this form</DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '10px !important' }}>
          <Button onClick={handleSuccess} variant='contained' color='primary'>
            Yes
          </Button>
          <Button onClick={onClose} autoFocus variant='contained' color='error'>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
