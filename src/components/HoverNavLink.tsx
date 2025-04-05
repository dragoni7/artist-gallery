import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface HoverNavLinkProps {
  label: string;
  href: string;
}

export default function HoverNavLink(props: HoverNavLinkProps) {
  return (
    <NavLink to={`/${props.href}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Typography sx={{ '&:hover': { scale: 1.1 }, fontWeight: 500 }}>{props.label}</Typography>
    </NavLink>
  );
}
