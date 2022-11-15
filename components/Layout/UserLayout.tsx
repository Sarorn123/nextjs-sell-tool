import React from "react";
import Header from "../Header";
import Footer from "../Footer";

type Props = {
  children: JSX.Element;
};

function UserLayout({ children }: Props) {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <Header />
      <main className="mt-14">{children}</main>
      <Footer />
    </div>
  );
}

export default UserLayout;
