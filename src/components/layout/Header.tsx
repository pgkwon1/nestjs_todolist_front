import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 text-white font-normal">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">TODO</div>
      </div>
      <nav className="space-x-4">
        <a href="#" className="text-lg">
          메뉴1
        </a>
        <a href="#" className="text-lg">
          메뉴2
        </a>
        <a href="#" className="text-lg">
          메뉴3
        </a>
      </nav>
      <div>
        <Link href={"/login"}>
          <button className="text-lg">로그인</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
