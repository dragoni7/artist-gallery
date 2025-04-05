import * as yup from 'yup';
import { Tag } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { rolesContext } from '@/app/routes/AdminPanel';
import FormTextField from '@/components/FormTextField';
import { createTag } from '../api/create-tag';

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
});

interface AddTagProps {
  fetchTags: () => Promise<void>;
}

export default function AddTag(props: AddTagProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tag>({
    resolver: yupResolver(schema),
  });

  const roles = useContext(rolesContext);

  const onSubmit = async (data: Tag) => {
    await createTag(data, roles);
    await props.fetchTags();
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
        {FormTextField('name', 'Name', control, errors)}
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
