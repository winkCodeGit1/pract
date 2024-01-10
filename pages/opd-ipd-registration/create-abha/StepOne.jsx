import { useEffect, useRef, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { failedSaveMessage } from 'utils/constants';
import useAbhaCreationStore from 'stores/useAbhaCreationStore';
import { enrollmentRequestAadharOtp } from 'pages/api/abha-creation';
import Footer from './Footer';

const inputStyle = {
  p: 0,
  '& .MuiOutlinedInput-input': {
    fontSize: '1rem',
    p: '6px 12px',
    color: 'green',
    fontWeight: 600,
    maxWidth: 70,
  },
};

export default function StepOneConsentCollection({ onClose }) {
  const inputRefFirst = useRef();
  const inputRefSecond = useRef();
  const inputRefThird = useRef();

  const [aadharNumber, setAadharNumber] = useState({
    first: '',
    second: '',
    third: '',
  });
  const { handleIsValidStep, handleNextStep, setTxnId, setApiMessage } = useAbhaCreationStore();

  const [aadharInputType, setAadharInputType] = useState('password');
  const [isAgree, setIsAgree] = useState(false);

  const mutation = useMutation({
    mutationFn: enrollmentRequestAadharOtp,
    onSuccess: ({ data }) => {
      toast.success('success');
      setTxnId(data.txnId);
      setApiMessage(data.message);
      handleNextStep();
    },
    onError: (error) => {
      toast.error(failedSaveMessage);
      console.log(error);
    },
  });

  const handleChange = (value, index) => {
    if (index === 1) {
      if (value.length === 4) {
        inputRefSecond.current.focus();
      }
      setAadharNumber((ps) => ({ ...ps, first: value }));
    } else if (index === 2) {
      if (value.length === 4) {
        inputRefThird.current.focus();
      } else if (value.length === 0) {
        inputRefFirst.current.focus();
      }
      setAadharNumber((ps) => ({ ...ps, second: value }));
    } else if (index === 3) {
      if (value.length === 0) {
        inputRefSecond.current.focus();
      }
      setAadharNumber((ps) => ({ ...ps, third: value }));
    }
  };

  useEffect(() => {
    const aadharNumberString = aadharNumber.first + aadharNumber.second + aadharNumber.third;
    if (aadharNumberString.length === 12 && isAgree) {
      handleIsValidStep(true);
    } else {
      handleIsValidStep(false);
    }
  }, [aadharNumber, isAgree]);

  function handleNext() {
    const req = {
      aadhaar: aadharNumber.first + aadharNumber.second + aadharNumber.third,
    };

    mutation.mutate(req);
  }

  return (
    <Box>
      <Box>
        <InputLabel required>Aadhar Number </InputLabel>
        <OutlinedInput
          sx={inputStyle}
          inputRef={inputRefFirst}
          value={aadharNumber.first}
          placeholder='0000'
          size='small'
          autocomplete='new-password'
          type={aadharInputType}
          inputProps={{ maxLength: 4, autocomplete: 'new-password' }}
          onChange={(e) => handleChange(e.target.value, 1)}
        />

        <Box component='span' sx={{ px: 1 }}>
          <b>-</b>
        </Box>

        <OutlinedInput
          sx={inputStyle}
          value={aadharNumber.second}
          inputRef={inputRefSecond}
          placeholder='0000'
          size='small'
          autocomplete='new-password'
          type={aadharInputType}
          inputProps={{ maxLength: 4, autocomplete: 'new-password' }}
          onChange={(e) => handleChange(e.target.value, 2)}
        />

        <Box component='span' sx={{ px: 1 }}>
          <b>-</b>
        </Box>

        <OutlinedInput
          sx={inputStyle}
          value={aadharNumber.third}
          inputRef={inputRefThird}
          placeholder='0000'
          size='small'
          type={aadharInputType}
          inputProps={{ maxLength: 4, autocomplete: 'new-password' }}
          onChange={(e) => handleChange(e.target.value, 3)}
        />
        <Box component={'span'} sx={{ pl: 2 }}>
          {aadharInputType === 'password' ? (
            <IconButton color='primary' onClick={() => setAadharInputType('text')}>
              <Visibility />
            </IconButton>
          ) : (
            <IconButton color='primary' onClick={() => setAadharInputType('password')}>
              <VisibilityOff />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant='caption'>
        <Info color='action' fontSize='16px' />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quidem natus vero in
        laborum sit cupiditate magni harum veniam debitis aspernatur, numquam nemo, id maiores, ex
        hic aperiam! Ab itaque delectus nisi. Recusandae facilis ratione similique non ad mollitia,
        a officiis numquam, deserunt minus atque sed cumque nisi odit? Ipsa.
      </Typography>
      <Paper elevation={1} sx={{ mt: 2, p: 2, py: 0 }}>
        <Typography variant='h6' gutterBottom>
          Terms and Conditions
        </Typography>
        <Box maxHeight={200} overflow='auto' sx={{ backgroundColor: 'divider', p: 1 }}>
          <Typography variant='body2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis explicabo laborum
            magnam atque facilis temporibus odio accusamus iste nihil tempore, quae consequatur
            quasi rerum dolorum reprehenderit ex illo ipsum obcaecati! Quisquam harum commodi sunt
            atque, minus ipsum vero aliquid veritatis earum in veniam consequatur. Fuga sapiente,
            illum quas numquam neque quis, labore voluptatem pariatur sit porro, tempore
            dignissimos? Itaque fuga natus omnis, eligendi exercitationem accusantium consequatur
            nemo sequi ducimus, ad animi odit tempora perferendis corporis debitis. Modi fuga,
            reiciendis adipisci officia nostrum tempora debitis excepturi nobis animi, reprehenderit
            inventore molestias dolores delectus cupiditate deserunt illum rem numquam consequatur,
            ex autem? Voluptatem illo eius distinctio, officiis doloribus pariatur maiores fugiat
            culpa, delectus obcaecati, repellat tempore consectetur debitis. In non expedita libero
            autem placeat adipisci, molestiae corporis reprehenderit neque, ad sit officiis
            explicabo est tempora quas minus corrupti sed. Eaque optio nulla, maxime dicta ipsa rem.
            Sapiente officiis iusto quam, neque minima cumque eius doloremque vel qui vitae,
            inventore fuga odio aspernatur assumenda libero voluptatum sed necessitatibus excepturi
            illo eaque veniam. Hic doloremque veniam accusantium saepe vero nam necessitatibus
            aspernatur dolores ea beatae, odio, amet tempore error laboriosam tenetur. Nemo modi
            tempora deserunt quod eveniet ab soluta quibusdam alias obcaecati. Itaque, provident.
          </Typography>
        </Box>
        <FormControlLabel
          checked={isAgree}
          onChange={(e) => setIsAgree(e.target.checked)}
          control={<Checkbox />}
          label='I Agree'
          labelPlacement='start'
        />
      </Paper>
      <Footer onClose={onClose} handleNextCb={handleNext} isLoading={mutation.isPending} />
    </Box>
  );
}
