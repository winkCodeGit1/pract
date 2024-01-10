import { Card, Container } from '@mui/material';
import CardPatientCount from './CardPatientCount';

export function Tokens({ tokensCard }) {
  return (
    <Card variant='outlined'>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <CardPatientCount tokens={tokensCard} />
        </div>
      </Container>
    </Card>
  );
}
