import React from "react";
import { Metadata } from "next";
import Homepage from "@/pages/Hompeage";
import Contact from "@/pages/Contact";
import History from "@/pages/History";

export const metadata: Metadata = {
  title: "Sarkara Coffee - Riwayat Pesanan",
  description: "Riwayat Pesanan Sarkara Coffee",
};

const page = () => {
  return <History />;
};

export default page;
