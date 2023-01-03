import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { SnackbarProvider } from 'notistack';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { saveUser } from './redux/user';
import Auth from './auth/index';
import Dashboard from './components/dashboard';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
        navigate('/');
      } else {
        navigate('/auth');
      }
    })
  }, [dispatch, navigate]);
  return (
    <SnackbarProvider
      maxSnack={5}
      iconVariant={{
        success: '✅🦄🐬❤️️',
        error: '✖️🚩😱💔',
        warning: '⚠️😒',
        info: 'ℹ️🙈🙉🙊',
      }}
    >
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
