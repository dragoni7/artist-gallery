import { Commission } from '@/types';
import { Button } from '@mui/material';
import { deleteCommission } from '../api/delete-commission';
import { useContext } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';

interface DeleteCommissionProps {
  commission: Commission;
  onDelete: () => Promise<void>;
}

export default function DeleteCommission(props: DeleteCommissionProps) {
  const roles = useContext(rolesContext);

  return (
    <Button
      variant="contained"
      color="error"
      onClick={async () => {
        await deleteCommission(props.commission, roles);
        await props.onDelete();
      }}
    >
      Delete
    </Button>
  );
}
