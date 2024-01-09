// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';
import ProfilePic from 'assets/Images/profile.svg';

// ----------------------------------------------------------------------

export default function MyAvatar({ sx, ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      sx={{ ...sx, border: '1px solid', borderColor: 'secondary.light' }}
      src={user?.photoURL || ProfilePic}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.username).color}
      {...other}
    >
      {createAvatar(user?.username).name}
    </Avatar>
  );
}
