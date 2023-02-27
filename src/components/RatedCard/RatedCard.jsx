import React from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";

import Movie from "../Movie/Movie";

const RatedCard = ({ title, data}) => {
    const isNonDestop = useMediaQuery("(max-width: 930px)")
   
  return (
    <Box>
      <Typography variant="h5" sx={{color: "white", marginTop: "50px", fontSize: "17px"}}>{title}</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent={isNonDestop && 'center'} gap="10px">
        {data?.results.map((movie, i) => (
          <Movie key={movie} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCard;
