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
import Loading from '@/components/Loading';

interface CommissionQueueProps {
  supplied?: { queue: Commission[]; loading: boolean };
}

export default function CommissionQueue(props: CommissionQueueProps) {
  const supplied = props.supplied?.queue ? null : useCommissions();

  const commissions = supplied === null ? props.supplied?.queue : supplied.commissions;
  const loading = supplied === null ? props.supplied?.loading : supplied.loading;

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
        {loading ? (
          <Loading />
        ) : (
          <Table size="small" aria-label="queue">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant={isMd ? 'h6' : 'body2'}>Commission</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={isMd ? 'h6' : 'body2'}>Tier</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant={isMd ? 'h6' : 'body2'}>Completed?</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissions!.map((entry: Commission) => (
                <TableRow key={entry.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant={isMd ? 'h6' : 'body2'}>
                      <FontAwesomeIcon
                        icon={faPalette}
                        color={entry.completed ? 'green' : 'red'}
                        size="xs"
                      />{' '}
                      {entry.description}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Typography variant={isMd ? 'h6' : 'body2'}>{entry.tier}</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Typography
                      color={entry.completed ? 'success' : 'error'}
                      variant={isMd ? 'h6' : 'body2'}
                    >
                      {entry.completed ? 'Yes' : 'No'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Grow>
  );
}
