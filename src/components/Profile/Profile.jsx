import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Brightness1, ExitToApp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const favouritesMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  console.log(user.avatar);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", fontSize: "30px" }}
        >
          Mon Profil / <span className="profile-name">{user.username}</span>
        </Typography>
        <Button
          onClick={logout}
          sx={{
            backgroundColor: "crimson",
            color: "#f1f1f1",
            "&:hover": {
              backgroundColor: "crimson",
              filter: "brightness(150%)",
            },
          }}
        >
          Déconnexion &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouritesMovies.length ?
      <Typography variant="h5" width="50%" margin="100px auto" textAlign="center" sx={{color: "#f1f1f1"}}>
        Ajoutez des films a votre liste.
      </Typography> : <Box>Mes films</Box>}
    </Box>
  );
};

export default Profile;
