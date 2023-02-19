import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import useStyles from "./styles";

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  
  const categories = [
    { label: "Films du moment", value: "popular" },
    { label: "Les mieux notés", value: "top_rated" },
    { label: "A venir", value: "upcoming" },
  ];

  const demoCategories = [
    { label: "Action", value: "action" },
    { label: "Horreur", value: "horror" },
    { label: "Humour", value: "comedy" },
    { label: "Animation", value: "animation" },
  ];

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={Logo}
          alt="logo"
          className={classes.image}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader style={{ backgroundColor: '#222', color: "grey" }} >Catégories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}}>
              {/* <ListItemIcon>
                <img src="" alt="" />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader style={{ backgroundColor: '#222', color: "grey" }} >Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}}>
              {/* <ListItemIcon>
                <img src="" alt="" />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
