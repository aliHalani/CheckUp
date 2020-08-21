import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import AppRoutes from "./AppRoutes";
import { UserContext } from './context/UserContext';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const useStyles = makeStyles(theme => ({
  palette: {
    primary: blue,
  },
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logoWrapper: {
    display: 'flex',
    flexGrow: 1
  },
  logo: {
    width: "200px"
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
    // marginTop: "36px"
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  name: {
    display: "block",
    textAlign: "end"
  }
}));

export default function MainApp(props) {
  const classes = useStyles();
  const [user, setUser, clearUser] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (user.id === 0) {
      history.push("/");
    }
  }, [user, history])

  useEffect(() => {
    let userCookie = JSON.parse(localStorage.getItem("user"));
    if (userCookie && (user.id !== userCookie.id)) {
      console.log(user.id)
      console.log(userCookie.ID)
      setUser(userCookie);
    }
  })

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={clearUser}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.logoWrapper}>
              <img src="/images/checkup.svg" className={classes.logo}/>
            </div>
     
            <div>
            <Typography variant="subtitle2" color="inherit" className={classes.name} noWrap>
              {user.type === "doctor" ? "Dr. " : ""}{user.first_name + " " + user.last_name}
            </Typography>
            <span>
            Logged in {user.loginTime}
            </span>
            </div>
            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
            <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleProfileMenuOpen}>
              <MoreIcon />
            </IconButton>
            {/* <Button color="inherit" onClick={clearUser}>Log Out</Button> */}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <AppRoutes />
        </main>
      </div>
      {renderMenu}
    </React.Fragment>
  );
}