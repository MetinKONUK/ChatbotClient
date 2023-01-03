import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { indigo } from "@mui/material/colors";
import Axios from 'axios';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import headerIcon from './icons/loginHeader.png';

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [credentials, setCredentials] = useState({});
  const checkDataValidity = async (data) => {
    const { email, password } = data;
    const emailAddressValidator = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const passwordValidator = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
    if (!emailAddressValidator.test(email)) {
      enqueueSnackbar('Email address format is not valid!', { variant: 'warning' });
      return false;
    }
    if (!passwordValidator.test(password)) {
      enqueueSnackbar('Password must be at least 8 characters, contain at least one number, one uppercase and one lowercase letter!', { variant: 'warning' });
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: credentials.email,
      password: credentials.password,
    };
    if ( await checkDataValidity(data)) {
      const { email, password } = data;
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        enqueueSnackbar('Login succeed!', { variant: 'success' });
      })
      .catch(({code}) => {
        enqueueSnackbar(code, { variant: 'error' });
      });
    }
  };
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 200, height: 200 }} src={headerIcon} />
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          name="email"
          id="email"
          label="Email"
          type="email"
          required
          fullWidth
          size="medium"
          margin="normal"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          name="password"
          id="password"
          label="Password"
          type="password"
          required
          fullWidth
          size="medium"
          margin="normal"
          onChange={handleChange}
        />
        <Grid
          sx={{ mt: 1 }}
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3.5, mb: 0.5, bgcolor: indigo[700], borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: indigo[500] },
            }}
          >
            Sign In
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
