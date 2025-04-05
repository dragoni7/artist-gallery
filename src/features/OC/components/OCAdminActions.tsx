import Loading from '@/components/Loading';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import useOCs from '../hooks/useOCs';
import EditOC from './EditOC';
import AddOC from './AddOC';

export default function OCAdminActions() {
  const { ocs, fetchOCs, loading } = useOCs();

  return (
    <Stack spacing={2}>
      <Accordion sx={{ backgroundColor: 'primary.highlight' }} defaultExpanded>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
          <Typography>Edit OCs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? <Loading /> : <EditOC ocs={ocs} fetchOCs={fetchOCs} />}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'primary.highlight' }} defaultExpanded>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
          <Typography>Create OC</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddOC fetchOCs={fetchOCs} />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
