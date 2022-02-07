import { Container } from "@material-ui/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import PostDetails from "./components/PostDetails";
import { STORAGE_KEYS } from "./constants/storageKeys";

const App = () => {
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id"  element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
