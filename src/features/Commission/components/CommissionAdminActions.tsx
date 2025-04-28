import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import AddCommission from './AddCommission';
import CommissionQueue from './CommissionQueue';
import EditCommissions from './EditCommissions';
import UpdateCommissionStatus from './UpdateCommissionStatus';
import { useContext } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';
import useCommissions from '@/features/Commission/hooks/useCommissions';

export default function CommissionAdminActions() {
  const roles = useContext(rolesContext);
  const { commissions, fetchCommissions, loading } = useCommissions();

  return (
    <Grid container spacing={2}>
      <Grid size={12} display="flex" flexDirection="column" alignItems="center">
        <UpdateCommissionStatus roles={roles} />
      </Grid>
      <Grid size={7}>
        <Accordion sx={{ backgroundColor: 'primary.highlight' }}>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
            <Typography>Add To Queue</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddCommission fetchCommissions={fetchCommissions} />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'primary.highlight' }}>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
            <Typography>Edit Queue</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EditCommissions commissions={commissions} fetchCommissions={fetchCommissions} />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid size={5}>
        <CommissionQueue supplied={{ queue: commissions, loading: loading }} />
      </Grid>
    </Grid>
  );
}
