import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen">{children}</div>
      <footer className="flex justify-items-center flex-col contents-center p-10">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
