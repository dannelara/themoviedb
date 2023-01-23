import React from "react";
import "./App.css";
import { Main, Nav, SearchBar } from "components";
import GlobalState from "global/GlobalState";

function App() {
  return (
    <div className="wrapper_flex">
      <GlobalState>
        <Nav />

        <Main />
      </GlobalState>
    </div>
  );
}

export default App;
