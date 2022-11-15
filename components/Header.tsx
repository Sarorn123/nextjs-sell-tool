import { BsSearch } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import Button from "./utils/Button";
import Dropbox from "./utils/Dropbox";
import SearchProductDrawer from "./utils/SearchProductDrawer";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hook";
import { getAuthData } from "../redux/slice/authSlice";
import Logo from "../images/logo.png";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleDropbox, setToggleDropbox] = useState(false);
  const [toggleSearchProduct, setToggleSearchProduct] = useState(false);

  useEffect(() => {
    const scollEvent = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", scollEvent);
    return () => window.removeEventListener("scroll", scollEvent);
  }, []);

  const handleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleDropbox = () => {
    setToggleDropbox(!toggleDropbox);
  };

  const handleToggleSearchProduct = () => {
    setToggleSearchProduct(!toggleSearchProduct);
  };


  const { user } = useAppSelector(getAuthData);
  // console.log("userfromHeader", user);

  return (
    <>
      {toggleSearchProduct && (
        <SearchProductDrawer closeDrawer={handleToggleSearchProduct} />
      )}
      <div
        className={`z-30 transition-all duration-300 ease-in-out w-full fixed top-0 left-0  text-white ${
          scroll ? "bg-primary " : "bg-black"
        }`}
      >
        <header className=" flex items-center justify-between h-14 container mx-auto">
          <div className="flex items-center">
            <div className="w-7 lg:w-10">
              <Image src={Logo} />
            </div>
            <ul className={` items-center hidden lg:flex ml-4`}>
              <Link href={"/"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2 ">
                  Home
                </li>
              </Link>
              <Link href={"/youtube"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Youtube
                </li>
              </Link>
              <Link href={"/facebook"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Facebook
                </li>
              </Link>
              <Link href={"/tiktok"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  TikTok
                </li>
              </Link>
              <Link href={"/another"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Another
                </li>
              </Link>
              <Link href={"/about"}>
                <li className=" text-sm font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  About
                </li>
              </Link>
            </ul>

            {/* For Small Screen */}

            <ul
              className={`lg:hidden fixed top-0 left-0 flex flex-col items-center pt-4 bg-cyan-500 h-screen justify-center transition duration-300 ease-in-out w-[70%] ${
                !toggleMenu && "-translate-x-[100%]"
              }`}
            >
              <Link href={"/"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2 ">
                  Home
                </li>
              </Link>
              <Link href={"/youtube"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Youtube
                </li>
              </Link>
              <Link href={"/facebook"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Facebook
                </li>
              </Link>
              <Link href={"/tiktok"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  TikTok
                </li>
              </Link>
              <Link href={"/another"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  Another
                </li>
              </Link>
              <Link href={"/about"}>
                <li className=" font-semibold cursor-pointer mt-4 lg:mt-0 lg:mx-2">
                  About
                </li>
              </Link>
            </ul>
            {/* For Small Screen */}
          </div>

          <div className="flex items-center">
            <BsSearch
              className="text-lg font-semibold lg:mx-4 mx-2 cursor-pointer"
              onClick={handleToggleSearchProduct}
            />
            {user ? (
              <>
                <h1 className="hidden text-sm lg:mx-4 mx-2 lg:block">
                  {user.full_name}
                </h1>
                <BiBell className="text-2xl lg:mx-4 mx-2 cursor-pointer" />

                <div className="flex items-center" onClick={handleDropbox}>
                  <img
                    src={
                      user.image_url
                        ? user.image_url
                        : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    }
                    className="w-8 h-8 object-cover rounded-full mx-2"
                  />
                  <IoMdArrowDropdown />
                </div>

                {toggleDropbox && <Dropbox closeDropBox={handleDropbox} />}
              </>
            ) : (
              <Button
                text="Sign In"
                action={() => router.push("/auth/login")}
              />
            )}
            <CgMenuMotion
              className="text-xl font-semibold lg:mx-4 mx-2 lg:hidden"
              onClick={handleSidebar}
            />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
