import React from "react";
import "./Styles.css";
interface SectionProps {
  title: String;
  children: JSX.Element | JSX.Element[];
  wrap?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, children, wrap }) => {
  return (
    <div className="content_wrapper">
      <div className="section_full">
        <span className="text_big">{title}</span>
      </div>
      <div className="content_items">
        <div className={wrap ? "flex_container_scroll" : "content_wrapper"}>
          {children}
        </div>
      </div>
    </div>
  );
};
