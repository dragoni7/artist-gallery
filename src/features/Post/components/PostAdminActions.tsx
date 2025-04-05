import usePosts from '@/features/Post/hooks/usePosts';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import EditPost from './EditPost';
import AddPost from './AddPost';
import Loading from '@/components/Loading';

export default function PostAdminActions() {
  const { posts, fetchPosts, loading } = usePosts();

  return (
    <Stack spacing={2}>
      <Accordion sx={{ backgroundColor: 'primary.highlight' }} defaultExpanded>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
          <Typography>Edit Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? <Loading /> : <EditPost posts={posts} fetchPosts={fetchPosts} />}
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'primary.highlight' }} defaultExpanded>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} size="lg" />}>
          <Typography>Create Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddPost fetchPosts={fetchPosts} />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
