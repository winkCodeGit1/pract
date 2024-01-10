// import { Box, Button, Card, Typography } from '@mui/material';

// export function CounterList({ counterList, tokensList, isTokenList, removeToken }) {

//   const handleTokenSubmitAssign = (event) => {
//     const emptyToken = tokensList.find((token) => token.counter === 'c0');
//     if (emptyToken) {
//       const updateToken = tokensList.map(token => token.id === emptyToken.id ? { ...token, counter: event.target.value } : token);
//       const filteredTokens = updateToken.filter(val => val.counter === 'c0');
//       isTokenList([...filteredTokens]);
//       const updateRemoveSimilarToken = updateToken.filter(val => val.counter !== 'c0');
//       removeToken([...updateRemoveSimilarToken]);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'grid',
//         columnGap: 1,
//         rowGap: '11px',
//         gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(4, 1fr)' },
//       }}
//     >
//       {!!counterList.length && counterList.map((val) => (
//         <StyleCounter key={val.id} list={val.label} value={val.value} handleToken={handleTokenSubmitAssign} tokenNameVal={val.tokenName} />
//       ))}
//     </Box>
//   );
// }

// ///-------------------------------------------------------------------------------------------------////////

// export function StyleCounter({ list, value, handleToken, tokenNameVal }) {
//   const handleTokenLabel = (event) => {
//     handleToken(event);
//   };
//   return (
//     <Card sx={{ p: 1.8 }}>
//       <Typography gutterBottom variant='h6' color='text.primary'>
//         {list}
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color='text.secondary'>
//         Token:{tokenNameVal}
//       </Typography>
//       <Button variant='contained' value={value} onClick={handleTokenLabel}>
//         NEXT
//       </Button>
//     </Card>
//   );
// }
