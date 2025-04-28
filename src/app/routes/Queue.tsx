import { Box, Paper, Stack, Typography } from '@mui/material';
import FadeIn from '@/components/FadeIn';
import CommissionQueue from '@/features/Commission/components/CommissionQueue';
import { useContext } from 'react';
import { mdContext } from '../App';

export const Queue = () => {
  const isMd = useContext(mdContext);

  return (
    <Paper
      id="Queue"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <FadeIn>
        <Stack alignItems="center" width="100%">
          <Typography variant="h5" p={2}>
            Current Queue:
          </Typography>
          <Box width={isMd ? '80%' : '100%'} sx={{ p: 1, m: 1 }}>
            <CommissionQueue />
          </Box>
        </Stack>
      </FadeIn>
    </Paper>
  );
};
