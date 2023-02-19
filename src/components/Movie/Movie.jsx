import React from "react";
import { Typography, Grid, Tooltip, Rating, Grow } from "@mui/material";
import { Link } from "react-router-dom";
import "./Movie.css";

const Movie = ({ movie, id }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} mt="15px" textAlign="center">
      <Grow in key={id} timeout={(id + 1) * 250}>
        <Link to={`/movie/${movie.id}`} className="movieLink">
          <img
            className="movieImg"
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "wwww.fillmurray.com/200/500"
            }
          />
          <Typography
            variant="h5"
            sx={{
              color: "#f1f1f1",
              fontWeight: "bold",
              fontSize: "14px",
              textOverflow: "ellipsis",
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              mt: "10px",
              mb: "0",
              textAlign: "center",
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating
                readOnly
                value={movie.vote_average / 2}
                precision={0.1}
                size="small"
              />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
