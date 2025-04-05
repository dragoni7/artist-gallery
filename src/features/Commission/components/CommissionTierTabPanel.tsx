import { CommissionTier } from '@/types';
import CommissionTierCarousel from './CommissionTierCarousel';
import { Stack, Typography } from '@mui/material';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { mdContext } from '@/app/App';

interface TabPanelProps {
  commissionTier: CommissionTier;
  value: string;
}

export default function CommissionTierTabPanel(props: TabPanelProps) {
  const { commissionTier, value, ...other } = props;
  const isMd = useContext(mdContext);

  return (
    <div
      role="tabpanel"
      hidden={props.value !== props.commissionTier.id}
      id={`simple-tabpanel-${props.commissionTier.id}`}
      aria-labelledby={`simple-tab-${props.commissionTier.id}`}
      {...other}
    >
      {value === commissionTier.id && (
        <Stack alignItems="center" height="100%">
          <Typography
            variant="h5"
            sx={{ backgroundColor: 'primary.highlight', borderRadius: 4, width: '50%' }}
          >
            Price: {props.commissionTier.cost}$
          </Typography>
          <Stack
            direction={isMd ? 'row' : 'column'}
            spacing={2}
            paddingTop={1}
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            {commissionTier.details.map((d) => (
              <Typography>
                <FontAwesomeIcon icon={faThumbTack} />
                &nbsp;&nbsp;
                {d}
              </Typography>
            ))}
          </Stack>
          <CommissionTierCarousel commissionTier={props.commissionTier} />
        </Stack>
      )}
    </div>
  );
}
