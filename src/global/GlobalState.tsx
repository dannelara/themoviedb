import React, { useState, useEffect } from "react";

export const GlobalStateContext = React.createContext<any>(null);

const GlobalState = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [search_query, set_search_query] = useState("");

  const state = {
    search_query,
    set_search_query,
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
