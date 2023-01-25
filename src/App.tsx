import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main, Nav, SearchBar, CustumRouter } from "components";
import GlobalState from "global/GlobalState";

function App() {
  return (
    <div className="wrapper_flex">
      <GlobalState>
        <BrowserRouter>
          <Nav />
          <Main>
            <CustumRouter />
          </Main>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
