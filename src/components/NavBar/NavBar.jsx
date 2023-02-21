import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Menu, AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { fetchToken, createSessionId, movieApi } from "../../utils/index";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../Search/SearchBar";
import useStyles from "./styles";

const NavBar = () => {
  const { isAuth, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const session = localStorage.getItem("session_id");

  

  useEffect(() => {
    const loggIn = async () => {
      if (token) {
        if (session) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${session}`
          );
          dispatch(setUser(userData));
          navigate("/");
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
          navigate("/");
        }
      }
    };

    loggIn();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          {!isMobile && <SearchBar />}
          <div>
            {!isAuth ? (
              <Button color="inherit" onClick={fetchToken}>
                LOGIN &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
                sx={{
                  fontSize: "10px",
                }}
              >
                {!isMobile && (
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "12px", fontWeight: "bold" }}
                  >
                    {user.username} &nbsp;
                  </Typography>
                )}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="profile"
                  src={user.avatar}
                />
              </Button>
            )}
          </div>
          {isMobile && <SearchBar />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              PaperProps={{
                sx: {
                  backgroundColor: "#1b1b1b",
                },
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              PaperProps={{ style: { backgroundColor: "#1b1b1b" } }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
