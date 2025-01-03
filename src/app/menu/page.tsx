import React from "react";
import { Metadata } from "next";
import SarkaraMenu from "../../pages/Menu";

export const metadata: Metadata = {
  title: "Sarkara Coffee - Menu",
  description: "Menu Sarkara Coffee",
};

const page = () => {
  return <SarkaraMenu />;
};

export default page;
