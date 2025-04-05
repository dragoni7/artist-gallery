import { Stack, Typography } from '@mui/material';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export default function Loading() {
  const controlsDot1 = useAnimationControls();
  const controlsDot2 = useAnimationControls();
  const controlsDot3 = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      await controlsDot1.start({ opacity: 1, transition: { duration: 0.4 } });
      await controlsDot2.start({ opacity: 1, transition: { duration: 0.4 } });
      await controlsDot3.start({ opacity: 1, transition: { duration: 0.4 } });
      await new Promise((resolve) => setTimeout(resolve, 400));
      await Promise.all([
        controlsDot1.start({ opacity: 0, transition: { duration: 0.4 } }),
        controlsDot2.start({ opacity: 0, transition: { duration: 0.4 } }),
        controlsDot3.start({ opacity: 0, transition: { duration: 0.4 } }),
      ]);
      sequence();
    };

    sequence();
  }, [controlsDot1, controlsDot2, controlsDot3]);

  return (
    <Stack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <img src="/assets/annarun.gif" />
      <Typography variant="h6">
        Loading
        <motion.span initial={{ opacity: 0 }} animate={controlsDot1}>
          .
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={controlsDot2}>
          .
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={controlsDot3}>
          .
        </motion.span>
      </Typography>
    </Stack>
  );
}
