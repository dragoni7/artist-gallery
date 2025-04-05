import { motion } from 'framer-motion';

export default function FadeIn({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      style={{ height: '100%', width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
