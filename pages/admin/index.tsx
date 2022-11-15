import Link from "next/link";
import React, { ReactElement } from "react";
import { useState } from "react";
import Header from '../../components/Admin/Header';
import Sidebar from "../../components/Admin/Sidebar";
import Notify from '../../components/Notification/Notify';

interface Props {
  children: JSX.Element;
}

function Admin({ children }: Props): ReactElement {
  const [sidebar, setSidebar] = useState(true);
 
  return (
    <div className="h-screen overflow-hidden">
      <Notify />
      <Header setSidebar={setSidebar} />
      <div className="flex h-full">
        <Sidebar open={sidebar} />
        <div className={`p-2 md:p-4 bg-gray-200 w-full transition-all duration-300 ease-in-out dark:bg-black`} >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Admin;
