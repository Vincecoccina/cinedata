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
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenresOrCategory";
import Logo from "../../assets/logo.png";
import { useGetGenresQuery } from "../../services/TMDB";
import genresIcons from "../../assets/genres";
import "./style.css";

const Sidebar = ({ setMobileOpen }) => {
  const { data, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  const categories = [
    { label: "Films du moment", value: "popular" },
    { label: "Les mieux notés", value: "top_rated" },
    { label: "A venir", value: "upcoming" },
  ];

  return (
    <>
      <Link to="/" className="imageLink">
        <img src={Logo} alt="logo" className="image" />
      </Link>
      <Divider />
      <List>
        <ListSubheader sx={{ backgroundColor: "#222", color: "grey" }}>
          Catégories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className="links" to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img
                  src={genresIcons[label.toLowerCase()]}
                  alt="Icone catégories"
                  height={30}
                  className="genreImg"
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader sx={{ backgroundColor: "#222", color: "grey" }}>
          Genres
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className="links" to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genresIcons[name.toLowerCase()]}
                    alt="Icone catégories"
                    height={30}
                    className="genreImg"
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
