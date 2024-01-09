import { Card, CardContent, CardHeader, Typography } from '@mui/material';
function DetailPanel({ title, children }) {
  return (
    <>
      <Card>
        <CardHeader
          title={<Typography variant='subtitle1'>{title}</Typography>}
          sx={{
            p: '6px 10px',
            background: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
          }}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
}

export default DetailPanel;
