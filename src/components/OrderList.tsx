"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastError, ToastSuccess } from "@/helper/Toast";
import { formatToIDR } from "@/helper/idrFormatter";
import { createClient } from "@/helper/supabase/client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { PromoWithMenu } from "@/types/Promo";

interface order {
  idproduk: number;
  namaproduk: string;
  harga: number;
  imagehref: string;
  jumlah: number;
  varian: string;
  penyajian: string;
  tipemenu: string;
  discounted: string;
}

export default function OrderList({
  isVisible,
  onClose,
  promoAvailable,
}: {
  isVisible: boolean;
  onClose: () => void;
  promoAvailable: PromoWithMenu[];
}) {
  const [orderList, setOrderList] = useState<order[]>();
  const [isCheckout, setIsCheckout] = useState(false);
  const [formDescription, setFormDescription] = useState("");
  const [formName, setFormName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResetOrder, setIsResetOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const initialPromoTerpilih = () => {
    const promoExists = hasLocalStorageItem("promoTerpilih");
    if (promoExists) {
      console.log("Promo: ", localStorage.getItem("promoTerpilih"));
      return localStorage.getItem("promoTerpilih");
    } else {
      return "";
    }
  };

  const [promoTerpilih, setPromoTerpilih] = useState<any>(initialPromoTerpilih);

  const pricePromoSync = (idPromo: string) => {
    const choosenPromo = promoAvailable.find((promo) => promo.id === idPromo);

    const menuExist = hasLocalStorageItem("order");

    if (menuExist && choosenPromo) {
      const retrievedJson = localStorage.getItem("order");

      if (retrievedJson) {
        const existingOrder = JSON.parse(retrievedJson);
        console.log(choosenPromo);
        console.log(existingOrder);

        const updatedOrder = existingOrder.map((item: order) => {
          if (
            choosenPromo.menuB &&
            choosenPromo.menuB.includes(item.idproduk.toString())
          ) {
            console.log(item);
            return { ...item, harga: 1000, discounted: "yes" };
          }
          console.log(item.idproduk);
          return item;
        });

        localStorage.setItem("order", JSON.stringify(updatedOrder));
      }
    }
  };

  function hasLocalStorageItem(key: string) {
    return localStorage.getItem(key) !== null;
  }

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    handleLoadProduct();
    console.log(orderList);
  }, [isVisible, promoTerpilih]);

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

  const handleCreate = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const dataInsert = {
        nama: formName,
        status: "unpaid",
        idvoucher: "",
        catatan: formDescription,
      };
      const dataForHistory = {
        nama: formName,
        status: "unpaid",
        idvoucher: "",
        catatan: formDescription,
        orders: orderList,
      };
      const { data, error } = await supabase
        .from("orderheader")
        .upsert(dataInsert)
        .select();

      console.log(data);

      if (orderList && data != null) {
        const updatedOrderList = orderList.map((item) => ({
          ...item,
          idheader: data[0].id,
        }));

        await supabase.from("orderdetail").upsert(updatedOrderList);

        if (hasLocalStorageItem("orderHistory")) {
          const retrievedHistory = localStorage.getItem("orderHistory");
          if (retrievedHistory) {
            const parsedHistory = JSON.parse(retrievedHistory);
            parsedHistory.push(dataForHistory);
            localStorage.setItem("orderHistory", JSON.stringify(parsedHistory));
          }
        } else {
          localStorage.setItem(
            "orderHistory",
            JSON.stringify([dataForHistory])
          );
        }

        localStorage.removeItem("order");
        ToastSuccess("Berhasil membuat pesanan!");
        setIsLoading(false);
        setIsCheckout(false);
        setIsSuccess(true);
        setOrderList([]);
        setFormDescription("");
        setFormName("");
        onClose();
      } else {
        ToastError("Gagal membuat pesanan");
      }

      // router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
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
                      <div className="flex flex-row gap-4">
                        <DialogTitle className="text-lg font-bold text-gray-900">
                          Daftar Pesanan
                        </DialogTitle>
                        <button
                          className="p-2 rounded-lg text-white bg-red-500"
                          type="button"
                          onClick={() => setIsResetOrder(true)}
                        >
                          <ArrowPathIcon width={12} height={12} />
                        </button>
                      </div>
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
                            {orderList.map((product, index: number) => (
                              <li key={index} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.namaproduk}
                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menuimages//${product.imagehref}`}
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
                    <div className=" text-base font-medium text-gray-900">
                      <p>Pilih Promo</p>
                    </div>
                    <select
                      name="role"
                      value={promoTerpilih}
                      onChange={(e) => {
                        setPromoTerpilih(e.target.value);
                        localStorage.setItem("promoTerpilih", e.target.value);
                        pricePromoSync(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-20 mb-4 mt-0.5 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-1 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected
                          ? "dark:border-form-strokedark dark:text-white"
                          : ""
                      }`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Tidak Ada
                      </option>
                      {promoAvailable.map((promo) => (
                        <option
                          value={promo.id}
                          className="text-body dark:text-bodydark"
                          key={promo.id}
                        >
                          {promo.title}
                        </option>
                      ))}
                    </select>

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
                        disabled={
                          orderList
                            ? orderList.length == 0
                              ? true
                              : false
                            : true
                        }
                        type="button"
                        onClick={() => setIsCheckout(true)}
                        className="w-full rounded-md border border-transparent bg-sarkara-sign-1 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sarkara-sign disabled:bg-gray-400"
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
                          {orderList.map((product, index: number) => (
                            <li key={index} className="flex mb-1">
                              <div className="flex flex-1 items-start justify-between text-sm">
                                <div className="flex flex-col">
                                  <p className="text-xs text-gray-700 capitalize">
                                    {product.namaproduk}{" "}
                                    {product.penyajian === "dingin"
                                      ? "(Ice)"
                                      : product.penyajian === "panas"
                                      ? "(Hot)"
                                      : null}
                                  </p>
                                  <p className="text-xs mb-1 text-gray-400">
                                    {" (" +
                                      product.jumlah +
                                      " x " +
                                      formatToIDR(product.harga) +
                                      ")"}
                                  </p>
                                </div>

                                <p className="ml-4 text-xs">
                                  {formatToIDR(product.harga * product.jumlah)}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-300 pt-4 mt-4">
                        <p className="text-xs font-bold">Subtotal</p>
                        <p className="text-xs">
                          {orderList
                            ? formatToIDR(
                                orderList.reduce((total, item) => {
                                  return total + item.harga * item.jumlah;
                                }, 0)
                              )
                            : formatToIDR(0)}
                        </p>
                      </div>
                      <div className="flex justify-between text-base text-gray-400 mt-2">
                        <p className="text-xs">PPN (12% * 11/12)</p>
                        <p className="text-xs">
                          {orderList
                            ? formatToIDR(
                                0.11 *
                                  orderList.reduce((total, item) => {
                                    return total + item.harga * item.jumlah;
                                  }, 0)
                              )
                            : formatToIDR(0)}
                        </p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-300 pt-4 mt-4">
                        <p className="text-xs font-bold">Grand Total</p>
                        <p className="text-xs font-bold">
                          {orderList
                            ? formatToIDR(
                                0.11 *
                                  orderList.reduce((total, item) => {
                                    return total + item.harga * item.jumlah;
                                  }, 0) +
                                  orderList.reduce((total, item) => {
                                    return total + item.harga * item.jumlah;
                                  }, 0)
                              )
                            : formatToIDR(0)}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-full lg:col-span-3">
                      <div className="mt-2">
                        <label
                          htmlFor="formName"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Nama Pelanggan (
                          <span className="text-red-600">*</span>)
                        </label>
                        <div className="mt-2">
                          <input
                            id="formName"
                            name="formName"
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={formName}
                            onChange={(e) => {
                              setFormName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="note"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Catatan
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="note"
                            name="note"
                            rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                          />
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">
                          Kasi catatan untuk menu yang kamu pesan.
                        </p>
                      </div>
                      <section
                        aria-labelledby="order confirmation"
                        className="mt-6"
                      >
                        <button
                          disabled={formName === "" ? true : false || isLoading}
                          className={`bg-sarkara-sign-1 w-full py-3 rounded-lg text-white font-bold disabled:bg-gray-400`}
                          onClick={() => handleCreate()}
                        >
                          Konfirmasi Pesanan
                        </button>
                        {/* Sizes */}
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* success dialog */}
      <Dialog
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <CheckBadgeIcon
                      aria-hidden="true"
                      className="size-6 text-green-500"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Pesanan Berhasil Dibuat!
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Silahkan pergi ke kasir untuk menyelesaikan pembayaran
                        dan mengambil pesanan!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Oke, Siap!
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* reset order dialog */}
      <Dialog
        open={isResetOrder}
        onClose={() => setIsResetOrder(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Hapus Semua Pesanan
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus semua pesanan? Aksi
                        ini tidak dapat dipulihkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetOrder(false);
                    setOrderList([]);
                    localStorage.removeItem("order");
                    // onClose();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Yakin!
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setIsResetOrder(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Batalkan
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
