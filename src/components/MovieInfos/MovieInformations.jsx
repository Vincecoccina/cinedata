import React from "react";
import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  Button,
  ButtonGroup,
  Grid,
  useMediaQuery,
  Rating,
  Divider,
} from "@mui/material";
import {
  Movie,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useGetMovieQuery } from "../../services/TMDB";
import { fontSize } from "@mui/system";

const MovieInformations = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const isMobile = useMediaQuery("(max-width:600px)");

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

  console.log(data);

  return (
    <Box
      container
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "#f1f1f1", fontSize: "30px" }}
      >
        {data?.title}
      </Typography>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems={isMobile ? "center" : "flex-start"} width="100%" marginTop="50px">
        <Box >
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
            style={{
              borderRadius: "10px",
              width: "155px",
              height: "230px"
            }}
          />
        </Box>
        <Box marginLeft="20px">
          <Typography
            variant="h6"
            sx={{ color: "#f1f1f1", fontWeight: "bold", fontSize: "13px" }}
          >
            <span style={{ color: "orange" }}>{formattedDate}</span> /{" "}
            {data?.runtime}min / {data?.genres[0].name}
          </Typography>
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
      <Box display="flex" flexDirection="column" alignItems={isMobile && "center"} marginTop="30px" width="100%">
        <Typography variant="h5" sx={{ color: "#f1f1f1", fontWeight: "bold" }}>
          SYNOPSIS
        </Typography>
        <Box width="70%" textAlign={isMobile && 'center'}>
          <Typography
            variant="p"
            sx={{ color: "#f1f1f1", fontSize: "14px",}}
            marginTop="10px"
          >
            {data?.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieInformations;
