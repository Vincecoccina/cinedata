import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetActorsDetailsQuery,
  useGetActorsIdMoviesQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

const Actors = () => {
  const { id } = useParams();
  const page = 1;
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetActorsIdMoviesQuery({ id, page });
  const isNonDestop = useMediaQuery("(max-width:800px)");
  console.log(movies);

  //DATE
  const date = new Date(data?.birthday);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("fr-FR", options);

  //AGE
  let year = new Date();
  let justYear = year.getFullYear();
  let yearBirthday = parseInt(data?.birthday.split("-").slice(0, 1));
  let age = justYear - yearBirthday;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5" color="white">
          Nous n'avons pas de fiche acteur
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {isNonDestop ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="30px"
          >
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box>
                <Typography
                  variant="h3"
                  sx={{ color: "white", fontSize: "30px" }}
                  gutterBottom
                >
                  {data?.name}
                </Typography>
              </Box>
              <img
                src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
                alt={data?.name}
                style={{
                  width: "270px",
                  height: "400px",
                  borderRadius: "10px",
                }}
              />
              <Box marginTop="10px">
                <Typography variant="h6" sx={{ color: "#f1f1f1", fontSize: "15px" }}>
                  <span style={{ color: "lightGrey" }}>
                    Lieu de naissance :
                  </span>{" "}
                  {data.place_of_birth}
                </Typography>
                <Typography variant="h6" sx={{ color: "#f1f1f1", fontSize: "15px" }}>
                  <span style={{ color: "lightGrey" }}>
                    Date de Naissance :
                  </span>{" "}
                  {formattedDate}
                </Typography>
                <Typography variant="h6" sx={{ color: "#f1f1f1", fontSize: "15px" }}>
                  <span style={{ color: "lightGrey" }}>Age :</span> {age} ans
                </Typography>
              </Box>
            </Box>
          </Box>
          {data?.biography && (
            <Box marginTop="50px" width="90%">
              <Typography
                variant="h5"
                sx={{ color: "white", fontWeight: "bold" }}
                gutterBottom
              >
                BIOGRAPHIE
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "lightGrey", lineHeight: "27px" }}
              >
                {data?.biography}
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          <Box display="flex" gap="30px">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
              alt={data?.name}
              style={{ width: "270px", height: "400px", borderRadius: "10px" }}
            />
            <Box>
              <Box>
                <Typography variant="h3" sx={{ color: "white" }} gutterBottom>
                  {data?.name}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#f1f1f1" }}>
                  <span style={{ color: "lightGrey" }}>
                    Lieu de naissance :
                  </span>{" "}
                  {data.place_of_birth}
                </Typography>
                <Typography sx={{ color: "#f1f1f1" }}>
                  <span style={{ color: "lightGrey" }}>
                    Date de Naissance :
                  </span>{" "}
                  {formattedDate}
                </Typography>
                <Typography sx={{ color: "#f1f1f1" }}>
                  <span style={{ color: "lightGrey" }}>Age :</span> {age} ans
                </Typography>
              </Box>
            </Box>
          </Box>
          {data?.biography && (
            <Box marginTop="50px" width="90%">
              <Typography
                variant="h5"
                sx={{ color: "white", fontWeight: "bold" }}
                gutterBottom
              >
                BIOGRAPHIE
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "lightGrey", lineHeight: "27px" }}
              >
                {data?.biography}
              </Typography>
            </Box>
          )}
        </Box>
      )}
      <Box margin="3rem 0">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ color: "white", fontSize: "25px" }}
        >
          Les films avec {data?.name}
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={10} />}
      </Box>
    </>
  );
};

export default Actors;
