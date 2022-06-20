import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import auth from './../auth/auth-helper';
import { listByOwner } from './api-shop.js';
import { Navigate, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
}));

export default function MyShops() {
  const classes = useStyles();
  const [shops, setShops] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByOwner(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setShops(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  if (redirectToSignin) {
    return <Navigate to='/signin' />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type='title' className={classes.title}>
          Your Shops
          <span className={classes.addButton}>
            <Link to='/seller/shop/new'>
              <Button color='primary' variant='contained'>
                <Icon className={classes.leftIcon}>add_box</Icon> New Shop
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {shops.map((shop, i) => {
            return (
              <span key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={shop.name}
                    secondary={shop.description}
                  />
                </ListItem>
                <Divider />
              </span>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}