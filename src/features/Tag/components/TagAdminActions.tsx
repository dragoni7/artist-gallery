import Loading from '@/components/Loading';
import useTags from '@/hooks/useTags';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { rolesContext } from '@/app/routes/AdminPanel';
import { useContext } from 'react';
import AddTag from './AddTag';
import { deleteTag } from '../api/delete-tag';

export default function TagAdminActions() {
  const { tags, fetchTags, loading } = useTags();
  const roles = useContext(rolesContext);

  return loading ? (
    <Loading />
  ) : (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <Typography variant="h5">Click x to delete a tag</Typography>
      <Grid
        container
        spacing={1}
        p={3}
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 4 }}
      >
        {tags.map((t) => (
          <Grid>
            <Chip
              label={t.name}
              onDelete={async () => {
                await deleteTag(t, roles);
                await fetchTags();
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box width="50%">
        <Typography variant="h5">Add Tag:</Typography>
        <AddTag fetchTags={fetchTags} />
      </Box>
    </Stack>
  );
}
