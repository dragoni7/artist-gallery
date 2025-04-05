import * as yup from 'yup';
import { rolesContext } from '@/app/routes/AdminPanel';
import { PostFormData, Tag } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Box,
  Typography,
  Button,
  Autocomplete,
  Chip,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTags from '@/hooks/useTags';
import { uploadImage } from '../../../api/upload-image';
import { createPost } from '../api/create-post';
import { createTwitterPost } from '../api/create-twitter-post';
import { createBlueskyPost } from '../api/create-bluesky-post';
import FormTextField from '@/components/FormTextField';

interface AddPostProps {
  fetchPosts: () => Promise<void>;
}

const schema = yup.object().shape({
  title: yup.string().required('You must provide a title'),
  description: yup.string().optional(),
  tags: yup.array().of(yup.string().defined()).min(1, 'You must select at least one tag').defined(),
  images: yup
    .mixed<FileList>()
    .test('required', 'You must upload at least one image', (value) => value && value.length > 0)
    .defined(),
  twitter: yup.bool().oneOf([true, false], 'You must select a value').defined(),
  blueSky: yup.bool().oneOf([true, false], 'You must select a value').defined(),
  uploadText: yup.string().optional(),
});

export default function AddPost(props: AddPostProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const roles = useContext(rolesContext);
  const { tags } = useTags();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [creatingPost, setCreatingPost] = useState<boolean>(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setValue('images', files);
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  }

  const onSubmit = async (data: PostFormData) => {
    setCreatingPost(true);
    let imgUrls: string[] = [];

    for (var file of data.images) {
      imgUrls.push(await uploadImage(file, roles));
    }

    for (let i = 0; i < imgUrls.length; i++) {
      const date = new Date().toISOString().split('T')[0];
      await createPost(
        {
          source: imgUrls[i],
          description: data.description,
          tags: data.tags,
          date: date,
          title: imgUrls.length > 1 ? data.title + ' ' + (i + 1) : data.title,
        },
        roles
      );
    }

    if (data.twitter) {
      await createTwitterPost(data.images, data.uploadText || '', roles);
    }

    if (data.blueSky) {
      await createBlueskyPost(data.images, data.uploadText || '', roles);
    }

    reset();
    setImagePreviews([]);
    setCreatingPost(false);
    await props.fetchPosts();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 3, maxWidth: 500, mx: 'auto' }}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        {...register('images')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span">
          Select Images
        </Button>
      </label>
      {errors.images && <Typography color="error">{errors.images.message}</Typography>}

      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
        {imagePreviews.map((src: string, index: number) => (
          <Box key={index} sx={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 1 }}>
            <img
              src={src}
              alt={`preview ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>

      {FormTextField('title', 'Title', control, errors)}
      {FormTextField('description', 'Description', control, errors)}

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="tags"
            multiple
            disablePortal
            options={tags.map((a: Tag) => a.name)}
            renderOption={(props, option) => (
              <li {...props} style={{ justifyContent: 'center' }}>
                <Chip label={option} sx={{ backgroundColor: 'primary.surface', color: 'black' }} />
              </li>
            )}
            value={field.value || []}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                error={!!errors.tags}
                helperText={errors.tags ? (errors.tags as any).message : ''}
                sx={{ zIndex: 0 }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
            }
          />
        )}
      />
      <Controller
        name="twitter"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Create twitter post?"
          />
        )}
      />
      <Controller
        name="blueSky"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Create bluesky post?"
          />
        )}
      />
      {FormTextField('uploadText', 'Twitter/Bluesky Post Text', control, errors)}
      {creatingPost ? (
        <Box width="100%">
          <LinearProgress color="info" />
        </Box>
      ) : (
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      )}
    </Box>
  );
}
