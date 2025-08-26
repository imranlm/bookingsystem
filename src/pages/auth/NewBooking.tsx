import { useState, ReactNode } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';

import IconifyIcon from 'components/base/IconifyIcon';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface BookingFormValues {
  car: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  phoneNumber: string;
  email: string;
  date: Date | null;
  timeslot: string;
  description: string;
}

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

// Helper to generate 30-min slots between start and end (inclusive)
const generateTimeSlots = (start: string, end: string, exclude: string[] = []) => {
  const slots: string[] = [];
  let [h, m] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  while (h < endH || (h === endH && m <= endM)) {
    const slot = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    if (!exclude.includes(slot)) slots.push(slot);
    m += 30;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }
  console.log('Generated slots:', slots);
  return slots;
};

const getAvailableTimes = (date: Date | null) => {
  if (!date) return [];
  const day = date.getDay();
  // 0: Sunday, 1: Monday, ..., 5: Friday, 6: Saturday
  if (day >= 1 && day <= 4) {
    // Mon-Thu: 10:00–17:00
    return generateTimeSlots('10:00', '17:00');
  } else if (day === 5) {
    // Friday: 10:00–17:00, exclude 12:00–12:30
    return generateTimeSlots('10:00', '17:00', ['12:00', '12:30']);
  } else if (day === 6) {
    // Saturday: 10:00–16:00
    return generateTimeSlots('10:00', '16:00');
  } else if (day === 0) {
    // Sunday: 10:00–14:30
    return generateTimeSlots('10:00', '14:30');
  }
  return [];
};

const NewBooking = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<ReactNode>('');
  const { register, handleSubmit, control, watch } = useForm<BookingFormValues>();
  const selectedDate = watch('date');
  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    console.log(data);
    saveBooking(data);
  };

  type ValidationErrors = Record<string, string[]>;

  // Save booking to backend
  const saveBooking = async (data: BookingFormValues) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          car: data.car,
          date: data.date ? data.date.toISOString().split('T')[0] : null,
          timeslot: data.timeslot, // e.g. "7pm to 8pm"
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          customer_email: data.customer_email,
          description: data.description || null,
        }),
      });

      const responseData = (await response.json()) as {
        message?: string;
        errors?: ValidationErrors;
      };

      if (!response.ok) {
        console.error('Validation errors:', responseData.errors);
        setSnackbarMessage(
          <span>
            Unable to save booking.
            <br />
            {Object.entries(responseData.errors ?? {}).map(([field, messages]) => (
              <span key={field}>
                {field}: {messages.join(', ')}
                <br />
              </span>
            ))}
          </span>,
        );

        setOpenSnackbar(true);
      } else {
        console.log('Booking created:', responseData);
        setSnackbarMessage('Booking created successfully!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      alert('Error saving booking');
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: { xs: 1, sm: 506 }, px: { xs: 2, sm: 0 }, py: 7 }}>
      <Typography variant="h1">Car Inspection Booking </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          color: 'neutral.main',
          mt: 2,
          mb: 6.75,
        }}
      ></Typography>

      <Divider> </Divider>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={(theme) => ({ padding: theme.spacing(2.5), my: 3, boxShadow: 1 })}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <InputLabel htmlFor="car">Car</InputLabel>
              <TextField
                fullWidth
                id="car"
                type="text"
                placeholder="Enter car details"
                autoComplete="given-name"
                {...register('car')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="date">Inspection Date</InputLabel>
              <Controller
                name="date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      disablePast
                      shouldDisableDate={() => false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          id: 'date',
                          placeholder: 'Select date',
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="time">Inspection Time</InputLabel>
              <Controller
                name="timeslot"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    id="time"
                    placeholder="Select time"
                    {...field}
                    disabled={!selectedDate}
                  >
                    {getAvailableTimes(selectedDate).map((time) => {
                      const [h, m] = time.split(':');
                      const hour = parseInt(h);
                      const min = parseInt(m);
                      // Format to 12-hour with AM/PM
                      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                      const ampm = hour < 12 || (hour === 12 && min === 0) ? 'AM' : 'PM';
                      const display = `${displayHour}:${m.padStart(2, '0')} ${ampm}`;
                      return (
                        <MenuItem key={time} value={time}>
                          {display}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="fullName">Full Name</InputLabel>
              <TextField
                fullWidth
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="given-name"
                {...register('customer_name')}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
              <TextField
                fullWidth
                id="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                autoComplete="family-name"
                {...register('customer_phone')}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                fullWidth
                id="email"
                type="text"
                placeholder="Enter your email"
                autoComplete="email"
                {...register('customer_email')}
              />
            </Grid>
          </Grid>
        </Paper>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.75}>
          <FormControlLabel
            control={
              <Checkbox
                {...checkBoxLabel}
                sx={{
                  color: 'neutral.light',
                }}
                icon={<IconifyIcon icon="fluent:checkbox-unchecked-24-regular" />}
                checkedIcon={<IconifyIcon icon="fluent:checkbox-checked-24-regular" />}
              />
            }
            label={
              <Typography variant="h6" component="p" sx={{ color: 'neutral.light' }}>
                Remember me
              </Typography>
            }
          />

          <Typography variant="h6" component={Link} href="#!" color="secondary">
            Forgot your password?
          </Typography>
        </Stack>

        <Button variant="contained" type="submit" fullWidth color="secondary" sx={{ py: 2.25 }}>
          <Typography variant="h4" component="span">
            Book Inspection
          </Typography>
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={
              typeof snackbarMessage === 'string' && snackbarMessage.includes('Error')
                ? 'error'
                : 'success'
            }
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default NewBooking;
