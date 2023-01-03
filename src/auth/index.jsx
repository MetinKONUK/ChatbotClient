import { useState } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from '@mui/material';
import Login from  './login';
import Register from './register';
import loginBg from './background/login.jpg';
import registerBg from './background/register.jpg';
function Auth() {
  const [action, setAction] = useState(0);
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };
  return(
<Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: action === 0 ? `url(${loginBg})` : `url(${registerBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {
            action === 0 ? <Login /> : null
          }
          {
            action === 1 ? <Register /> : null
          }
          <Grid container>
            <InputLabel sx={{ mx: 4 }} id="demo-simple-select-label">Select Action</InputLabel>
            <Select
              sx={{ m: 4, mt: 0 }}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={action}
              label="action"
              onChange={handleActionChange}
            >
              <MenuItem value={0}>Login</MenuItem>
              <MenuItem value={1}>Register</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Auth;
