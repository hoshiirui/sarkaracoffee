"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-24">
        <div className="flex items-center justify-center flex-col mb-8 lg:mb-12 gap-3">
          <p className="text-3xl text-sarkara-sign font-bold">Hubungi Kami</p>
          <p className="text-slate-400 text-sm">
            Ada kritik atau saran? Langsung hubungi kami melalui kontak di
            bawah!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1 p-8 bg-white shadow-lg rounded-xl flex gap-4 flex-col">
            <p className="text-2xl font-bold text-sarkara-sign">
              Informasi Kontak
            </p>
            <p className="text-sm text-stone-400">
              Jika Anda mempunyai pertanyaan atau kekhawatiran, Anda dapat
              menghubungi kami di kontak yang tertera berikut:
            </p>
            <Link
              href={`https://www.instagram.com/sarkaracoffee.bali/`}
              className=" mt-6"
            >
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="flex flex-row gap-2">
                  <PhoneIcon className="w-5 text-sarkara-sign-1" />
                  <div className="flex flex-row gap-2 hover:gap-6 transition-all duration-300 ease-in-out">
                    <p className="text-sarkara-sign uppercase font-bold">
                      Whatsapp
                    </p>
                    <Image
                      src={"icons/arrow-circle-right.svg"}
                      alt={"arrow-icon"}
                      width={"20"}
                      height={"20"}
                    ></Image>
                  </div>
                </div>
                <p className="text-sm text-stone-400">239847829357293</p>
              </div>
            </Link>
            <Link
              href={`https://www.instagram.com/sarkaracoffee.bali/`}
              className=" mt-2"
            >
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="flex flex-row gap-2">
                  <EnvelopeIcon className="w-5 text-sarkara-sign-1" />
                  <div className="flex flex-row gap-2 hover:gap-6 transition-all duration-300 ease-in-out">
                    <p className="text-sarkara-sign uppercase font-bold">
                      Email
                    </p>
                    <Image
                      src={"icons/arrow-circle-right.svg"}
                      alt={"arrow-icon"}
                      width={"20"}
                      height={"20"}
                    ></Image>
                  </div>
                </div>
                <p className="text-sm text-stone-400">
                  halo@sarkaracoffee.vercel.app
                </p>
              </div>
            </Link>
            <Link
              href={`https://www.instagram.com/sarkaracoffee.bali/`}
              className=" mt-2"
            >
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="flex flex-row gap-2">
                  <PhoneIcon className="w-5 text-sarkara-sign-1" />
                  <div className="flex flex-row gap-2 hover:gap-6 transition-all duration-300 ease-in-out">
                    <p className="text-sarkara-sign uppercase font-bold">
                      Instagram
                    </p>
                    <Image
                      src={"icons/arrow-circle-right.svg"}
                      alt={"arrow-icon"}
                      width={"20"}
                      height={"20"}
                    ></Image>
                  </div>
                </div>

                <p className="text-sm text-stone-400">@sarkaracoffee.bali</p>
              </div>
            </Link>
            {/* <button className="bg-white rounded-lg py-2 text-sarkara-sign-1 font-bold flex flex-row items-center gap-2 justify-center">
              <EnvelopeIcon className="w-5" />
              Email
            </button>
            <button className="bg-white rounded-lg py-2  text-sarkara-sign-1 font-bold flex flex-row items-center gap-2 justify-center">
              <EnvelopeIcon className="w-5" />
              Instagram
            </button> */}
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mb-8 mt-24 lg:mb-12 gap-3">
          <p className="text-3xl text-sarkara-sign font-bold">Lokasi Kami</p>
          <p className="text-slate-400 text-sm">
            Ada kritik atau saran? Langsung hubungi kami melalui kontak di
            bawah!
          </p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0304863479355!2d115.10305621178152!3d-8.098373291896715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd191824698fe51%3A0x4237ae78fcb5b09f!2sSarkara%20Coffee%20Bali!5e0!3m2!1sen!2sid!4v1736037048969!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
