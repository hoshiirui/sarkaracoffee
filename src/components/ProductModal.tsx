"use client";

import { useEffect, useState } from "react";
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
import { Circle, CircleDot, Clock, FlameIcon, Snowflake } from "lucide-react";
import { ClockIcon } from "@heroicons/react/24/solid";
import { formatToIDR } from "@/helper/idrFormatter";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { MenuSarkara } from "@/types/MenuSarkara";

export default function ProductModal({
  isVisible,
  onClose,
  product,
}: {
  isVisible: boolean;
  onClose: () => void;
  product: MenuSarkara;
}) {
  const [pilihanSelected, setPilihanSelected] = useState("");
  const [variantChoice, setVariantChoice] = useState("");
  const [priceAdd, setPriceAdd] = useState(0);

  useEffect(() => {
    setPilihanSelected(
      product.categories.length === 0
        ? "none"
        : product.categories.includes("ice")
        ? "dingin"
        : "panas"
    );
    if (product.variants) {
      setVariantChoice(product.variants[0].name);
    }
    setPriceAdd(0);
  }, [isVisible]);

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
                <img
                  alt={`diskon`}
                  src={`images/products/${product.menuType}/${product.imageSrc}`}
                  className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7 flex flex-col justify-between h-full">
                  <div className="">
                    <h2 className="text-3xl leading-10 font-bold text-gray-900 sm:pr-12">
                      {product.name}
                    </h2>
                    <p className="text-sm font-medium text-gray-900 text-justify mt-4">
                      {product.productDetail}
                    </p>
                    <section className="border-b-4 border-stone-100 pb-5">
                      <p className="text-md font-bold text-sarkara-sign-1 text-justify mt-4">
                        Harga:
                      </p>
                      <p className="text-lg font-medium text-gray-900 text-justify mt-1">
                        {formatToIDR(product.price)}
                      </p>
                    </section>
                    {pilihanSelected === "dingin" ||
                    pilihanSelected === "panas" ? (
                      <section>
                        <p className="text-md font-bold text-sarkara-sign-1 text-justify mt-4">
                          Pilihan Tersedia
                        </p>
                        <div className="flex flex-row gap-3 mt-3">
                          <div
                            onClick={() => setPilihanSelected("dingin")}
                            className={`flex flex-col rounded-lg border-2 cursor-pointer ${
                              pilihanSelected === "dingin"
                                ? "border-sarkara-sign-2 bg-sarkara-sign-4"
                                : "border-stone-200 bg-white"
                            } items-center px-4 py-2 min-w-lg `}
                          >
                            <Snowflake
                              className={`${
                                pilihanSelected === "dingin"
                                  ? "text-sarkara-sign-1"
                                  : "text-stone-300"
                              }`}
                            />
                            <p
                              className={`font-bold ${
                                pilihanSelected === "dingin"
                                  ? "text-sarkara-sign-1"
                                  : "text-stone-500"
                              } mt-1`}
                            >
                              Dingin
                            </p>
                            <p className="text-xs">Cold</p>
                          </div>
                          <div
                            onClick={() => setPilihanSelected("panas")}
                            className={`flex flex-col rounded-lg border-2 cursor-pointer ${
                              pilihanSelected === "panas"
                                ? "border-sarkara-sign-2 bg-sarkara-sign-4"
                                : "border-stone-200 bg-white"
                            } items-center px-4 py-2 min-w-lg `}
                          >
                            <FlameIcon
                              className={`${
                                pilihanSelected === "panas"
                                  ? "text-sarkara-sign-1"
                                  : "text-stone-300"
                              }`}
                            />
                            <p
                              className={`font-bold ${
                                pilihanSelected === "panas"
                                  ? "text-sarkara-sign-1"
                                  : "text-stone-500"
                              } mt-1`}
                            >
                              Panas
                            </p>
                            <p className="text-xs">Hot</p>
                          </div>
                        </div>
                      </section>
                    ) : null}

                    {product.variants && (
                      <section>
                        <p className="text-md font-bold text-sarkara-sign-1 text-justify mt-4">
                          Varian Tersedia
                        </p>

                        <div className="flex flex-col gap-2 mt-2">
                          {product.variants.map((variant: any) => (
                            <div
                              onClick={() => {
                                setVariantChoice(variant.name);
                                setPriceAdd(variant.add);
                              }}
                              className="flex flex-row justify-between items-center capitalize cursor-pointer"
                              key={variant.name}
                            >
                              <p className="text-sm">{variant.name}</p>
                              <div className="flex flex-row gap-2 items-center">
                                <p className="text-sm">
                                  + {formatToIDR(variant.add)}
                                </p>
                                {variant.name === variantChoice ? (
                                  <CircleDot className="w-5" />
                                ) : (
                                  <Circle className="w-5" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                  <section
                    aria-labelledby="syarat-dan-ketentuan"
                    className="mt-6"
                  >
                    {/* Cara penggunaan */}
                    <button className="bg-sarkara-sign-1 w-full py-3 rounded-full text-white font-bold">
                      Harga Total ・ {formatToIDR(product.price + priceAdd)}
                    </button>
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
