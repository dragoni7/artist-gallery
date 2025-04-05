import { OC, Tag } from '@/types';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';
import useTags from '@/hooks/useTags';
import { updateOC } from '../api/update-oc';

interface UpdateOCProps {
  oc: OC;
  onUpdate: () => Promise<void>;
}

export default function UpdateOC(props: UpdateOCProps) {
  const roles = useContext(rolesContext);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { tags } = useTags();
  const [selectedTag, setSelectedTag] = useState<string>(props.oc.tag.name);

  useEffect(() => {
    setSelectedTag(props.oc.tag.name);
  }, [props]);

  return (
    <>
      <Button variant="contained" color="info" onClick={() => setEditOpen(true)}>
        Edit
      </Button>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        slotProps={{
          paper: {
            component: 'form',
            sx: { height: '80vh', width: '100%' },
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              let edited = props.oc;
              edited.description = formJson.description ?? null;
              edited.tag = { name: selectedTag };
              setEditOpen(false);
              await updateOC(edited, roles);
              await props.onUpdate();
            },
          },
        }}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              autoFocus
              required
              multiline
              rows={6}
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="description"
              fullWidth
              variant="standard"
              defaultValue={props.oc.description}
            />
            <Autocomplete
              id="tag"
              disablePortal
              options={tags.map((a: Tag) => a.name)}
              renderOption={(props, option) => (
                <li {...props} style={{ justifyContent: 'center' }}>
                  <Chip
                    label={option}
                    sx={{ backgroundColor: 'primary.surface', color: 'black' }}
                  />
                </li>
              )}
              value={selectedTag}
              onChange={(_, value) => {
                setSelectedTag(value as string);
              }}
              renderInput={(params) => <TextField {...params} label="Tag" sx={{ zIndex: 0 }} />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
