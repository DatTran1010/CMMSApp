import React, { createContext, useState } from "react";
const init = {
  initModalVisibleUser: false,
  initVisibleCadelar: false,
};

export const MainConText = createContext({});

const ConTextProvider = ({ children }) => {
  const [modalVisibleUser, setModalVisibleUser] = useState(
    init.initModalVisibleUser
  );

  const [visibleCadelar, setVisiblecadelar] = useState(init.initVisibleCadelar);
  return (
    <MainConText.Provider
      value={{
        modalVisibleUser,
        setModalVisibleUser,
        visibleCadelar,
        setVisiblecadelar,
      }}
    >
      {children}
    </MainConText.Provider>
  );
};

export default ConTextProvider;
