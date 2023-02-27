import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const FeaturedMovie = ({ movie }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablette = useMediaQuery("(max-width: 850px)");
  if (!movie) return null;
  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      display="flex"
      justifyContent="center"
      height="490px"
      sx={{ marginBottom: "30px", textDecoration: "none" }}
    >
      <Card
        display="flex"
        justifyContent="flex-end"
        flexDirection="column"
        sx={{ width: "100%" }}
      >
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            height: "600px",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.575)",
            backgroundBlendMode: "darken",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: isMobile ? "100%" : "60%",
            top: "450px",
            left: !isMobile ? "250px" : "0",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: isTablette ? "15px" : "20px",
              }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: isTablette ? "8px" : "11px",
                color: "white",
                lineHeight: isTablette ? "10px" : "16px",
              }}
            >
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
