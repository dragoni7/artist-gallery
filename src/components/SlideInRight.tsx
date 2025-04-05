import { motion } from 'framer-motion';

interface SlideInRightProps {
  children: React.ReactNode;
  initialY?: number;
  duration?: number;
  zIndex?: number;
}

export default function SlideInRight(props: SlideInRightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: props.initialY ? props.initialY : -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: props.initialY ? props.initialY : -20 }}
      transition={{ duration: props.duration ? props.duration : 0.5 }}
      style={{ position: 'fixed', width: '100%', zIndex: props.zIndex ? props.zIndex : 1000 }}
    >
      {props.children}
    </motion.div>
  );
}
