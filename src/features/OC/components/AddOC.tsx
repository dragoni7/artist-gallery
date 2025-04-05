import * as yup from 'yup';
import { rolesContext } from '@/app/routes/AdminPanel';
import { OCFormData, Tag } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Box,
  Typography,
  Button,
  Autocomplete,
  Chip,
  LinearProgress,
  Stack,
} from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTags from '@/hooks/useTags';
import { uploadImage } from '../../../api/upload-image';
import FormTextField from '@/components/FormTextField';
import { createOC } from '../api/create-oc';

interface AddOCProps {
  fetchOCs: () => Promise<void>;
}

const schema = yup.object().shape({
  name: yup.string().required('You must provide a name'),
  description: yup.string().required('You must provide a description'),
  tag: yup.string().required('You must provide a tag'),
  descriptionImg: yup.mixed<File>().required('You must upload an image').defined(),
  headerImg: yup.mixed<File>().required('You must upload an image').defined(),
});

export default function AddOC(props: AddOCProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OCFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const roles = useContext(rolesContext);
  const { tags } = useTags();
  const [descriptionImgPreview, setDescriptionImgPreview] = useState<string>('');
  const [headerImgPreview, setHeaderImgPreview] = useState<string>('');
  const [creatingOC, setCreatingOC] = useState<boolean>(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const files = event.target.files;

    if (files && files[0]) {
      setValue(index === 0 ? 'descriptionImg' : 'headerImg', files[0]);
      const preview = URL.createObjectURL(files[0]);
      if (index === 0) {
        setDescriptionImgPreview(preview);
      } else {
        setHeaderImgPreview(preview);
      }
    }
  }

  const onSubmit = async (data: OCFormData) => {
    setCreatingOC(true);

    console.log(data);

    const descriptionImg = await uploadImage(data.descriptionImg, roles);
    const headerImg = await uploadImage(data.headerImg, roles);

    await createOC(
      {
        name: data.name,
        tag: {
          name: data.tag,
        },
        description: data.description,
        descriptionImg: descriptionImg,
        headerImg: headerImg,
      },
      roles
    );

    reset();
    setDescriptionImgPreview('');
    setHeaderImgPreview('');
    setCreatingOC(false);
    await props.fetchOCs();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 3, maxWidth: 500, mx: 'auto' }}
    >
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <input
          type="file"
          accept="image/*"
          {...register('descriptionImg')}
          onChange={(e) => handleFileChange(e, 0)}
          style={{ display: 'none' }}
          id="descriptionimg-upload"
        />
        <label htmlFor="descriptionimg-upload">
          <Button variant="contained" component="span">
            Select Description Image
          </Button>
        </label>
        {errors.descriptionImg && (
          <Typography color="error">{errors.descriptionImg.message}</Typography>
        )}
        {descriptionImgPreview !== '' && (
          <Box sx={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 1 }}>
            <img
              src={descriptionImgPreview}
              alt={`description img preview`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        <input
          type="file"
          accept="image/*"
          {...register('headerImg')}
          onChange={(e) => handleFileChange(e, 1)}
          style={{ display: 'none' }}
          id="headerimg-upload"
        />
        <label htmlFor="headerimg-upload">
          <Button variant="contained" component="span">
            Select Header Image
          </Button>
        </label>
        {errors.headerImg && <Typography color="error">{errors.headerImg.message}</Typography>}
        {headerImgPreview !== '' && (
          <Box sx={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 1 }}>
            <img
              src={headerImgPreview}
              alt={`header img preview`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
      </Stack>

      {FormTextField('name', 'Name', control, errors)}
      {FormTextField('description', 'Description', control, errors)}

      <Controller
        name="tag"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="tag"
            disablePortal
            options={tags.map((a: Tag) => a.name)}
            renderOption={(props, option) => (
              <li {...props} style={{ justifyContent: 'center' }}>
                <Chip label={option} sx={{ backgroundColor: 'primary.surface', color: 'black' }} />
              </li>
            )}
            value={field.value || ''}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tag"
                error={!!errors.tag}
                helperText={errors.tag ? (errors.tag as any).message : ''}
                sx={{ zIndex: 0 }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
            }
          />
        )}
      />

      {creatingOC ? (
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
