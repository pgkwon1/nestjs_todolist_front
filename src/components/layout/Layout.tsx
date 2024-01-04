import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r to-indigo-500 from-purple-500">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
