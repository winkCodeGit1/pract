/** @format */

import { Grid, Card, IconButton } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import ReplayIcon from '@mui/icons-material/Replay';
import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import { useCallback, useRef } from 'react';

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: 'user',
};

export default function FileCapture({ value, onChange }) {
  const fileRef = useRef(null);
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    if (!value) {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 120,
        height: 120,
      });
      console.log('imagesrc', imageSrc);
      onChange(imageSrc);
    }
  }, [onChange, value]);

  const fileSizeLimit = 256;

  const fileToBase64 = (event) => {
    const file = event.target.files[0];
    if (!/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/g.test(file?.name)) {
      toast.error('Invalid File Type');
      return Promise.resolve(null);
    }
    if (file.size > fileSizeLimit * 1024) {
      toast.error(`Photo size exceeds the allowed limit of ${fileSizeLimit} kB`);
      return Promise.resolve(null);
    }
    if (file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  };

  const fileChange = useCallback(
    async (event) => {
      const base64 = await fileToBase64(event);
      console.log('base64', base64);
      onChange(base64);
    },
    [onChange]
  );

  const upload = useCallback(async () => {
    fileRef.current.click();
  }, []);

  return (
    <>
      <Grid container spacing={3} flexDirection='row' justifyContent='center'>
        <Grid item>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton size='small'>
              <CameraAltIcon fontSize='14px' />
            </IconButton>
            <IconButton onClick={capture} size='small' title='Capture Image From Camera'>
              <CameraIcon fontSize='14px' />
            </IconButton>
            <IconButton size='small' title='Reset Image' onClick={() => onChange(null)}>
              <ReplayIcon fontSize='14px' />
            </IconButton>
            <IconButton size='small' title='Attach local images' onClick={upload}>
              <input
                type='file'
                ref={fileRef}
                accept='.jpg,.png'
                onChange={fileChange}
                style={{ display: 'none' }}
              />
              <AttachFile fontSize='14px' />
            </IconButton>
          </div>
        </Grid>
        <Grid item style={{ width: 'auto' }}>
          <Card style={{ width: '120px', height: '120px', padding: '0px' }}>
            <div className='webcam-img'>
              {!value ? (
                <Webcam
                  audio={false}
                  height={120}
                  ref={webcamRef}
                  screenshotFormat='image/jpeg'
                  width={120}
                  videoConstraints={videoConstraints}
                />
              ) : (
                <img src={value} style={{ height: 120 }} />
              )}
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
