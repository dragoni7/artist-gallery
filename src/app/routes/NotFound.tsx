import { Paper, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Paper
      id="404"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.paper',
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography variant="h3">404 Page Not Found</Typography>
      <Typography variant="h4">
        The content you are looking for does not exist or was moved.
      </Typography>
      <img src="/assets/yannayappa.gif" width="30%" />
    </Paper>
  );
};
