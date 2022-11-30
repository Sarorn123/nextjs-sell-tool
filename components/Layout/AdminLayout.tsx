import Link from "next/link";
import React, { ReactElement } from "react";
import Header from "../Admin/Header";
import Sidebar from "../Admin/Sidebar";
import { useState } from "react";
import Admin from "../../pages/admin";

interface Props {
  children: JSX.Element;
}

function AdminLayout({ children }: Props): ReactElement {
  return (
    <Admin>{children}</Admin>
  );
}

export default AdminLayout;
