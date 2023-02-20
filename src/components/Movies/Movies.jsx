import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import MovieList from "../MovieList/MovieList";
import { selectGenreOrCategory } from "../../features/currentGenresOrCategory";
import { useGetMoviesQuery } from "../../services/TMDB";

const Movies = () => {
  const [page, setPage] = useState(1);
  const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page});

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    <Box display="flex" alignItems="center" mt="20px">
      <Typography variant="h4">Aucun films ne correspond à votre recherche.</Typography>
    </Box>
  }

  if(error) return 'Une erreur s\'est produite'; 

  return (
    <Box>
      <MovieList movies={data} />
    </Box>
  );
};

export default Movies;
