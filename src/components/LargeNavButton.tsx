import { mdContext } from '@/app/App';
import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

interface LargeNavButtonProps {
  text: string;
  link: string;
}

export default function LargeNavButton(props: LargeNavButtonProps) {
  const navigate = useNavigate();
  const isMd = useContext(mdContext);

  return (
    <Grid
      size={{ xs: 12, md: 2.5 }}
      onClick={() => {
        navigate('/' + props.link);
      }}
      sx={{
        height: { xs: '10%', md: '100%' },
        alignContent: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        borderBottomLeftRadius: isMd ? 50 : 0,
        borderBottomRightRadius: isMd ? 50 : 0,
        borderRadius: isMd ? 'auto' : 50,
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'primary.highlight',
          scale: 1.075,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Box sx={{ borderRadius: 10, backgroundColor: 'background.paper', m: 5 }}>{props.text}</Box>
      </motion.div>
    </Grid>
  );
}
