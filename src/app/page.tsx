import React from "react";
import { Metadata } from "next";
import Homepage from "@/pages/Hompeage";

export const metadata: Metadata = {
  title: "Sarkara Coffee - Beranda",
  description: "Beranda Sarkara Coffee",
};

const page = () => {
  return (
    <>
      <Homepage />
    </>
  );
};

export default page;
