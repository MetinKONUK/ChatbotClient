import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { blue } from '@mui/material/colors';
import Axios from 'axios';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import headerIcon from './icons/registerHeader.png';

function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [moventData, setMoventData] = useState({});
  const handleChange = (event) => {
    setMoventData({ ...moventData, [event.target.name]: event.target.value });
  };
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
      email: moventData.email,
      password: moventData.password,
    };
    if (await checkDataValidity(data)) {
      const { email, password } = data;
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({user}) => {
          await Axios.post('http://localhost:5000/insert-user', data)
            .then((response) => {
              const { status } = response.data;
              if (status) {
                enqueueSnackbar('Register succeed!', { variant: 'success' });
              }
            })
        })
        .catch(({code}) => {
          enqueueSnackbar(code, { variant: 'warning' });
        });
    }
  }
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
      <Avatar
        sx={{
          mb: 0.5, bgcolor: 'white', width: 200, height: 200,
        }}
        src={headerIcon}
      />
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          name="email"
          id="email"
          label="Email"
          type="email"
          required
          fullWidth
          size="large"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="password"
          id="password"
          label="Password"
          type="password"
          required
          fullWidth
          size="large"
          margin="normal"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3.5, mb: 0.5, bgcolor: blue[700], borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: blue[500] },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;