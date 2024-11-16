"use client";
import PreLoader from "@/components/preLoader/PreLoader";
import ReduxProvider from "@/provider/ReduxProvider";
import { FC, ReactNode, useEffect, useState } from "react";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
    const [preLoader, setPreLoader] = useState<boolean>(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setPreLoader(false);
      }, 3000);
    
      return () => clearTimeout(timer);
    }, []);
    
    if (preLoader) {
      return <PreLoader/>
    }

  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;