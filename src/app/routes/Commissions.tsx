import FadeIn from '@/components/FadeIn';
import CommissionQueue from '@/features/Commission/components/CommissionQueue';
import CommissionRequestForm from '@/features/Commission/components/CommissionRequestForm';
import CommissionTierTabPanel from '@/features/Commission/components/CommissionTierTabPanel';
import useStatus from '@/hooks/useStatus';
import { COMMISSION_TIERS } from '@/util/consts';
import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { mdContext } from '../App';
import Loading from '@/components/Loading';

export const Commissions = () => {
  const { status, loading } = useStatus();
  const [value, setValue] = useState<string>('chibi');
  const isMd = useContext(mdContext);
  const exampleRef = useRef<HTMLDivElement>(null);

  function a11yProps(value: string) {
    return {
      id: `simple-tab-${value}`,
      'aria-controls': `simple-tabpanel-${value}`,
    };
  }

  return (
    <Paper
      id="About"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <FadeIn>
        <Stack alignItems="center" width="100%">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Typography variant={isMd ? 'h4' : 'h5'} paddingTop={1}>
                Commissions:{' '}
                <a style={{ color: status ? 'green' : 'red' }}>{status ? 'Open' : 'Closed'}</a>
              </Typography>
              <Typography variant={isMd ? 'h6' : 'body1'}>
                {status
                  ? 'Fill out the following form to request a commission from me:'
                  : 'Check here later for the commission request form!'}
              </Typography>
              {status && <CommissionRequestForm exampleRef={exampleRef} />}
            </>
          )}
          <Typography variant="h5" p={1}>
            Queue:
          </Typography>
          <Box sx={{ p: isMd ? 1 : 0, m: 1 }}>
            <CommissionQueue />
          </Box>
          <Box width="100%" p={3} marginTop={2}>
            <Box
              borderBottom={3}
              borderColor="secondary.highlight"
              textAlign="center"
              justifyContent="space-evenly"
              display="flex"
              flexDirection="row"
              marginBottom={2}
            >
              <Tabs
                ref={exampleRef}
                value={value}
                onChange={(_, newValue) => setValue(newValue)}
                aria-label="tiers"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                {COMMISSION_TIERS.map((tier) => (
                  <Tab value={tier.id} label={tier.label} {...a11yProps(tier.id)} />
                ))}
              </Tabs>
            </Box>
            {COMMISSION_TIERS.map((tier) => (
              <CommissionTierTabPanel value={value} commissionTier={tier} />
            ))}
          </Box>
        </Stack>
      </FadeIn>
    </Paper>
  );
};
