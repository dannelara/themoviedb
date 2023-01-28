import React, { useRef, useState } from "react";
import { ActionSpan } from "components/actionSpan/ActionSpan";
import "./Styles.css";
interface CloseableProps {
  text: String;
  children: JSX.Element | JSX.Element[];
}

export const Closeable: React.FC<CloseableProps> = ({ text, children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const unlock = () => {
    setUnlocked(!unlocked);

    elementRef.current?.getAttribute("unlocked")
      ? elementRef.current?.removeAttribute("unlocked")
      : elementRef.current?.setAttribute("unlocked", "true");
  };

  return (
    <div className="closable_container">
      <div className="closable_front" onClick={unlock}>
        <div className="controller_container" ref={elementRef}>
          <span className="default_color">{text}</span>
        </div>
      </div>
      {unlocked && <div className="closable_back">{children}</div>}
    </div>
  );
};
