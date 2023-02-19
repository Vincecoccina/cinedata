import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
  const isMobile = useMediaQuery("(min-width:600px)");
  return (
    <Grid
      container
      display="flex"
      flexWrap="wrap"
      gap="20px"
      justifyContent={isMobile ? "center" : "space-between"}
      overflow="hidden"
    >
      {movies.results.map((movie, i) => (
        <Movie key={i} id={i} movie={movie} />
      ))}
    </Grid>
  );
};

export default MovieList;
