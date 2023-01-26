import React, { useState } from "react";
import { GlobalStateContext } from "global/GlobalState";
import seach_icon from "assets/images/SearchIcon.png";
import "./Styles.css";
import { useNavigate } from "react-router-dom";

export const SearchBar: React.FC = ({}) => {
  const { setSearchQuery } = React.useContext(GlobalStateContext);

  const navigate = useNavigate();

  return (
    <div className="search_bar_wrapper" onClick={() => navigate("/search")}>
      <div className="input_wrapper">
        <img src={seach_icon} alt="search icon" className="search_bar_icon" />
        <input
          type="text"
          required
          placeholder="Search movie titles"
          className="search_bar_input"
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
