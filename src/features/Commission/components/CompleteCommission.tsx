import { Commission } from '@/types';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';
import { updateCommission } from '../api/update-commission';

interface CompleteCommissionProps {
  commission: Commission;
  onComplete: () => Promise<void>;
}

export default function CompleteCommission(props: CompleteCommissionProps) {
  const roles = useContext(rolesContext);

  return (
    <Button
      variant="contained"
      color="success"
      onClick={async () => {
        let edited = props.commission;
        edited.completed = true;
        await updateCommission(edited, roles);
        await props.onComplete();
      }}
    >
      Mark Complete
    </Button>
  );
}
