import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Discover } from "components/discover/Discover";
import { Loader } from "utils/loader/Loader";
import { SearchView } from "components/searchView/SearchView";

// Lazy load these two components since they're the ones loading data.
const Home = React.lazy(() => import("components/home/Home"));
const FullMovieView = React.lazy(
  () => import("components/fullMovieView/FullMovieView")
);

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
