import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderImage from '../images/header.jpg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({open_drawer: false});

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open_drawer: open});
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <img
          src={HeaderImage}
          style={{objectFit: 'cover', maxHeight: '40px'}}
        />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bullet Time
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        toggleDrawer={() => toggleDrawer()}
        open={state["open_drawer"]}/>
    </div>
  );
}