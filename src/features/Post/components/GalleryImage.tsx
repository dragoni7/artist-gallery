import { Post } from '@/types';
import { Box, Grow, ImageListItem, ImageListItemBar, Skeleton } from '@mui/material';
import { useState } from 'react';

interface GalleryImageProps {
  post: Post;
  onOpen: () => void;
}

export default function GalleryImage(props: GalleryImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Box
      key={props.post.id}
      sx={{ '&:hover': { scale: 1.05, cursor: 'pointer' } }}
      onClick={props.onOpen}
    >
      {loading && (
        <Skeleton variant="rectangular" width="333px" height="333px" sx={{ borderRadius: 4 }} />
      )}
      <Grow in={true} mountOnEnter unmountOnExit>
        <ImageListItem key={props.post.id}>
          <Box
            component="img"
            srcSet={`${props.post.source}?w=168&fit=crop&auto=format&dpr=2 2x`}
            src={`${props.post.source}?w=168&fit=crop&auto=format`}
            alt={props.post.title}
            onLoad={() => setLoading(false)}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: 'block',
              width: '100%',
            }}
          />
          <ImageListItemBar position="below" title={props.post.title} />
        </ImageListItem>
      </Grow>
    </Box>
  );
}
