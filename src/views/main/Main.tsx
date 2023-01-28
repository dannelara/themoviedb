import React from "react";
import "./Styles.css";

import { SearchBar } from "components/searchbar/SearchBar";

interface MainProps {
  children: JSX.Element | JSX.Element[];
}
export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="main">
      <SearchBar />
      {children}
    </div>
  );
};
