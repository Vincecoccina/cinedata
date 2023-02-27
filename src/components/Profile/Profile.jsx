import React, { useEffect, useState } from "react";
import { Typography, Button, Box} from "@mui/material";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import RatedCard from "../RatedCard/RatedCard";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const [page, setPage] = useState(1);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page
  });

  const { data: watchlist, refetch: refetchWatchlist } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
 
  useEffect(() => {
    refetchFavorites()
    refetchWatchlist()
  }, [])

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };


  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", fontSize: "25px" }}
        >
          Mon Profil / <span className="profile-name">{user.username}</span>
        </Typography>
        <Button
          onClick={logout}
          size="small"
          sx={{
            backgroundColor: "crimson",
            color: "#f1f1f1",
            fontSize: '10px',
            "&:hover": {
              backgroundColor: "crimson",
              filter: "brightness(150%)",
            },
          }}
        >
          Déconnexion
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlist?.results?.length ? (
        <Typography
          variant="h5"
          width="50%"
          margin="100px auto"
          textAlign="center"
          sx={{ color: "#f1f1f1" }}
        >
          Ajoutez des films a votre liste.
        </Typography>
      ) : (
        <Box>
          <RatedCard
            title={`Vous avez vu : ${favoriteMovies.results.length} ${
              favoriteMovies.results.length > 1 ? "films" : "film"
            }`}
            data={favoriteMovies}
          />
          <Pagination currentPage={page} setPage={setPage} totalPages={favoriteMovies.total_pages}/>
          
        </Box>
      )}
    </Box>
  );
};

export default Profile;
