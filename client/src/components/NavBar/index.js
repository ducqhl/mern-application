import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LOGOUT } from "../../constants/actionTypes";
import { PAGES } from "../../constants/routes";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate(PAGES.AUTH);
    setUser(null);
  }, [dispatch, navigate, setUser]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      // console.log(JSON.stringify(decodedToken));

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)));
  }, [location, logout, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to={PAGES.HOME} className={classes.brandContainer}>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories logo"
          height="60"
        />
        <img
          className={classes.memoryText}
          src={memoriesText}
          alt="memories text"
          height="45"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user && (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
        {!user && (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
