"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <Header active="Hubungi Kami" />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-24">
        <div className="flex items-center justify-center flex-col mb-8 lg:mb-12 gap-3">
          <p className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mt-2">
            Hubungi Kami
          </p>
          <p className="mt-2 text-lg/8 text-gray-500">
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
          {/* form */}
          <div className="col-span-1 p-8 bg-white shadow-lg rounded-xl grid grid-cols-2 gap-4">
            {/* <p className="text-2xl font-bold text-sarkara-sign">
              Informasi Kontak
            </p>
            <p className="text-sm text-stone-400">
              Jika Anda mempunyai pertanyaan atau kekhawatiran, Anda dapat
              menghubungi kami di kontak yang tertera berikut:
            </p> */}
            <div className="col-span-full lg:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nama
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-sarkara-sign-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder=""
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-sarkara-sign-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="pesan"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Pesan
              </label>
              <div className="mt-2">
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sarkara-sign-1 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Tulis beberapa kalimat pesan untuk kami.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6 col-span-full">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Kosongkan
              </button>
              <button
                type="submit"
                className="rounded-md bg-sarkara-sign px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sarkara-sign-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-1"
              >
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mb-8 mt-24 lg:mb-12 gap-3">
          <p className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mt-2">
            Lokasi Kami
          </p>
          <p className="mt-2 text-lg/8 text-gray-500">
            Temukan dan kunjungi kami di lokasi berikut!
          </p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0304863479355!2d115.10305621178152!3d-8.098373291896715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd191824698fe51%3A0x4237ae78fcb5b09f!2sSarkara%20Coffee%20Bali!5e0!3m2!1sen!2sid!4v1736037048969!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
}
