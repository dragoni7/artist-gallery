import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteCommission from './DeleteCommission';
import { Commission } from '@/types';
import CompleteCommission from './CompleteCommission';

interface EditCommissionsProps {
  commissions: Commission[];
  fetchCommissions: () => Promise<void>;
}

export default function EditCommissions(props: EditCommissionsProps) {
  const [commission, setCommission] = useState<Commission>();

  useEffect(() => {
    setCommission(undefined);
  }, [props.commissions]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <FormControl fullWidth>
          <InputLabel id="commission-label">Commission</InputLabel>
          <Select
            labelId="commission-label"
            id="commission-select"
            value={commission?.id}
            label="Commission"
            onChange={(event) => {
              setCommission(
                props.commissions.find((c: Commission) => c.id && c.id === event.target.value)
              );
            }}
          >
            {props.commissions.map((c) => (
              <MenuItem value={c.id}>{c.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        {commission && (
          <DeleteCommission commission={commission} onDelete={props.fetchCommissions} />
        )}
      </Grid>
      <Grid size={6}>
        {commission && (
          <CompleteCommission commission={commission} onComplete={props.fetchCommissions} />
        )}
      </Grid>
    </Grid>
  );
}
