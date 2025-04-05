import { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import LargeNav from '@/components/LargeNav';
import HoverNavLink from './HoverNavLink';
import { mdContext } from '@/app/App';
import SlideInRight from './SlideInRight';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const isMd = useContext(mdContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <SlideInRight>
            <AppBar
              position="fixed"
              sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'primary.surface' }}
              enableColorOnDark
            >
              {isMd ? (
                <img src="/assets/oniiyannalogo.png" width="6%" style={{ padding: 2 }} />
              ) : (
                <img src="/assets/oniiyannaO.png" width="14%" style={{ padding: 2 }} />
              )}

              <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '89%' }}>
                <Box sx={{ display: 'flex', gap: 2, color: 'black' }}>
                  <HoverNavLink href="about" label="About" />
                  <HoverNavLink href="gallery" label="Gallery" />
                  <HoverNavLink href="commissions" label="Commissions" />
                  <HoverNavLink href="ocs" label="OCs" />
                </Box>
              </Toolbar>
            </AppBar>
          </SlideInRight>
        )}
      </AnimatePresence>
      {!isScrolled ? (
        <LargeNav />
      ) : (
        <Box
          sx={{
            height: '80vh',
            width: '100vw',
          }}
        />
      )}

      <Box
        sx={{
          height: '60vh',
          width: '100vw',
        }}
      />
    </>
  );
};
