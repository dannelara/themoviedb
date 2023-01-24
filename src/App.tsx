import React, { Suspense } from "react";
import "./App.css";
import { Main, Nav, SearchBar, Home, FullMovieView } from "components";
import GlobalState from "global/GlobalState";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="wrapper_flex">
      <GlobalState>
        <BrowserRouter>
          <Nav />

          <Main>
            <Suspense fallback={<div>Loading</div>}>
              {" // Make a custom loading component."}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<FullMovieView />} />
              </Routes>
            </Suspense>
          </Main>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
