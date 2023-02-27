import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MovieInformations from "./components/MovieInfos/MovieInformations";
import Actors from "./components/Actors/Actors";
import Profile from "./components/Profile/Profile";
import Movies from "./components/Movies/Movies";
import useStyles from "./components/styles";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
        <CssBaseline />
        <NavBar/>
        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInformations />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>

    </div>
  );
};

export default App;
