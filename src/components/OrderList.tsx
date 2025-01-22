"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToastError, ToastSuccess } from "@/helper/Toast";
import { formatToIDR } from "@/helper/idrFormatter";

interface order {
  idproduk: number;
  namaproduk: string;
  harga: number;
  imagehref: string;
  jumlah: number;
  varian: string;
  penyajian: string;
  tipemenu: string;
}

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function OrderList({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [orderList, setOrderList] = useState<order[]>();
  const [isCheckout, setIsCheckout] = useState(false);

  function hasLocalStorageItem(key: string) {
    return localStorage.getItem(key) !== null;
  }

  useEffect(() => {
    handleLoadProduct();
    console.log(orderList);
  }, [isVisible]);

  const deleteMenu = (
    idmenu: number,
    varianmenu: string,
    penyajianmenu: string
  ) => {
    if (orderList) {
      const updatedOrder = orderList.filter((item) => item.idproduk !== idmenu);
      setOrderList(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder));

      ToastSuccess("Berhasil menghapus menu!");
    } else {
      ToastError("Gagal menghapus menu!");
    }
  };

  const handleLoadProduct = () => {
    const orderExists = hasLocalStorageItem("order");

    if (orderExists) {
      const retrievedJson = localStorage.getItem("order");

      if (retrievedJson) {
        const existingOrder = JSON.parse(retrievedJson);

        setOrderList(existingOrder);
      } else {
        ToastError("Gagal mendapatkan list menu!");
      }
    } else {
      console.log("kosong produk");
      setOrderList([]);
    }
  };

  return (
    <>
      {/* dialog 1 for orderlist */}
      <Dialog
        open={isVisible}
        onClose={() => {
          onClose();
        }}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-bold text-gray-900">
                        Daftar Pesanan
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => onClose()}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {!orderList ||
                        orderList === null ||
                        orderList?.length === 0 ? (
                          <p>Belum ada order apapun</p>
                        ) : (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {orderList.map((product) => (
                              <li key={product.idproduk} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.namaproduk}
                                    src={`images/products/${product.tipemenu}/${product.imagehref}`}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.namaproduk}</h3>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteMenu(
                                            product.idproduk,
                                            product.varian,
                                            product.penyajian
                                          )
                                        }
                                        className="font-medium text-sarkara-sign-1 hover:text-sarkara-sign-2"
                                      >
                                        Hapus
                                      </button>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 capitalize">
                                      {formatToIDR(product.harga) +
                                        " - " +
                                        product.penyajian}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.jumlah}
                                    </p>

                                    <div className="flex">
                                      <p className="ml-4 font-bold">
                                        {"Total: " +
                                          formatToIDR(
                                            product.harga * product.jumlah
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      {orderList
                        ? formatToIDR(
                            orderList.reduce((total, item) => {
                              return total + item.harga * item.jumlah;
                            }, 0)
                          )
                        : formatToIDR(0)}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Subtotal belum termasuk pajak.
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setIsCheckout(true)}
                        className="w-full rounded-md border border-transparent bg-sarkara-sign-1 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sarkara-sign"
                      >
                        Pesan Sekarang!
                      </button>
                    </div>
                    {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div> */}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {/* dialog 2 for checkout */}
      <Dialog
        open={isCheckout}
        onClose={() => {
          setIsCheckout(false);
        }}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
          onClick={() => {
            setIsCheckout(false);
          }}
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
                    setIsCheckout(false);
                    // setSyarat(false);
                    // setMenuB(false);
                    // setCaraP(false);
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>

                <div className="w-full">
                  <p className="text-lg font-bold text-gray-900">
                    Konfirmasi Pesanan
                  </p>
                  <div className="mt-4 grid grid-cols-5 gap-8">
                    <div className="col-span-full lg:col-span-2 border rounded-xl border-sarkara-sign-2 mt-2 p-4">
                      <p>Invoice</p>
                      {!orderList ||
                      orderList === null ||
                      orderList?.length === 0 ? (
                        <p>Belum ada order apapun</p>
                      ) : (
                        <ul role="list" className="my-2">
                          {orderList.map((product) => (
                            <li key={product.idproduk} className="flex mb-1">
                              <div className="flex flex-1 items-start justify-between text-sm">
                                <div className="flex flex-col">
                                  <p className="text-xs text-gray-700 capitalize">
                                    {product.namaproduk}
                                  </p>
                                  <p className="text-xs mb-1 text-gray-400">
                                    {" (" +
                                      product.jumlah +
                                      " x " +
                                      formatToIDR(product.harga) +
                                      ")"}
                                  </p>
                                </div>

                                <p className="ml-4 font-bold text-xs">
                                  {formatToIDR(product.harga * product.jumlah)}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        {orderList
                          ? formatToIDR(
                              orderList.reduce((total, item) => {
                                return total + item.harga * item.jumlah;
                              }, 0)
                            )
                          : formatToIDR(0)}
                      </div>
                    </div>
                    <div className="col-span-full lg:col-span-3">
                      <div className="mt-2">
                        <label
                          htmlFor="about"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Nama Pelanggan
                        </label>
                        <div className="mt-2">
                          <input
                            id="about"
                            name="about"
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="about"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Catatan
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">
                          Kasi catatan untuk menu yang kamu pesan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
