import React from "react";
import "./Styles.css";
interface SectionProps {
  title: String;
  children: JSX.Element | JSX.Element[];
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="content_wrapper">
      <div>
        <span>{title}</span>
      </div>

      <div className="content_items">{children}</div>
    </div>
  );
};
