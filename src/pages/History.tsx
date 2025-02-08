"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Header from "@/components/Header";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "@/helper/Toast";
import { formatToIDR } from "@/helper/idrFormatter";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface OrderHeader {
  id: string;
  nama: string;
  status: string;
  idvoucher: string;
  catatan: string;
  orders: OrderContent[];
  created_at: string;
}

interface OrderContent {
  idproduk: number;
  namaproduk: string;
  harga: number;
  imagehref: string;
  jumlah: number;
  varian: string;
  penyajian: string;
  tipemenu: string;
  discounted: boolean;
  discounted_price: number | null;
}

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState<OrderHeader[]>([]);
  const [isDeleteHistory, setIsDeleteHistory] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderHeader>();

  function hasLocalStorageItem(key: string) {
    return localStorage.getItem(key) !== null;
  }

  const fetchData = () => {
    setIsLoading(true);
    const checkHistory = hasLocalStorageItem("orderHistory");

    if (checkHistory) {
      const retrievedJson = localStorage.getItem("orderHistory");

      if (retrievedJson) {
        const existingOrder = JSON.parse(retrievedJson);

        setOrderList(existingOrder);
        console.log(existingOrder);
        setIsLoading(false);
      } else {
        ToastError("Gagal mendapatkan riwayat pesanan!");
      }
    } else {
      console.log("kosong produk");
      setOrderList([]);
    }
  };

  const handleDeleteHistory = () => {
    if (orderList && selectedOrder) {
      const updatedOrder = orderList.filter(
        (item) => item.id !== selectedOrder.id
      );
      setOrderList(updatedOrder);
      localStorage.setItem("orderHistory", JSON.stringify(updatedOrder));
      ToastSuccess("Berhasil menghapus riwayat pesanan!");
      fetchData();
    } else {
      ToastError("Gagal menghapus riwayat pesanan!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header active="Riwayat" />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-24">
          <div className="flex items-center justify-center flex-col mb-8 lg:mb-12 gap-3">
            <p className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mt-2">
              Riwayat Pesanan
            </p>
            <p className="mt-2 text-lg/8 text-gray-500">
              Berikut merupakan riwayat pesanan Anda di Sarkara Coffee
            </p>
          </div>
          <div className="max-w-full overflow-x-auto">
            {/* {!isAdd && (
            <div className="mb-4 flex flex-row items-center justify-end">
              <button
                className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                onClick={() => setIsAdd(true)}
              >
                Tambah Pengguna
              </button>
            </div>
          )} */}

            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    ID Pesanan
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Tanggal Dibuat
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Total
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              {!isLoading ? (
                <tbody>
                  {orderList.map((order, key) => {
                    const timestampObj = new Date(order.created_at);

                    const date = timestampObj.toLocaleDateString(); // Example: "1/23/2025"
                    const time24Hour = timestampObj
                      .toTimeString()
                      .split(" ")[0]; // Extract time without AM/PM

                    return (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-bold text-lg text-black dark:text-white">
                            {order.nama}
                          </h5>
                          <p className="text-sm">ID: {order.id}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-semibold text-lg text-black dark:text-white">
                            {date}
                          </h5>
                          <p className="text-sm">at {time24Hour}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-bold capitalize bg-sarkara-sign-1 text-white`}
                          >
                            {formatToIDR(
                              order.orders.reduce((total, item) => {
                                return (
                                  total +
                                  (item.discounted_price
                                    ? item.discounted_price
                                    : item.harga) *
                                    item.jumlah
                                );
                              }, 0)
                            )}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Link
                              className="flex flex-col items-center justify-center"
                              href={`order/details?id=${order.id}`}
                            >
                              <button className="hover:text-sarkara-sign">
                                <svg
                                  className="fill-current"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                    fill=""
                                  />
                                  <path
                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                    fill=""
                                  />
                                </svg>
                              </button>
                            </Link>
                            {order.status === "paid" ? null : (
                              <button
                                className="hover:text-sarkara-sign"
                                onClick={() => {
                                  setIsDeleteHistory(true);
                                  setSelectedOrder(order);
                                }}
                              >
                                <svg
                                  className="fill-current"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                    fill=""
                                  />
                                  <path
                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                    fill=""
                                  />
                                  <path
                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                    fill=""
                                  />
                                  <path
                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                    fill=""
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}
            </table>
          </div>
        </main>
        <Footer />
      </div>
      {/* reset order dialog */}
      <Dialog
        open={isDeleteHistory}
        onClose={() => setIsDeleteHistory(false)}
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
                      Hapus Riwayat Pesanan {selectedOrder?.nama}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus riwayat pesanan? Aksi
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
                    setIsDeleteHistory(false);
                    handleDeleteHistory();
                    // onClose();
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Yakin!
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setIsDeleteHistory(false)}
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
