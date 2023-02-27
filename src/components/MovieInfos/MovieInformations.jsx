import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  ButtonGroup,
  useMediaQuery,
  Rating,
  Tooltip,
} from "@mui/material";
import {
  Movie,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../MovieList/MovieList";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommandationQuery,
} from "../../services/TMDB";
import { userSelector } from "../../features/auth";

const MovieInformations = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isNonDestop = useMediaQuery("(max-width:800px)");
  const { user } = useSelector(userSelector);
  const { id } = useParams();

  const { data: recommandations, isFetching: isRecommandationFetching } =
    useGetRecommandationQuery({ list: "/recommendations", movie_id: id });
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlist } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data, isFetching, error } = useGetMovieQuery(id);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchlist?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlist, data]);

  const addToFavourite = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchListed,
      }
    );
    setIsMovieWatchListed((prev) => !prev);
  };

  const date = new Date(data?.release_date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("fr-FR", options);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Une erreur s'est produite</Link>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
    >
      <Typography
        variant="h3"
        sx={{ color: "#f1f1f1", fontSize: "30px" }}
      >
        {data?.title}
      </Typography>

      <Box
        display="flex"
        flexDirection={isNonDestop ? "column" : "row"}
        alignItems={isNonDestop ? "center" : "flex-start"}
        justifyContent={isNonDestop ? "center" : "flex-start"}
        width="100%"
        marginTop="50px"
      >
        <Box>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
            style={{
              borderRadius: "10px",
              width: "155px",
              height: "230px",
            }}
          />
        </Box>
        <Box marginLeft="20px">
          <Box
            display="flex"
            flexDirection={isNonDestop ? "column" : "row"}
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={{
                color: "#f1f1f1",
                fontWeight: "bold",
                fontSize: "13px",
                textAlign: isNonDestop && "center",
              }}
            >
              <span style={{ color: "orange" }}>{formattedDate}</span> /{" "}
              {data?.runtime}min / {data?.genres[0].name}
            </Typography>
            <ButtonGroup style={{ marginLeft: "15px", gap: "10px" }}>
              <Tooltip
                title={
                  isMovieFavorited
                    ? "Retirer de ma liste"
                    : "Ajouter ce film à ma liste"
                }
              >
                <Button
                  onClick={addToFavourite}
                  size="small"
                  sx={{
                    backgroundColor: "orange",
                    color: "white",
                    outline: "none",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "orange",
                      filter: "brightness(1.2)",
                      border: "none",
                    },
                  }}
                >
                  {isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  isMovieWatchListed
                    ? "Retirer de ma watchlist"
                    : "Ajouter ce film à ma watchlist"
                }
              >
                <Button
                  onClick={addToWatchList}
                  size="small"
                  sx={{
                    backgroundColor: "orange",
                    color: "white",
                    outline: "none",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "orange",
                      filter: "brightness(1.2)",
                      border: "none",
                    },
                  }}
                >
                  {isMovieWatchListed ? <Remove /> : <PlusOne />}
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>
          <Box style={{ marginTop: "20px" }}>
            <Typography variant="h5" style={{ color: "#f1f1f1" }}>
              CASTING
            </Typography>
            <Box
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {data &&
                data.credits?.cast
                  ?.map(
                    (character, i) =>
                      character.profile_path && (
                        <Box
                          key={i}
                          component={Link}
                          direction={isNonDestop ? "column" : "row"}
                          to={`/actors/${character.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                            alt={character.name}
                            style={{
                              maxWidth: "7em",
                              height: "8em",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                          <Typography color="white" sx={{ fontSize: "13px" }}>
                            {character.name}
                          </Typography>
                          <Typography color="grey" sx={{ fontSize: "10px" }}>
                            {character.character}
                          </Typography>
                        </Box>
                      )
                  )
                  .slice(0, 6)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isMobile ? "center" : "flex-start"}
        width="100%"
        padding="15px 0"
        borderBottom="1px solid grey"
      >
        <Rating readOnly value={data.vote_average / 2} />
        <Typography variant="h6" sx={{ color: "grey", fontSize: "13px" }}>
          {data.vote_average.toFixed(1)}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isMobile && "center"}
        marginTop="30px"
        width="100%"
        padding="0 0 30px 0"
        borderBottom="1px solid grey"
      >
        <Typography variant="h5" sx={{ color: "#f1f1f1", fontWeight: "bold" }}>
          SYNOPSIS
        </Typography>
        <Box width="70%" textAlign={isMobile && "center"}>
          <Typography
            variant="p"
            sx={{ color: "#f1f1f1", fontSize: "14px" }}
            marginTop="10px"
          >
            {data?.overview}
          </Typography>
        </Box>
      </Box>

      {data.videos.results.length > 0 && (
        <Box
          marginTop="5rem"
          width="100%"
          height="400px"
          display="flex"
          justifyContent="center"
        >
          <iframe
            style={{ width: isNonDestop ? "100%" : "50%", height: "100%" }}
            title="trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          />
        </Box>
      )}

      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h3"

          align="center"
          sx={{ color: "#f1f1f1", fontSize: "30px" }}
        >
          Vous pourriez aussi aimez ces films
        </Typography>
        {recommandations ? (
          <MovieList movies={recommandations} numberOfMovies={10} />
        ) : (
          <Box>Désolé, nous n'avons rien à vous recommander</Box>
        )}
      </Box>
    </Box>
  );
};

export default MovieInformations;
