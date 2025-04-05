import Loading from '@/components/Loading';
import CommissionAdminActions from '@/features/Commission/components/CommissionAdminActions';
import OCAdminActions from '@/features/OC/components/OCAdminActions';
import PostAdminActions from '@/features/Post/components/PostAdminActions';
import TagAdminActions from '@/features/Tag/components/TagAdminActions';
import useRoles from '@/hooks/useRoles';
import { UserRoles } from '@/util/consts';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { createContext, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export const rolesContext = createContext<UserRoles[]>([]);

export const AdminPanel = () => {
  const [value, setValue] = useState<number>(1);
  const { roles, loading } = useRoles();

  function a11yProps(index: number) {
    return {
      id: `admin-tab-${index}`,
      'aria-controls': `admin-tabpanel-${index}`,
    };
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <Box width="100%">
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'secondary.highlight' }}
        >
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            aria-label="admin-tabs"
            variant="fullWidth"
          >
            <Tab label="Commissions" {...a11yProps(0)} />
            <Tab label="Posts" {...a11yProps(1)} />
            <Tab label="Tags" {...a11yProps(2)} />
            <Tab label="OCs" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {loading ? (
          <Loading />
        ) : (
          roles.includes(UserRoles.ADMIN) && (
            <rolesContext.Provider value={roles}>
              <CustomTabPanel value={value} index={0}>
                <CommissionAdminActions />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <PostAdminActions />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <TagAdminActions />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <OCAdminActions />
              </CustomTabPanel>
            </rolesContext.Provider>
          )
        )}
      </Box>
    </Paper>
  );
};
