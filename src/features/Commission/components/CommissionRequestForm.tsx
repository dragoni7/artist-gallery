import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CommissionRequest } from '@/types';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grow,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import TermsOfServiceList from './TermsOfServiceList';
import { COMMISSION_TIERS } from '@/util/consts';
import { createCommissionRequest } from '../api/create-commission-request';
import { mdContext } from '@/app/App';
import { useContext, useState } from 'react';
import FormTextField from '@/components/FormTextField';

const schema = yup.object().shape({
  contactHandle: yup.string().required('handle is required'),
  paypal: yup.string().email('Invalid email format').required('PayPal is required'),
  commissionTier: yup
    .string()
    .oneOf(
      COMMISSION_TIERS.map((t) => t.id),
      'You must select a value'
    )
    .defined(),
  private: yup.bool().oneOf([true, false], 'You must select a value').defined(),
  termsOfService: yup.boolean().oneOf([true], 'You must read and accept the terms').defined(),
  description: yup.string().required('Please enter a description with ref links'),
});

interface CommissionRequestFormProps {
  exampleRef: React.RefObject<HTMLDivElement | null>;
}

export default function CommissionRequestForm(props: CommissionRequestFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommissionRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      contactHandle: '',
      paypal: '',
      commissionTier: '',
      private: false,
      termsOfService: false,
      description: '',
    },
  });

  const isMd = useContext(mdContext);
  const [sending, setSending] = useState<boolean>(false);

  const onSubmit = async (data: CommissionRequest) => {
    setSending(true);
    await createCommissionRequest(data);
    setSending(false);
    reset();
  };

  function scrollToExamples() {
    console.log('scrolling');
    props.exampleRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <Grow in={true}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: 'primary.highlight',
          border: '3px solid pink',
          borderRadius: 4,
          p: 1,
          my: 2,
          height: '100%',
          width: isMd ? '80%' : '100%',
        }}
      >
        <Stack direction={isMd ? 'row' : 'column'} spacing={isMd ? 5 : 2} height="100%">
          <Box
            width={{ md: '50%', sm: '100%' }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {FormTextField('contactHandle', 'Contact Handle', control, errors)}
            <Typography sx={{ fontSize: '0.8rem', paddingLeft: 1 }}>
              If accepted, I will contact you at this handle
            </Typography>
            {FormTextField('paypal', 'PayPal Email', control, errors)}
            <Controller
              name="commissionTier"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.commissionTier}>
                  <InputLabel>Commission Tier</InputLabel>
                  <Select
                    {...field}
                    label="Commission Tier"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                  >
                    {COMMISSION_TIERS.map((tier) => (
                      <MenuItem value={tier.id}>{tier.label}</MenuItem>
                    ))}
                  </Select>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      textAlign: 'start',
                      paddingLeft: 1,
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={scrollToExamples}
                  >
                    Examples can be viewed below.
                  </Typography>
                  {errors.commissionTier && (
                    <Typography
                      sx={{ fontSize: '0.8rem', textAlign: 'start', paddingLeft: 1 }}
                      color="error"
                    >
                      {errors.commissionTier.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            {FormTextField('description', 'Description', control, errors, 3)}
            <Typography sx={{ fontSize: '0.8rem', paddingLeft: 3 }}>
              !! Include links to pose / character / reference images !!
            </Typography>
            <Controller
              name="private"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Private? (I will not post the piece)"
                />
              )}
            />
            {sending ? (
              <Box width="100%">
                <LinearProgress color="info" />
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                sx={{ backgroundColor: 'primary.surface', color: 'background.default' }}
              >
                Submit
              </Button>
            )}
          </Box>
          <Box
            width={{ md: '50%', sm: '100%' }}
            height={isMd ? '600px' : '500px'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h5">Terms of Service</Typography>
            <Divider variant="middle" flexItem />
            <TermsOfServiceList />
            <Controller
              name="termsOfService"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Accept?"
                />
              )}
            />
            {errors.termsOfService && (
              <Typography sx={{ fontSize: '0.8rem' }} color="error">
                {errors.termsOfService.message}
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </Grow>
  );
}
