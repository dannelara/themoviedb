import React from "react";
import "./Styles.css";

interface FooterProps {
  children?: JSX.Element | JSX.Element[];
}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="footer">
      <span className="gray_color">
        This product uses the TMDb API but is not endorsed or certified by TMDb
      </span>
    </div>
  );
};
