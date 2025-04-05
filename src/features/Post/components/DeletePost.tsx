import { rolesContext } from '@/app/routes/AdminPanel';
import { Post } from '@/types';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { deletePost } from '../api/delete-post';
import { deleteImage } from '../../../api/delete-image';

interface DeletePostProps {
  post: Post;
  onDelete: () => Promise<void>;
}

export default function DeletePost(props: DeletePostProps) {
  const roles = useContext(rolesContext);

  return (
    <Button
      variant="contained"
      color="error"
      onClick={async () => {
        await deletePost(props.post, roles);
        await deleteImage(props.post.source, roles);
        await props.onDelete();
      }}
    >
      Delete
    </Button>
  );
}
