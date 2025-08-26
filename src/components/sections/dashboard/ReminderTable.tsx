import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchFilter from 'components/common/SearchFilter';
import CustomPagination from 'components/common/CustomPagination';
//import { columns, rows } from 'data/dashboard/reminderTableData';
import { columns } from 'data/dashboard/reminderTableData';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  car: string;
  date: string;
  timeslot: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  // Add other fields if your API returns more
}

const ReminderTable = () => {
  const apiRef = useGridApiRef();
  const [rows2, setRows2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/bookings/')
      .then((response) => {
        const bookings = response.data;

        // Make sure each row has an `id` field for DataGrid
        const formattedRows = bookings.map((item: Booking, index: number) => ({
          ...item,
          id: item.id ?? index,
        }));

        setRows2(formattedRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Paper
      sx={(theme) => ({
        p: theme.spacing(2, 2.5),
        width: 1,
      })}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="h5" color="common.black">
          Inspections / Bookings
        </Typography>

        <SearchFilter apiRef={apiRef} />

        <Button
          variant="contained"
          color="secondary"
          sx={(theme) => ({
            p: theme.spacing(0.625, 1.5),
            borderRadius: 1.5,
          })}
          startIcon={<IconifyIcon icon="heroicons-solid:plus" />}
        >
          <Typography variant="body2">Add New</Typography>
        </Button>
      </Stack>

      <Box
        sx={{
          height: 330,
          width: 1,
          mt: 1.75,
        }}
      >
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={rows2}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </Box>
      <CustomPagination apiRef={apiRef} />
    </Paper>
  );
};

export default ReminderTable;
