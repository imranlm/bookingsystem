import { Grid } from '@mui/material';
import ReminderTable from 'components/sections/dashboard/ReminderTable';

const Dashboard = () => {
  return (
    <Grid container rowGap={3.75}>
      <Grid item xs={12}>
        <ReminderTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
