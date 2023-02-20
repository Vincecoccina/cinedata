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
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [query, setQuery] = useState("");
  const handleKeyPress = () => {};
  return (
    <InputBase
      onKeyPress={handleKeyPress}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant="standard"
      placeholder="Rechercher..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon sx={{ color: 'orange'}} />
        </InputAdornment>
      }
      sx={{
        width: "30%",
        margin: "0 auto",
        borderBottom: "1px solid orange",
        color: "white",
      }}
    />
  );
};

export default SearchBar;
