import React from "react";
import "./Styles.css";
interface CardBigProps {
  poster_path: String;
  title: String;
  release: String;
  id: String;
}

export const CardBig: React.FC<CardBigProps> = ({
  poster_path,
  title,
  release,
  id,
}) => {
  return (
    <div className="card_big" id={`${id}`}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt="poster"
      />
      <div className="card_description">
        <div>
          <span className="text_small">{title}</span>
          <span className="text_xsmall">{release}</span>
        </div>
      </div>
    </div>
  );
};
