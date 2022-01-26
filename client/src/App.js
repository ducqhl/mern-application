import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
