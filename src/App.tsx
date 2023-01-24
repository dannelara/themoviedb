import React from "react";
import "./App.css";
import { FullMovieView, Main, Nav, SearchBar } from "components";
import GlobalState from "global/GlobalState";
import { Home } from "components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="wrapper_flex">
      <GlobalState>
        <BrowserRouter>
          <Nav />

          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie" element={<FullMovieView />} />
            </Routes>
          </Main>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
