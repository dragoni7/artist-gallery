import { rolesContext } from '@/app/routes/AdminPanel';
import { OC } from '@/types';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { deleteOC } from '../api/delete-oc';
import { deleteImage } from '@/api/delete-image';

interface DeleteOCProps {
  oc: OC;
  onDelete: () => Promise<void>;
}

export default function DeletePost(props: DeleteOCProps) {
  const roles = useContext(rolesContext);

  return (
    <Button
      variant="contained"
      color="error"
      onClick={async () => {
        await deleteOC(props.oc, roles);
        await deleteImage(props.oc.descriptionImg, roles);
        await deleteImage(props.oc.headerImg, roles);
        await props.onDelete();
      }}
    >
      Delete
    </Button>
  );
}
