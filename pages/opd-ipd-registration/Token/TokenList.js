import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TokenGenerator } from 'utils/restrict';

// let counterObj = {
// id:1,
// name:'Raju',

// };

const tokenObj = new TokenGenerator({ count: 100 });
const counterObj = new TokenGenerator({ count: 1, title: 'Counter' });

export default function Token() {
  const [tokens, setTokens] = useState([]);
  const [counters, setCounters] = useState([]);

  function handleNextToken(selectedCounter) {
    if (tokens.length > 0) {
      const newToken = tokens.shift();
      setTokens([...tokens]);
      const updateCounter = counters.map((counter) => {
        if (counter.id == selectedCounter.id) {
          return {
            ...counter,
            token: newToken,
          };
        }
        return counter;
      });
      setCounters(updateCounter);
    } else {
      toast.warn('no more token!!');
    }
  }

  return (
    <Container>
      <Box>
        <Button
          onClick={() => setTokens((prevTokens) => [...prevTokens, tokenObj.generateToken()])}
          variant='contained'
        >
          Generate Token
        </Button>
      </Box>
      <Box>
        <Typography>Generated tokens</Typography>
        <Box>
          {tokens.map((token) => (
            <Card key={token.id}>
              <CardHeader title={token.title} />
              <CardContent>
                <Typography>{token.id}</Typography>
                <Typography variant='h4' color='teal'>
                  {token.count}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography align='center' variant='h6' color='GrayText'>
          Counter
        </Typography>
        <Box>
          <Box textAlign='end'>
            <Button
              onClick={() =>
                setCounters((prevTokens) => [
                  ...prevTokens,
                  { ...counterObj.generateToken(), token: {} },
                ])
              }
              variant='contained'
            >
              Add Counter
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {counters.map((counter) => (
              <Box key={counter.id} sx={{ border: '1px solid lightgrey' }} p={4}>
                <Typography>Name:-{counter.title}</Typography>
                <Box>
                  <Typography color={'lightgreen'}>CurrentToken:-{counter.token.title}</Typography>
                </Box>

                <Box>
                  <Button onClick={() => handleNextToken(counter)}>Next Token</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

// import { useEffect, useState } from 'react';
// import { Card, Grid } from '@mui/material';
// import { GenerateToken } from './GenerateToken';
// import { Tokens } from './Tokens';
// import { CounterList } from './CounterList';

// export default function TokenList() {
//   const [tokens, setTokens] = useState([]);
//   const [assignedToken, setassignedToken] = useState([]);

//   const [counters, setCounters] = useState([
//     { id: 1, value: 'c1', label: 'Counter - 1', tokenName: '' },
//     { id: 2, value: 'c2', label: 'Counter - 2', tokenName: '' },
//     { id: 3, value: 'c3', label: 'Counter - 3', tokenName: '' },
//     { id: 4, value: 'c4', label: 'Counter - 4', tokenName: '' },
//   ]);

//   useEffect(() => {
//     console.log(assignedToken.length, 'assignedToken');
//     if (assignedToken.length > 0) {
//       const assignchage = counters.map(val => val.value === assignedToken[0].counter ? { ...val, tokenName: assignedToken[0].label } : val);
//       setCounters([...assignchage]);
//     }

//   }, [assignedToken]);

//   return (
//     <Grid container spacing={3}>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ p: 3, height: '450px' }}>
//             <GenerateToken isToken={setTokens} />
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Tokens tokensCard={tokens} />
//         </Grid>
//       </Grid>

//       <Grid item xs={12} md={12}>
//         <CounterList counterList={counters} tokensList={tokens} isTokenList={setTokens} removeToken={setassignedToken} />
//       </Grid>
//     </Grid>
//   );
// }
