import * as yup from 'yup';
import { CommissionDto } from '@/types';
import { COMMISSION_TIERS } from '@/util/consts';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { createCommission } from '../api/create-commission';
import { useContext } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';
import FormTextField from '@/components/FormTextField';

const schema = yup.object().shape({
  tier: yup
    .string()
    .oneOf(
      COMMISSION_TIERS.map((t) => t.id),
      'You must select a value'
    )
    .defined(),
  description: yup.string().required('description is required'),
  completed: yup.bool().oneOf([true, false], 'You must select a value').defined(),
});

interface AddCommissionsProps {
  fetchCommissions: () => Promise<void>;
}

export default function AddCommission(props: AddCommissionsProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommissionDto>({
    resolver: yupResolver(schema),
  });

  const roles = useContext(rolesContext);

  const onSubmit = async (data: CommissionDto) => {
    await createCommission(data, roles);
    await props.fetchCommissions();
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: 'background.paper',
        border: '3px solid pink',
        borderRadius: 4,
        p: 1,
        my: 2,
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <Controller
          name="tier"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.tier}>
              <InputLabel>Commission Tier</InputLabel>
              <Select {...field} label="Commission Tier">
                {COMMISSION_TIERS.map((tier) => (
                  <MenuItem value={tier.id}>{tier.label}</MenuItem>
                ))}
              </Select>
              {errors.tier && (
                <Typography
                  style={{ fontSize: '0.8rem', textAlign: 'start', paddingLeft: 3 }}
                  color="error"
                >
                  {errors.tier.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        {FormTextField('description', 'Description', control, errors, 1)}
        <Controller
          name="completed"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Completed?"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          sx={{ backgroundColor: 'secondary.surface', color: 'background.default' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
