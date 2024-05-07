"use client";
import { createContext, useState, useContext, useEffect } from "react";

interface constextProps {
  isMenuActive: boolean;
  setMenuActive: (value: boolean) => void;
}
const HeaderContext = createContext<constextProps>({
  isMenuActive: false,
  setMenuActive: () => {},
});

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <HeaderContext.Provider value={{ isMenuActive, setMenuActive }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
export default HeaderProvider;
