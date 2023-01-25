import React from "react";
import "./Styles.css";
import { Loader } from "utils/loader/Loader";

export const Discover: React.FC = ({}) => {
  return (
    <div className="content_wrapper flex_center">
      <Loader />
    </div>
  );
};
