// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

// export default function Errormessage({data}) {
//   return (
//     <Stack sx={{ width: '100%' }} spacing={2}>
//       <Alert severity="error"  sx={{fontWeight:"600",fontSize:"2rem" }}>Error:{data}</Alert>

//     </Stack>
//   );
// }
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Errormessage({data}) {
  return (
    <Stack sx={{ width: '100%',display:'flex',marginRight:'auto' }} spacing={2}>
     <Alert variant="filled" severity="error">
     {data?data:"Check Your Internet"}
      </Alert>
    </Stack>
  );
}