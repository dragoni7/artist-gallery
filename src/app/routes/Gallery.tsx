import FadeIn from '@/components/FadeIn';
import GalleryImage from '@/features/Post/components/GalleryImage';
import usePosts from '@/features/Post/hooks/usePosts';
import { Post } from '@/types';
import {
  Box,
  Chip,
  Grid,
  Grow,
  IconButton,
  ImageList,
  Modal,
  Pagination,
  Paper,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFilteredPosts from '@/features/Post/hooks/useFilteredPosts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { mdContext } from '../App';
import Loading from '@/components/Loading';
import TagFilter from '@/features/Tag/components/TagFilter';

export const Gallery = () => {
  const { posts, loading } = usePosts();
  const filteredPosts = useFilteredPosts(posts);
  const isMd = useContext(mdContext);

  const POSTS_PER_PAGE = 12;

  const [open, setOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Post>();
  const [searchParams, setSearchParams] = useSearchParams();

  function updateSearchParams(key: string, value: any) {
    setSearchParams(() => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      return searchParams;
    });
  }

  const pagination = (
    <Pagination
      count={Math.round(filteredPosts.length / POSTS_PER_PAGE)}
      boundaryCount={isMd ? 4 : 1}
      defaultPage={1}
      showFirstButton
      showLastButton
      page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
      color="secondary"
      size={isMd ? 'large' : 'small'}
      onChange={(_: React.ChangeEvent<unknown>, value: number) =>
        updateSearchParams('page', String(value))
      }
      sx={{ paddingBottom: 1 }}
    />
  );

  return (
    <Paper
      id="Gallery"
      sx={{
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh',
        borderRadius: 5,
        outline: '10px solid black',
      }}
    >
      <FadeIn>
        <Stack spacing={1} alignItems="center" minHeight="100vh">
          <Modal
            open={open}
            sx={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                flexDirection: 'column',
              }}
              onClick={() => setOpen(false)}
            >
              <Box
                sx={{ position: 'relative', display: 'inline-block' }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Grow in={true}>
                  <Box
                    component="img"
                    src={modalImage?.source}
                    alt="modal image"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '90vh',
                      objectFit: 'contain',
                      zIndex: 10,
                    }}
                  />
                </Grow>
                <IconButton
                  onClick={() => setOpen(false)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 11,
                    mixBlendMode: 'difference',
                  }}
                >
                  <FontAwesomeIcon icon={faClose} />
                </IconButton>
              </Box>
              <Slide in={true} direction="right">
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-around"
                  textAlign="center"
                  spacing={isMd ? 5 : 2}
                  p={1}
                  sx={{
                    width: '100%',
                    maxHeight: isMd ? '10vh' : '18vh',
                    height: isMd ? '100%' : 'auto',
                    backgroundColor: 'secondary.main',
                    borderTopLeftRadius: isMd ? 20 : 0,
                    borderTopRightRadius: isMd ? 20 : 0,
                    borderBottomLeftRadius: isMd ? 0 : 20,
                    borderBottomRightRadius: isMd ? 0 : 20,
                    outline: '2px solid black',
                  }}
                >
                  <Box sx={{ width: '33%' }} />
                  <Typography variant={isMd ? 'h6' : 'body1'} sx={{ color: 'white', width: '33%' }}>
                    {modalImage?.description === '' ? modalImage.title : modalImage?.description}
                  </Typography>
                  <Grid
                    container
                    spacing={0.2}
                    sx={{
                      width: '33%',
                      height: '100%',
                      overflow: 'scroll',
                      alignContent: 'baseline',
                      justifyContent: 'center',
                    }}
                  >
                    {modalImage?.tags.map((tag) => (
                      <Grid size={{ xs: 10, md: 2 }}>
                        <Chip label={tag.name} />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Slide>
            </Box>
          </Modal>
          <TagFilter />
          {pagination}
          <Box p={1} width="100%">
            {loading ? (
              <Loading />
            ) : filteredPosts.length !== 0 ? (
              <ImageList variant="masonry" cols={isMd ? 3 : 2} gap={6} sx={{ overflow: 'hidden' }}>
                {filteredPosts
                  .slice(
                    searchParams.get('page')
                      ? (Number(searchParams.get('page')) - 1) * POSTS_PER_PAGE
                      : 0,
                    POSTS_PER_PAGE *
                      (searchParams.get('page') ? Number(searchParams.get('page')) : 1)
                  )
                  .map((item) => (
                    <GalleryImage
                      post={item}
                      onOpen={() => {
                        setOpen(true);
                        setModalImage(item);
                      }}
                    />
                  ))}
              </ImageList>
            ) : (
              <Box width="100%" height="100vh">
                0 Results
              </Box>
            )}
          </Box>
          {pagination}
        </Stack>
      </FadeIn>
    </Paper>
  );
};
