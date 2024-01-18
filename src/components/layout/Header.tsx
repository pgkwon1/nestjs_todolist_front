import { IRootReducer } from "@/dto/Reducer";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { isLogin, userId } = useSelector(
    (state: IRootReducer) => state.memberReducer
  );
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
        {isLogin ? (
          <>
            <span className="font-lg mr-4">{userId} 님 환영합니다!</span>
            <Link href={"/member/logout"}>
              <button className="text-lg">로그아웃</button>
            </Link>
          </>
        ) : (
          <>
            <Link className="mr-4" href={"/member/login"}>
              <button className="text-lg">로그인</button>
            </Link>
            <Link href={"/member/register"}>
              <button className="text-lg">회원가입</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
