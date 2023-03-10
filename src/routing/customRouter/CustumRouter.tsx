import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Discover } from "views";
import { Loader } from "components";
import { SearchView } from "views";

// Lazy load these two components since they're the ones loading data.
const Home = React.lazy(() => import("views/home/Home"));
const FullMovieView = React.lazy(() => import("views/fullMovie/FullMovieView"));

export const CustumRouter: React.FC = ({}) => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<FullMovieView />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/search" element={<SearchView />} />
      </Routes>
    </Suspense>
  );
};
