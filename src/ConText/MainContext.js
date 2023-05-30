import React, { createContext, useState } from "react";
const init = {
    initModalVisibleUser: false,
};

export const MainConText = createContext({});

const ConTextProvider = ({ children }) => {
    const [modalVisibleUser, setModalVisibleUser] = useState(false);
    return (
        <MainConText.Provider value={{ modalVisibleUser, setModalVisibleUser }}>
            {children}
        </MainConText.Provider>
    );
};

export default ConTextProvider;
