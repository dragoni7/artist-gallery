import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import LargeNavButton from './LargeNavButton';
import { mdContext } from '@/app/App';
import { useContext } from 'react';

export default function LargeNav() {
  const isMd = useContext(mdContext);

  return (
    <Grid
      container
      spacing={2}
      textAlign="center"
      alignContent="start"
      sx={{
        height: '95vh',
        width: '100vw',
      }}
    >
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          height: { xs: '15%', md: '100%' },
          alignContent: 'center',
          backgroundColor: 'primary.surface',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingBottom: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isMd ? (
            <img src="./assets/oniiyannaO.png" width="30%" />
          ) : (
            <Box width="100%" marginTop={0} paddingBottom={1}>
              <img src="./assets/oniiyannalogo.png" width="44%" />
            </Box>
          )}
        </motion.div>
      </Grid>
      <LargeNavButton text="About" link={'About'} />
      <LargeNavButton text="Gallery" link={'Gallery'} />
      <LargeNavButton text="Commissions" link={'Commissions'} />
      <LargeNavButton text="Original Characters" link={'OCs'} />
    </Grid>
  );
}
