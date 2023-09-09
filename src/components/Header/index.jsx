import { Link, NavLink } from "react-router-dom";
import AuthLinks from "./AuthLinks";
import ProfileInfo from "./ProfileInfo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav className="bg-gray-800 px-4 py-5 lg:px-6 lg:py-4 border-gray-200 text-gray-300">
        <div className="flex flex-wrap justify-between items-center mx-auto  ">
          <Link className="flex items-center transition hover:scale-110 hover:text-white">
            <img className="mr-3 h-6 sm:h-9" src="/logo.svg" />
            <span className="text-2xl font-semibold ">Flow</span>
          </Link>
          {/* Kullanıcı oturum açmış ise ;
           * profil bilgilerini,
           * oturum açık değil ise giriş yap, kayıt ol butonları gözüksün.
           */}
          <div className="flex items-center lg:order-2">
            {true ? <AuthLinks /> : <ProfileInfo />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex text-[24px] items-center p-2 ml-1 rounded-[8px] transition hover:bg-blue-700 lg:hidden"
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className={`${
              isOpen ? "" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  className={
                    "block py-2 pr-4 pl-3 rounded lg:text-blue-500 lg:bg-transparent lg-p-0 text-gray-400 hover:bg-gray-700"
                  }
                  to={"/home"}
                >
                  Anasayfa
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "block py-2 pr-4 pl-3 rounded lg:text-blue-500 lg:bg-transparent lg-p-0 text-gray-400 hover:bg-gray-700"
                  }
                  to={"/hakkimizda"}
                >
                  Hakkımızda
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "block py-2 pr-4 pl-3 rounded lg:text-blue-500 lg:bg-transparent lg-p-0 text-gray-400 hover:bg-gray-700"
                  }
                  to={"/iletisim"}
                >
                  İletişim
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "block py-2 pr-4 pl-3 rounded lg:text-blue-500 lg:bg-transparent lg-p-0 text-gray-400 hover:bg-gray-700"
                  }
                  to={"/ürünler"}
                >
                  Ürünler
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
