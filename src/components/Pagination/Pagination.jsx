import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
        sx={{ margin: "30px 2px" }}
      >
        <ArrowBack />
      </Button>
      <Typography variant="h4" sx={{ color: "#f1f1f1", fontSize: "17px" }}>
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
        sx={{ margin: "30px 2px" }}
      >
        <ArrowForward />
      </Button>
    </Box>
  );
};

export default Pagination;
