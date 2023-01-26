/**
 * The starting point of the application.
 *
 * @author Daniel Martinez lara
 * @version 1.0.0
 */

import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main, Nav, SearchBar, CustumRouter, Footer } from "components";
import GlobalState from "global/GlobalState";

function App() {
  return (
    <div className="wrapper_flex">
      <GlobalState>
        <BrowserRouter>
          <Nav />
          <Main>
            <CustumRouter />
            <Footer />
          </Main>
        </BrowserRouter>
      </GlobalState>
    </div>
  );
}

export default App;
