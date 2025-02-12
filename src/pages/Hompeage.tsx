"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import { Instagram, InstagramIcon } from "lucide-react";
import { Promo, PromoWithMenu } from "@/types/Promo";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
  ServerIcon,
  SparklesIcon,
  WifiIcon,
} from "@heroicons/react/20/solid";
import { ToastError } from "@/helper/Toast";
import { createClient } from "@/helper/supabase/client";
import { MenuSarkara } from "@/types/MenuSarkara";
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
  // More posts...
];

const features = [
  {
    name: "Menu Signature",
    description:
      "Kami memiliki menu khusus yang hanya tersedia di Sarkara yang siap meninggalkan cita rasa tak terlupakan bagi lidah anda!",
    icon: SparklesIcon,
  },
  {
    name: "WiFi Gratis",
    description:
      "Kami memastikan pengunjung nyaman dengan adanya layanan WiFi gratis dari kami..",
    icon: WifiIcon,
  },
  {
    name: "Buat Asik dengan Musik",
    description:
      "Kami menyediakan alat musik berupa gitar akustik beserta sebuah sound system yang dijamin membuat kumpul-kumpul kalian makin asik. Selain itu ada juga kartu uno yang dapat kalian mainkan bersama teman-teman!",
    icon: PuzzlePieceIcon,
  },
];

export default function Homepage() {
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
      <Header active="Beranda" />

      {/* bagian hero */}
      <div className=" bg-[#F4F2EF]">
        <div className="grid-cols-2 grid gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
          <div className="lg:col-span-1 col-span-full flex flex-col justify-center items-center lg:items-start mt-16 lg:mt-0">
            <p className="text-sarkara-sign-1 font-bold text-7xl font-fraunces lg:text-left text-center capitalize">
              Great simple
              <br /> coffee
            </p>
            <p className="text-xl text-[#C2A487] mt-8 lg:text-left text-center max-w-lg lg:max-w-none">
              Di antara tegukan kopi dan tawa bersama teman, mimpi besar untuk
              masa depan tumbuh perlahan
            </p>
            <div className="mt-8 flex items-center justify-start gap-x-6">
              <Link href={`/menu`}>
                <button
                  type="button"
                  className="rounded-md bg-sarkara-sign-1 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sarkara-sign-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-2"
                >
                  Lihat Menu
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1 col-span-full flex flex-col items-center justify-center">
            <Image
              className="w-[80%]"
              src={`/images/hero-coffee.png`}
              alt="hero"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>

      {/* bagian about  */}

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 flex flex-col justify-center lg:max-w-lg">
            <h2 className="text-base/7 font-semibold text-sarkara-sign-1">
              Tentang Sarkara
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Ini Cerita Kami
            </p>
            <p className="mt-6 text-lg/8 text-gray-600 font-bold">
              &quot;Dalam setiap cangkir kopi ada percakapan kecil tentang masa
              depan yang kita impikan&quot;
            </p>
            <p className="mt-6 text-lg/8 text-justify text-gray-600">
              Sarkara Coffee merupakan sebuah startup kopi yang didirikan pada
              tahun 2023. Kami percaya bahwa setiap cangkir kopi adalah sebuah
              karya seni. Dengan menggabungkan biji kopi berkualitas dengan
              teknik roasting yang unik, kami menciptakan cita rasa yang tak
              terlupakan. Setiap menu kami memiliki cerita dan karakternya
              masing-masing, siap untuk memanjakan lidah Anda.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <img
              alt="Product screenshot"
              src={`images/home/lobby.jpg`}
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      {/* bagian promo */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 flex flex-col items-center">
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
                    href={post.category}
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
        <Link href={`/promo`}>
          <button
            type="button"
            className="rounded-md bg-sarkara-sign-1 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sarkara-sign-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-2 mt-10"
          >
            Lihat Promo Lainnya
          </button>
        </Link>
      </div>

      {/* bagian fitur */}
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 mt-24">
        <h2 className="text-center text-base/7 font-semibold text-sarkara-sign-1">
          Fasilitas Sarkara
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Tempat Nyaman Untuk Kumpul dan Bekerja
        </p>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <img
              alt="Product screenshot"
              src={`images/home/kursi.jpg`}
              width={2432}
              height={1442}
            />
          </div>
          <div className="flex flex-col justify-center lg:max-w-lg">
            <p className="mt-6 text-lg/8 text-justify text-gray-600">
              Kami memiliki beberapa fasilitas yang membuat pekerjaan ataupun
              kegiatan kumpul-kumpul Anda menjadi lebih nyaman!
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 size-5 text-sarkara-sign-2"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* bagian follow ig */}
      <div className="mx-auto max-w-7xl py-24 sm:px-6 mt-24">
        <div className="relative isolate overflow-hidden bg-gray-900 px-16 shadow-2xl sm:rounded-3xl text-left flex flex-col items-center py-12">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#C7644F" />
                <stop offset={1} stopColor="#ECA68D" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto ">
            <p className="text-pretty text-lg/8 text-gray-300">
              Kepoin yuk aktivitas kami di
            </p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              @sarkaracoffee.bali
            </h2>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={`https://www.instagram.com/sarkaracoffee.bali/`}>
                <button
                  type="button"
                  className="rounded-md bg-sarkara-sign-1 px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-sarkara-sign-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-2 flex flex-row gap-2"
                >
                  <Instagram />
                  <p>Follow</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {selectedPromo && (
        <Modal
          isVisible={promoModalVisible}
          onClose={() => setPromoModalVisible(false)}
          product={selectedPromo}
        />
      )}
      <Footer />
    </div>
  );
}
