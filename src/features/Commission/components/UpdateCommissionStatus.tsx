import useStatus from '@/hooks/useStatus';
import { UserRoles } from '@/util/consts';
import { Typography, Checkbox, Box } from '@mui/material';
import { updateStatus } from '../api/update-status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

interface UpdateCommissionStatusProps {
  roles: UserRoles[];
}

export default function UpdateCommissionStatus(props: UpdateCommissionStatusProps) {
  const { status, fetchStatus } = useStatus();
  return (
    <Box width="25%" sx={{ backgroundColor: 'primary.highlight', borderRadius: 4, p: 1 }}>
      <Typography variant="h5">Commission Status</Typography>
      <Checkbox
        aria-label="open"
        size="large"
        checked={status}
        icon={<FontAwesomeIcon icon={faCircleXmark} size="2x" />}
        checkedIcon={<FontAwesomeIcon icon={faSquareCheck} size="2x" />}
        onChange={async () => {
          await updateStatus(!status, props.roles);
          await fetchStatus();
        }}
        sx={{
          color: 'red',
          '&.Mui-checked': {
            color: 'green',
          },
        }}
      />
    </Box>
  );
}
