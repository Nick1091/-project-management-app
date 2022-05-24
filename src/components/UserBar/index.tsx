import { useTranslation } from 'react-i18next';
import { Button, IconButton, Link } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { removeUser } from '../../store/authSlice';

export const UserBar = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    dispatch(removeUser());
  };

  return (
    <>
      <IconButton color="inherit">
        <AddToQueueIcon sx={{ fontSize: 30, mr: '15px' }}></AddToQueueIcon>
      </IconButton>
      <IconButton color="inherit">
        <Link color="inherit" component={RouterLink} to="/edit-profile">
          <ManageAccountsIcon sx={{ fontSize: 30, mr: '15px' }}></ManageAccountsIcon>
        </Link>
      </IconButton>
      <Link color="inherit" style={{ textDecoration: 'none' }} component={RouterLink} to="/main">
        <Button color="inherit" variant="outlined" sx={{ mr: '15px' }}>
          {t('GoToMainPage')}
        </Button>
      </Link>
      <Button onClick={logout} color="secondary" variant="contained">
        {t('SignOut')}
      </Button>
    </>
  );
};
