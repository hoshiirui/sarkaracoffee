"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Promo, PromoWithMenu } from "@/types/Promo";
import { createClient } from "@/helper/supabase/client";
import { MenuSarkara } from "@/types/MenuSarkara";
import { ToastError } from "@/helper/Toast";
import { formatDate } from "@/helper/dateTimeFormatter";

const posts = [
  {
    id: 1,
    title: "Promo Weekend - Free Mineral Water",
    href: "#",
    description:
      "Dapatkan free mineral water Aqua setiap weekend dengan minimal belanja Rp. 70.000. Yuk pesan sekarang!",
    date: "Selama Bulan Januari",
    datetime: "2020-03-16",
    category: { title: "Free Items", href: "#" },
    minTrans: 70000,
  },
  {
    id: 2,
    title: "Diskon 35% Menu Kategori Non-Coffee",
    href: "#",
    description:
      "Dapatkan diskon sebesar 35% untuk menu-menu dengan kategori non-coffee. Untuk keterangan menu dapat dilihat di bagian Menu Berlaku. Yuk pesan sekarang!",
    menuB: "Matcha, Tea Series",
    date: "Weekend",
    datetime: "2020-03-16",
    category: { title: "Discount", href: "#" },
  },
  {
    id: 3,
    title: "Dapatkan Extra Porsi Pisang Goreng",
    href: "#",
    description:
      "Dapatkan extra porsi pisang goreng untuk pembelian all variant pisang goreng sesuai tanggal yang berlaku. Yuk pesan sekarang!",
    date: "14 Januari - 14 Februari 2025",
    menuB: "Pisang Goreng all Variant",
    datetime: "2020-03-16",
    category: { title: "Extras", href: "#" },
  },
  {
    id: 4,
    title: "Sarkara #3 Anniversary Special Promo",
    href: "#",
    description:
      "Dapatkan potongan harga sebesar 50% untuk item-item yang berlaku. Tunggu apa lagi, yuk pesan sekarang!",
    date: "14 Maret",
    menuB: "All Sarkara Signature",
    datetime: "2020-03-16",
    category: { title: "Discount", href: "#" },
  },
  {
    id: 5,
    title: "Makin Kenyang dengan Extra Kentang",
    href: "#",
    description:
      "Dapatkan gratis satu porsi kentang goreng untuk transaksi minimal Rp. 50.000. Yuk pesan sekarang!",
    date: "14 Januari - 14 Februari 2025",
    minTrans: 50000,
    datetime: "2020-03-16",
    category: { title: "Free Items", href: "#" },
  },

  // More posts...
];

export default function PromoPage() {
  const [selectedPromo, setSelectedPromo] = useState<PromoWithMenu>();
  const [promoModalVisible, setPromoModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [Promos, setPromos] = useState<Promo[]>([]);
  const [Menus, setMenus] = useState<MenuSarkara[]>([]);
  const [promoList, setPromoList] = useState<PromoWithMenu[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("promo")
        .select(`*`)
        .order("created_at", { ascending: false });
      const { data: dataMenu, error: errorMenu } = await supabase
        .from("menu")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching data:", error.message);
      } else if (errorMenu) {
        console.error("Error fetching data:", errorMenu.message);
      } else {
        setPromos(data);
        setMenus(dataMenu);
        // console.log(data);
        // console.log(dataMenu);

        const menuMap = new Map(dataMenu.map((menu) => [menu.id, menu]));

        const updatedPromos = data.map((promo) => ({
          ...promo,
          menuBerlaku: promo.menuB
            ? promo.menuB.map((menuId: any) => menuMap.get(menuId))
            : null,
        }));

        setPromoList(updatedPromos);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <>
        <Header active="Promo" />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-36 pt-36 min-h-screen">
          <div className="flex flex-col items-center">
            <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col items-center">
              <h2 className="text-base/7 font-semibold text-sarkara-sign-1">
                Sarkara Benefit
              </h2>
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mt-2">
                Promo Berlangsung
              </h2>
              <p className="mt-2 text-lg/8 text-gray-600">
                Temukan penawaran-penawaran menarik di sini!
              </p>
            </div>
            {!isLoading && promoList ? (
              <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-16 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {promoList.map((post) => (
                  <article
                    key={post.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <Image
                      className="w-[100%] h-[200px] object-cover rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/promoimages//${post.imageHref}`}
                      alt="discount"
                      width={800}
                      height={800}
                    />
                    <div className="flex items-center gap-x-4 text-xs mt-6">
                      <time dateTime={post.date} className="text-gray-500">
                        {formatDate(post.date)}
                      </time>
                      <a
                        href="#"
                        className="relative rounded-full bg-sarkara-sign-4 px-3 py-1.5 font-medium text-sarkara-sign-1 hover:bg-sarkara-sign-3"
                      >
                        {post.category}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-xl/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <span className="inset-0" />
                        {post.title}
                      </h3>
                      <button
                        className="mt-5 line-clamp-3 text-sm/6 text-sarkara-sign-1 font-bold"
                        type="button"
                        onClick={() => {
                          setSelectedPromo(post);
                          setPromoModalVisible(true);
                        }}
                      >
                        Lihat Selengkapnya
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </main>
        {selectedPromo && (
          <Modal
            isVisible={promoModalVisible}
            onClose={() => setPromoModalVisible(false)}
            product={selectedPromo}
          />
        )}
        <Footer />
      </>
    </div>
  );
}
