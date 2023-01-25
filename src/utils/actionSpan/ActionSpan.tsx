import React from "react";
import "./Styles.css";
interface ActionSpanProps {
  text: String;
  id: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ActionSpan: React.FC<ActionSpanProps> = ({
  text,
  id,
  onClick,
}) => {
  return (
    <div
      className="flex_center action_span_container"
      id={id}
      onClick={onClick}
    >
      <p>{text}</p>
    </div>
  );
};
