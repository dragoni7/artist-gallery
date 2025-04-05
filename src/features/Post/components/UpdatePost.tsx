import { Post, Tag } from '@/types';
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
import { updatePost } from '../api/update-post';

interface UpdatePostProps {
  post: Post;
  onUpdate: () => Promise<void>;
}

export default function UpdatePost(props: UpdatePostProps) {
  const roles = useContext(rolesContext);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { tags } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>(props.post.tags.map((t) => t.name));

  useEffect(() => {
    setSelectedTags(props.post.tags.map((t) => t.name));
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
            sx: { height: '80vh' },
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              let edited = props.post;
              edited.title = formJson.title ?? edited.title;
              edited.description = formJson.description ?? null;
              edited.tags = selectedTags.map((t: string): Tag => {
                return {
                  name: t,
                };
              });
              setEditOpen(false);
              await updatePost(edited, roles);
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
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="title"
              fullWidth
              variant="standard"
              defaultValue={props.post.title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="description"
              fullWidth
              variant="standard"
              defaultValue={props.post.description}
            />
            <Autocomplete
              id="tags"
              multiple
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
              value={selectedTags}
              onChange={(_, value) => {
                setSelectedTags(value);
              }}
              renderInput={(params) => <TextField {...params} label="Tags" sx={{ zIndex: 0 }} />}
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
