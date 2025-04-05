import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface GalleryLinkProps {
  tag: string;
  img: string;
}

export default function GalleryLink(props: GalleryLinkProps) {
  const navigate = useNavigate();

  return (
    <Box
      component="img"
      src={props.img}
      width="25%"
      onClick={() => navigate(`/gallery?page=1&tags=${props.tag}`)}
      sx={{ '&:hover': { scale: 1.05, cursor: 'pointer' } }}
    />
  );
}
