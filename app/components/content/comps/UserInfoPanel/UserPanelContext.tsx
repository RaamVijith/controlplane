import React, { createContext, useState, useContext } from "react";

// Create a context
const UserPanelContext = createContext({
  panelData: {
    id: null,
    name: null,
    gender: null,
    email: null,
    contact: null,
    job_title: null,
    annual_revenue: null,
    status: null,
    location: null,
    category: null,
    activities: [],
    notes: [],
  },
  isPanelVisible: false,
  isExtendedUserInfoPanelVisible: false,
  setPanelVisible: (value: boolean) => {},
  setExtendedUserInfoPanelVisible: (value: boolean) => {},
  setPanelData: (data: any) => {},
});

interface IPanelProvider {
  children: React.ReactNode;
}

// Create a provider component
export const UserPanelProvider: React.FC<IPanelProvider> = ({ children }) => {
  const [isPanelVisible, setPanelVisible] = useState<boolean>(false);
  const [isExtendedUserInfoPanelVisible, setExtendedUserInfoPanelVisible] =
    useState<boolean>(false);
  const [panelData, setPanelData] = useState<any>(null);

  return (
    <UserPanelContext.Provider
      value={{
        isPanelVisible,
        isExtendedUserInfoPanelVisible,
        panelData,
        setPanelVisible,
        setExtendedUserInfoPanelVisible,
        setPanelData,
      }}
    >
      {children}
    </UserPanelContext.Provider>
  );
};

// Create a custom hook to use the PanelContext
export const usePanel = () => useContext(UserPanelContext);
