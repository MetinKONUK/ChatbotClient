import { useDispatch } from 'react-redux';
import {
  Box, IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { indigo } from '@mui/material/colors';
import { auth } from '../firebase';
import { unsaveUser } from '../redux/user';

function Navbar(){
  const dispatch = useDispatch();
  return(
    <Box display="flex" justifyContent="space-between" p={2} sx={{ backgroundColor: indigo[400] }}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      >
        { null }
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton 
        onClick={() => {
          signOut(auth).then(() => {
            dispatch(unsaveUser());
          });
        }}
        >
          <LogoutIcon
            fontSize='medium'
            sx={{ color: 'white' }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Navbar;