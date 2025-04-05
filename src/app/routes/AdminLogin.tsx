import useRoles from '@/hooks/useRoles';
import { UserRoles } from '@/util/consts';
import { Box, Button, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const { roles, loading } = useRoles();
  const navigate = useNavigate();

  useEffect(() => {
    if (roles.includes(UserRoles.ADMIN)) navigate('/apanel');
  }, [roles]);

  return (
    <Paper
      id="AdminLogin"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <Box
        width="40%"
        height="100%"
        sx={{ backgroundColor: 'primary.highlight', borderRadius: 4, m: 5, p: 3 }}
      >
        <Button
          href="/alogin"
          size="large"
          fullWidth
          variant="contained"
          color="info"
          sx={{ borderRadius: 4 }}
          disabled={loading}
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};
