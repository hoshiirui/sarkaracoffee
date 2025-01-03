import React from "react";
import { Metadata } from "next";
import SarkaraMenu from "../../pages/Menu";

export const metadata: Metadata = {
  title: "Login POS Apotek Farmaguru",
  description: "Login POS Apotek Farmaguru",
};

const page = () => {
  return <SarkaraMenu />;
};

export default page;
