import React from "react";
import { Metadata } from "next";
import PromoPage from "@/pages/Promo";

export const metadata: Metadata = {
  title: "Sarkara Coffee - Promo",
  description: "Promo Sarkara Coffee",
};

const page = () => {
  return <PromoPage />;
};

export default page;
