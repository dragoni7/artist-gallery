import { OC } from '@/types';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Chip, Divider, Grid, Grow, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface OCPageProps {
  oc: OC | undefined;
}

export default function OCPage(props: OCPageProps) {
  const navigate = useNavigate();

  return (
    <Box height="100%">
      <Typography variant="h3">{props.oc?.name}</Typography>
      <Divider variant="middle" sx={{ backgroundColor: 'primary.highlight', my: 2 }} />
      <Grid container spacing={2} alignItems="flex-start" width="100%" height="100%">
        <Grid size={{ md: 6, sm: 12 }}>
          <Grow in={true}>
            <Box
              component="img"
              src={props.oc?.descriptionImg}
              width="100%"
              sx={{ objectFit: 'scale-down', borderRadius: 4, border: '3px solid black' }}
            />
          </Grow>
        </Grid>
        <Grid container size={{ md: 6, sm: 12 }}>
          <Grid size={6}>
            <Grow in={true}>
              <Stack direction="row" spacing={1}>
                <FontAwesomeIcon icon={faTag} size="2x" />
                <Chip
                  label={props.oc?.name}
                  onClick={() => navigate(`/gallery?tags=${props.oc?.tag.name}`)}
                />
              </Stack>
            </Grow>
          </Grid>
          <Grid size={12}>
            <Grow in={true} style={{ transitionDelay: '100ms' }}>
              <Typography
                sx={{
                  backgroundColor: 'primary.highlight',
                  borderRadius: 4,
                  p: 2,
                }}
              >
                {props.oc?.description}
              </Typography>
            </Grow>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
