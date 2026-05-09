import { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent, Select, MenuItem,
  FormControl, InputLabel, Box, Chip, Pagination, CircularProgress, Alert
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const PAGE_SIZE = 6;

const TYPE_COLORS = {
  event: 'primary',
  result: 'success',
  placement: 'warning',
};

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/notifications')
      .then(r => r.json())
      .then(data => setNotifications(Array.isArray(data) ? data : data.notifications ?? []))
      .catch(() => setError('Failed to fetch notifications.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type?.toLowerCase() === filter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (e) => { setFilter(e.target.value); setPage(1); };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <NotificationsIcon color="primary" fontSize="large" />
        <Typography variant="h5" fontWeight={700}>Notifications</Typography>
      </Box>

      <FormControl size="small" sx={{ mb: 3, minWidth: 160 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filter} label="Filter by Type" onChange={handleFilter}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="event">Event</MenuItem>
          <MenuItem value="result">Result</MenuItem>
          <MenuItem value="placement">Placement</MenuItem>
        </Select>
      </FormControl>

      {loading && <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && paginated.length === 0 && (
        <Typography color="text.secondary">No notifications found.</Typography>
      )}

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
        {paginated.map((n, i) => (
          <Card key={n.id ?? i} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip
                  label={n.type ?? 'unknown'}
                  color={TYPE_COLORS[n.type?.toLowerCase()] ?? 'default'}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {n.timestamp ? new Date(n.timestamp).toLocaleString() : '—'}
                </Typography>
              </Box>
              <Typography variant="body2">{n.message ?? n.Message ?? '—'}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
