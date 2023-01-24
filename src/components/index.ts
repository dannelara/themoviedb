import React from "react";
import { Main } from "./main/Main";
import { Nav } from "./nav/Nav";
import { SearchBar } from "./searchbar/SearchBar";

// Lazy load these only these components since they are  the ones that fetches and loads data.
const Home = React.lazy(() => import("./home/Home"));
const FullMovieView = React.lazy(() => import("./fullMovieView/FullMovieView"));

export { Main, Nav, SearchBar, Home, FullMovieView };
