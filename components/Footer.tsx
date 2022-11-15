import Link from "next/link";
import { AiFillFacebook, AiFillYoutube, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-slate-400 to-cyan-500 mt-8 py-8">
      <div className="container mx-auto text-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="mt-4 lg:mt-0">
            <h1 className="font-bold text-sm lg:text-lg">LOGO</h1>
            <div className="mt-4">
              <p className="text-sm">
                You can explore our product here. make your time more useful .
                alot of tools can make you earn more money thank you for
                caming...
              </p>
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            <h1 className="font-bold text-sm lg:text-lg">Some Product</h1>
            <div className="mt-4">
              <Link href={"/about"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline tetx-sm">
                  Youtube Booster
                </p>
              </Link>
              <Link href={"/about"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline tetx-sm">
                  Facebook Hack
                </p>
              </Link>
              <Link href={"/about"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline tetx-sm">
                  TikTok Downloader
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            <h1 className="font-bold text-sm lg:text-lg">Social Media</h1>
            <div className="mt-4">
              <p className="text-sm">
                Here you can contact us with these. contact us for work
              </p>
              <div className="flex items-center mt-4">
                <Link href={""}>
                  <a>
                    <AiFillFacebook className="text-2xl rounded-lg mx-1" />
                  </a>
                </Link>
                <Link href={""}>
                  <a>
                    <AiFillYoutube className="text-2xl rounded-lg mx-1" />
                  </a>
                </Link>
                <Link href={""}>
                  <a>
                    <AiFillInstagram className="text-2xl rounded-lg mx-1" />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            <h1 className="font-bold text-sm lg:text-lg">Menu</h1>
            <div className="mt-4">
              <Link href={"/"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  Home
                </p>
              </Link>
              <Link href={"/youtube"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  Youtube
                </p>
              </Link>
              <Link href={"/facebook"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  Facebook
                </p>
              </Link>
              <Link href={"/tiktok"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  TikTok
                </p>
              </Link>
              <Link href={"/another"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  Another
                </p>
              </Link>
              <Link href={"/about"}>
                <p className="cursor-pointer mt-2 font-semibold hover:underline text-sm">
                  About
                </p>
              </Link>
            </div>
          </div>
        </div>

        <h1 className="text-center mt-4 text-sm font-semibold">
          All right reserve @Sell Tools
        </h1>
      </div>
    </div>
  );
};

export default Footer;
