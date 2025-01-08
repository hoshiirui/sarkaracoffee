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
                <img
                  alt={`diskon`}
                  src={`images/products/${product.menuType}/${product.imageSrc}`}
                  className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-3xl leading-10 font-bold text-gray-900 sm:pr-12">
                    {product.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-900 text-justify mt-4">
                    {product.productDetail}
                  </p>
                  <p className="text-sm font-medium text-gray-900 text-justify mt-4">
                    {product.price}
                  </p>

                  <section
                    aria-labelledby="syarat-dan-ketentuan"
                    className="mt-6"
                  >
                    {/* Cara penggunaan */}

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
