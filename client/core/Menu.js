import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const isActive = (location, path) => {
  if (location === path) return { color: '#ffffff' };
};

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          MERN Skeleton
        </Typography>
        <Link to='/'>
          <IconButton
            aria-label='Home'
            style={isActive(location.pathname, '/')}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to='/users'>
          <Button style={isActive(location.pathname, '/users')}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to='/signup'>
              <Button style={isActive(location.pathname, '/signup')}>
                Sign up
              </Button>
            </Link>
            <Link to='/signin'>
              <Button style={isActive(location.pathname, '/signin')}>
                Sign In
              </Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={'/user/' + auth.isAuthenticated().user._id}>
              <Button
                style={isActive(
                  location.pathname,
                  '/user/' + auth.isAuthenticated().user._id
                )}
              >
                My Profile
              </Button>
            </Link>
            <Button
              onClick={() => {
                auth.clearJWT(() => navigate('/'));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
