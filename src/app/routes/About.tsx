import IconLink from '@/components/IconLink';
import { Box, Divider, Grow, Paper, Stack, Typography, Zoom } from '@mui/material';
import { faPatreon, faPaypal, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faGift, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import FadeIn from '@/components/FadeIn';
import GalleryLink from '@/features/Post/components/GalleryLink';
import { useContext } from 'react';
import { mdContext } from '../App';

export const About = () => {
  const isMd = useContext(mdContext);

  return (
    <Paper
      id="About"
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
      <FadeIn>
        <Typography variant={isMd ? 'h5' : 'body1'} p={5}>
          Hey I'm Oniiyanna! Welcome to this small corner of the internet. I'm a freelance artist
          that draws OCs and Fanart. I mostly post on Twitter, however this place will be a neat
          archive of all my public art posts! And if you'd like, you can preview my art early by
          supporting me on Patreon!
        </Typography>
        <Divider>
          <Grow in={true}>
            <img src="/assets/yannayappa.gif" width="100%" style={{ marginBottom: 10 }} />
          </Grow>
        </Divider>
        <Box>
          <Typography variant={isMd ? 'h4' : 'h5'}>Where to Find Me</Typography>
          <Zoom in={true} mountOnEnter unmountOnExit>
            <Stack direction="row" gap={4} alignItems="center" justifyContent="center" p={1}>
              <IconLink link={''} icon={faTwitter} title="Twitter" />
              <IconLink link="" icon={faPaintBrush} title="Picarto" />
              <IconLink link="" icon={faDiscord} title="Discord" />
            </Stack>
          </Zoom>
        </Box>
        <Box>
          <Typography variant={isMd ? 'h4' : 'h5'}>Where to Support Me</Typography>
          <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '400ms' }}>
            <Stack direction="row" gap={4} alignItems="center" justifyContent="center" p={1}>
              <IconLink link="" icon={faPatreon} title="Patreon" />
              <IconLink link="https://paypal.me/oniyanna" icon={faPaypal} title="PayPal" />
              <IconLink link="" icon={faGift} title="Throne" />
            </Stack>
          </Zoom>
        </Box>
        <Box>
          <Divider>
            <Typography variant={isMd ? 'h4' : 'h5'}>Quick Links</Typography>
          </Divider>
          <Stack direction="row" gap={4} alignItems="center" justifyContent="center" p={1}>
            <GalleryLink tag="yannacat" img="/assets/chibi_yanna.png" />
            <GalleryLink tag="anna" img="/assets/chibi_anna.png" />
            <GalleryLink tag="ryoma" img="/assets/chibi_ryoma.png" />
          </Stack>
        </Box>
      </FadeIn>
    </Paper>
  );
};
