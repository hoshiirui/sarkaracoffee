"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Clock } from "lucide-react";
import { ClockIcon } from "@heroicons/react/24/solid";
import { formatToIDR } from "@/helper/idrFormatter";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Promo, PromoWithMenu } from "@/types/Promo";
import Image from "next/image";

export default function Modal({
  isVisible,
  onClose,
  product,
}: {
  isVisible: boolean;
  onClose: () => void;
  product: PromoWithMenu;
}) {
  const [caraP, setCaraP] = useState(false);
  const [syarat, setSyarat] = useState(false);
  const [menuB, setMenuB] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // setSyarat(false);
    // setMenuB(false);
    // setCaraP(false);
  };

  return (
    <Dialog
      open={isVisible}
      onClose={() => {
        onClose();
        // setSyarat(false);
        // setMenuB(false);
        // setCaraP(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  // setSyarat(false);
                  // setMenuB(false);
                  // setCaraP(false);
                }}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <Image
                  alt={`diskon`}
                  width={182}
                  height={272}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/promoimages_v//${product.imageHref}`}
                  className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-3xl leading-10 font-bold text-gray-900 sm:pr-12">
                    {product.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-900 text-justify mt-4">
                    {product.description}
                  </p>
                  <section
                    aria-labelledby="category-heading"
                    className="mt-4 grid grid-cols-2 py-2 px-4 rounded-xl bg-gray-100"
                  >
                    <div className="col-span-1 flex flex-row justify-center items-center gap-2">
                      <ClockIcon width={30} color="#460000" />
                      <div className="py-2 flex flex-col">
                        <p className="text-md text-gray-500 font-bold">
                          Masa Berlaku:
                        </p>

                        <p className="text-sm text-sarkara-sign font-bold">
                          {product.date}
                        </p>
                      </div>
                    </div>
                    <div className=" col-span-1 flex flex-row justify-center items-center gap-2">
                      <CurrencyDollarIcon width={30} color="#460000" />
                      <div className="py-2 flex flex-col">
                        <p className="text-md text-gray-500 font-bold">
                          Min. Transaksi
                        </p>

                        <p className="text-sm text-sarkara-sign font-bold">
                          {product.minTrans
                            ? formatToIDR(product.minTrans)
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section
                    aria-labelledby="syarat-dan-ketentuan"
                    className="mt-6"
                  >
                    {/* Cara penggunaan */}
                    <div className="py-4 border-t">
                      <div className="flex flex-row justify-between items-center">
                        <p className="text-lg text-sarkara-sign font-bold">
                          Cara Penggunaan
                        </p>
                        {caraP ? (
                          <ChevronDownIcon
                            className="text-sarkara-sign cursor-pointer"
                            width={24}
                            onClick={() => setCaraP(!caraP)}
                          />
                        ) : (
                          <ChevronRightIcon
                            className="text-sarkara-sign cursor-pointer"
                            width={24}
                            onClick={() => setCaraP(!caraP)}
                          />
                        )}
                      </div>
                      <div
                        className={`transition-opacity duration-300 ease-in-out ${
                          caraP ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {caraP && (
                          <p className="text-sm font-medium text-gray-900 text-justify mt-2">
                            {product.caraP
                              ? product.caraP
                              : "Tunjukkan promo ini ke staff Sarkara Coffee untuk mendapatkan maanfaatnya"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="py-4 border-t">
                      <div className="flex flex-row justify-between items-center">
                        <p className="text-lg text-sarkara-sign font-bold">
                          Syarat & Ketentuan
                        </p>
                        <div className="transition-transform duration-300 ease-in-out">
                          {syarat ? (
                            <ChevronDownIcon
                              className="text-sarkara-sign cursor-pointer"
                              width={24}
                              onClick={() => setSyarat(!syarat)}
                            />
                          ) : (
                            <ChevronRightIcon
                              className="text-sarkara-sign cursor-pointer"
                              width={24}
                              onClick={() => setSyarat(!syarat)}
                            />
                          )}
                        </div>
                      </div>

                      <div
                        className={`transition-opacity duration-300 ease-in-out ${
                          syarat ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {syarat && (
                          <ol className="list-decimal list-inside text-sm font-medium text-gray-900 text-justify mt-2">
                            {product.syaratK ? (
                              <li>{product.syaratK}</li>
                            ) : (
                              <>
                                <li>Promo hanya bisa ditukarkan sekali</li>
                                <li>
                                  Promo hanya berlaku pada produk yang berlaku
                                </li>
                                <li>
                                  Promo hanya berlaku untuk jangka waktu yang
                                  ditentukan
                                </li>
                                <li>
                                  Promo tidak dapat digabung dengan promo
                                  lainnya
                                </li>
                                <li>Promo tidak berlaku kelipatan</li>
                              </>
                            )}
                          </ol>
                        )}
                      </div>
                    </div>
                    <div className="py-4 border-t border-b">
                      <div className="flex flex-row justify-between items-center">
                        <p className="text-lg text-sarkara-sign font-bold">
                          Menu Berlaku
                        </p>
                        {menuB ? (
                          <ChevronDownIcon
                            className="text-sarkara-sign cursor-pointer"
                            width={24}
                            onClick={() => setMenuB(!menuB)}
                          />
                        ) : (
                          <ChevronRightIcon
                            className="text-sarkara-sign cursor-pointer"
                            width={24}
                            onClick={() => setMenuB(!menuB)}
                          />
                        )}
                      </div>
                      <div
                        className={`transition-opacity duration-300 ease-in-out ${
                          menuB ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {menuB && (
                          <p className="text-sm font-medium text-gray-900 text-justify mt-2">
                            {product.menuBerlaku
                              ? product.menuBerlaku.map((menu, index) => (
                                  <span key={menu.id}>
                                    {menu.name}
                                    {index <
                                      (product.menuB
                                        ? product.menuB.length
                                        : 0) -
                                        1 && ", "}
                                  </span>
                                ))
                              : "Semua menu selama syarat promo terpenuhi"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Sizes */}
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
