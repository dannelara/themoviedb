import React from "react";
import { GlobalStateContext } from "global/GlobalState";
import seach_icon from "assets/images/SearchIcon.png";
import "./Styles.css";

export const SearchBar: React.FC = ({}) => {
  const { search_query, set_search_query } =
    React.useContext(GlobalStateContext);

  return (
    <div className="search_bar_wrapper">
      <div className="input_wrapper">
        <img src={seach_icon} alt="search icon" className="search_bar_icon" />
        <input
          type="text"
          required
          placeholder="Search movie titles"
          className="search_bar_input"
          onChange={(e) => set_search_query(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
