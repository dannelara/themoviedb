/**
 * The starting point of the application.
 *
 * @author Daniel Martinez lara
 * @version 1.0.0
 */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CustumRouter } from "routing";
import { Nav, Footer } from "components";
import GlobalState from "global/GlobalState";
import { Main } from "views";
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
