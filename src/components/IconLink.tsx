import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Stack } from '@mui/material';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconLinkProps {
  link: string;
  title: string;
  icon: IconDefinition;
}

export default function IconLink(props: IconLinkProps) {
  return (
    <Stack>
      <IconButton
        href={props.link}
        sx={{ backgroundColor: 'primary.highlight', width: 50, height: 50 }}
        size="large"
      >
        <FontAwesomeIcon icon={props.icon} />
      </IconButton>
      {props.title}
    </Stack>
  );
}
