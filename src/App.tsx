import React, { Suspense } from "react";
import "./App.css";
import { Main, Nav, SearchBar, Home } from "./components";
// import GlobalState from "global/GlobalState";
// import { Home } from "components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// const FullMovieView = React.lazy(
//   () => import("components/fullMovieView/FullMovieView")
// );

function App() {
  return (
    <div className="wrapper_flex">
      {/* <GlobalState> */}
      <BrowserRouter>
        <Nav />

        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route
                path="/movie"
                element={
                  // Make a custom loading component.
                  <Suspense fallback={<div>Loading</div>}>
                    <FullMovieView />
                  </Suspense>
                }
              /> */}
          </Routes>
        </Main>
      </BrowserRouter>
      {/* </GlobalState> */}
    </div>
  );
}

export default App;
