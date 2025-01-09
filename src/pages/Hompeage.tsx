"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import { Instagram, InstagramIcon } from "lucide-react";
import { Promo } from "@/types/Promo";
import { useState } from "react";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import Link from "next/link";

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

export default function Homepage() {
  const [selectedPromo, setSelectedPromo] = useState<Promo>();
  const [promoModalVisible, setPromoModalVisible] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <Header active="Beranda" />

      {/* bagian hero */}
      <div className=" bg-[#F4F2EF]">
        <div className="grid-cols-2 grid gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
          <div className="lg:col-span-1 col-span-full flex flex-col justify-center items-center lg:items-start mt-16 lg:mt-0">
            <p className="text-sarkara-sign-1 font-bold text-7xl font-fraunces lg:text-left text-center">
              Great simple
              <br /> coffee
            </p>
            <p className="text-xl text-[#C2A487] mt-8 lg:text-left text-center max-w-lg lg:max-w-none">
              Di antara tegukan kopi dan tawa bersama teman, mimpi besar untuk
              masa depan tumbuh perlahan
            </p>
            <div className="mt-8 flex items-center justify-start gap-x-6">
              <button
                type="button"
                className="rounded-md bg-sarkara-sign-1 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sarkara-sign-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-2"
              >
                Lihat Menu
              </button>
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
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <Image
                className="w-[100%] h-[200px] object-cover rounded-xl"
                src={`/images/promo/${post.id}.jpg`}
                alt="discount"
                width={800}
                height={800}
              />
              <div className="flex items-center gap-x-4 text-xs mt-6">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-sarkara-sign-4 px-3 py-1.5 font-medium text-sarkara-sign-1 hover:bg-sarkara-sign-3"
                >
                  {post.category.title}
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
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center">
                  Menu Signature
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Kami memiliki menu khusus yang hanya tersedia di Sarkara yang
                  siap meninggalkan cita rasa tak terlupakan bagi lidah anda!
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center">
                  WiFi Gratis
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Kami memastikan pengunjung nyaman dengan adanya layanan WiFi
                  gratis dari kami.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center">
                  Lokasi Strategis
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Kami terletak di pinggir jalan raya sehingga mudah diakses
                  oleh pelanggan
                </p>
              </div>
              <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-cover"
                  src="/images/home/label.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center">
                  Harga Bersahabat
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Menu-menu kami memiliki cita rasa yang kuat namun dengan harga
                  yang hemat!
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">
                        App.jsx
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-14 pt-6">
                    {/* Your code example */}
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
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
              <button
                type="button"
                className="rounded-md bg-sarkara-sign-1 px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-sarkara-sign-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-2 flex flex-row gap-2"
              >
                <Instagram />
                <p>Follow</p>
              </button>
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
