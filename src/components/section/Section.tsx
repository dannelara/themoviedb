import React from "react";
import "./Styles.css";
interface SectionProps {
  title: String;
  children: JSX.Element | JSX.Element[];
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="content_wrapper">
      <div className="section_full">
        <span className="text_big">{title}</span>
      </div>
      <div className="content_items">{children}</div>
    </div>
  );
};
