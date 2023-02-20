import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {searchMovie} from "../../features/currentGenresOrCategory";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();


  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        console.log(query);
        dispatch(searchMovie(query))
    }
  };

  return (
    <>
      {isMobile ? (
        <InputBase
          onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "orange" }} />
            </InputAdornment>
          }
          sx={{
            margin: "0 auto 20px auto",
            borderBottom: "1px solid orange",
            color: "white",
          }}
        />
      ) : (
        <InputBase
          onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "orange" }} />
            </InputAdornment>
          }
          sx={{
            width: '250px',
            margin: "0 auto",
            borderBottom: "1px solid orange",
            color: "white",
          }}
        />
      )}
    </>
  );
};

export default SearchBar;
