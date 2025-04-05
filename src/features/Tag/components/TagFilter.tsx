import { mdContext } from '@/app/App';
import usePersistantSearchParams from '@/hooks/usePersistantSearchParams';
import useTags from '@/hooks/useTags';
import { Tag } from '@/types';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

export default function TagFilter() {
  const { searchParams, updateSearchParams } = usePersistantSearchParams();
  const { tags } = useTags();
  const isMd = useContext(mdContext);

  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (searchParams.has('tags')) setValue(searchParams.get('tags')?.split(',') || []);
  }, [searchParams]);

  return (
    <Autocomplete
      multiple
      disablePortal
      options={tags.map((a: Tag) => a.name)}
      renderOption={(props, option) => (
        <li {...props} style={{ justifyContent: 'center' }}>
          <Chip label={option} sx={{ backgroundColor: 'primary.surface', color: 'black' }} />
        </li>
      )}
      value={value}
      onChange={(_, value) => {
        setValue(value);
        updateSearchParams('tags', value.length !== 0 ? value : null);

        if (searchParams.has('page')) updateSearchParams('page', 1);
      }}
      renderInput={(params) => <TextField {...params} label="Tags" sx={{ zIndex: 0 }} />}
      sx={{ minWidth: isMd ? '20%' : '50%', maxWidth: '90%', paddingTop: 2 }}
    />
  );
}
