import React from "react";
import { Metadata } from "next";
import Homepage from "@/pages/Hompeage";
import Contact from "@/pages/Contact";

export const metadata: Metadata = {
  title: "Sarkara Coffee - Hubungi Kami",
  description: "Hubungi Kami Sarkara Coffee",
};

const page = () => {
  return <Contact />;
};

export default page;
