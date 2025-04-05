import useCommissions from '@/features/Commission/hooks/useCommissions';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grow,
} from '@mui/material';

import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mdContext } from '@/app/App';
import { useContext } from 'react';
import { Commission } from '@/types';

interface CommissionQueueProps {
  queue?: Commission[];
}

export default function CommissionQueue(props: CommissionQueueProps) {
  const commissions = props.queue ? props.queue : useCommissions().commissions;
  const isMd = useContext(mdContext);

  return (
    <Grow in={true}>
      <TableContainer
        component={Paper}
        sx={{
          border: '2px solid pink',
          borderRadius: 4,
          width: '100%',
          alignSelf: 'center',
          justifySelf: 'center',
        }}
      >
        <Table size="small" aria-label="queue">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant={isMd ? 'h6' : 'body1'}>Commission</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant={isMd ? 'h6' : 'body1'}>Tier</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant={isMd ? 'h6' : 'body1'}>Completed?</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commissions.map((entry: Commission) => (
              <TableRow key={entry.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography>
                    <FontAwesomeIcon icon={faPalette} color={entry.completed ? 'green' : 'red'} />{' '}
                    {entry.description}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Typography>{entry.tier}</Typography>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Typography color={entry.completed ? 'success' : 'error'}>
                    {entry.completed ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grow>
  );
}
