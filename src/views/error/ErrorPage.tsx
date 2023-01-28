import React from "react";

interface ErrorPageProps {
  error_message: String;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error_message }) => {
  return (
    <div className="container_full flex_center">
      <p className="text_big default_color">{error_message}</p>
    </div>
  );
};
