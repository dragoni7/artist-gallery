import { Post } from '@/types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef, useState } from 'react';
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';

interface EditPostProps {
  posts: Post[];
  fetchPosts: () => Promise<void>;
}

export default function EditPost(props: EditPostProps) {
  const { posts, fetchPosts } = props;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [post, setPost] = useState<Post>(posts[0]);
  let sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (_, next) => setSlideIndex(next),
  };

  useEffect(() => {
    setPost(posts[slideIndex]);
  }, [slideIndex]);

  useEffect(() => {
    setSlideIndex(0);
  }, [posts]);

  return (
    <Stack alignItems="center" spacing={1}>
      <Box width="90%">
        <Slider ref={sliderRef} {...settings}>
          {posts.map((post) => (
            <Box key={post.id} sx={{ height: 360, width: 360, objectFit: 'contain' }}>
              <img
                src={post.source}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box width="50%">
        <FormControl fullWidth>
          <InputLabel id="post-label">Post</InputLabel>
          <Select
            labelId="post-label"
            id="post-select"
            value={slideIndex}
            label="Post"
            onChange={(event: SelectChangeEvent<number>) => {
              const index = event.target.value as number;
              if (sliderRef.current) {
                (sliderRef.current as unknown as { slickGoTo: (index: number) => void }).slickGoTo(
                  index
                );
              }
            }}
          >
            {posts.map((p: Post, index) => (
              <MenuItem value={index}>{p.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        width="50%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {post !== undefined && <UpdatePost post={post} onUpdate={fetchPosts} />}
        {post !== undefined && <DeletePost post={post} onDelete={fetchPosts} />}
      </Box>
    </Stack>
  );
}
