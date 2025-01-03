"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import { formatToIDR } from "@/helper/idrFormatter";
import Image from "next/image";

// const sortOptions = [
//   { name: "Rekomendasi", href: "#", current: true },
//   { name: "A - Z", href: "#", current: false },
//   { name: "Z - A", href: "#", current: false },
//   { name: "Termurah", href: "#", current: false },
//   { name: "Termahal", href: "#", current: false },
// ];
// const subCategories = [
//   { name: "Sarkara Signature", href: "#" },
//   { name: "", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];

const filters = [
  {
    id: "kategori",
    name: "Kategori",
    options: [
      { value: "signature", label: "Sarkara Signature", checked: false },
      { value: "espresso", label: "Base Espresso", checked: false },
      { value: "coffee", label: "Coffee", checked: true },
      { value: "non-coffee", label: "Non Coffee", checked: false },
      { value: "others", label: "Tea & Squash & Others", checked: false },
      { value: "food", label: "Food & Snacks", checked: false },
    ],
  },
  {
    id: "varian",
    name: "Varian",
    options: [
      { value: "new", label: "Menu Baru", checked: false },
      { value: "hot", label: "Hot / Panas", checked: false },
      { value: "ice", label: "Ice / Dingin", checked: true },
    ],
  },
  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "2l", label: "2L", checked: false },
  //     { value: "6l", label: "6L", checked: false },
  //     { value: "12l", label: "12L", checked: false },
  //     { value: "18l", label: "18L", checked: false },
  //     { value: "20l", label: "20L", checked: false },
  //     { value: "40l", label: "40L", checked: true },
  //   ],
  // },
];

const sarkaraProducts = [
  {
    id: 1,
    name: "Sarkara Original Coffee",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 10,
    categories: ["signature", "ice"],
  },
  {
    id: 2,
    name: "Sarkara Speciality Mocktail",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 18000,
    recPrior: 10,
    categories: ["signature", "ice"],
  },
  {
    id: 3,
    name: "Espresso Single",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 10,
    categories: ["espresso", "hot"],
  },
  {
    id: 4,
    name: "Espresso Double",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 12000,
    recPrior: 6,
    categories: ["espresso", "hot"],
  },
  {
    id: 5,
    name: "Americano",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["espresso", "hot", "ice"],
  },
  {
    id: 6,
    name: "Kopi Susu",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["coffee", "hot", "ice"],
  },
  {
    id: 7,
    name: "Latte",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["coffee", "hot", "ice"],
  },
  {
    id: 8,
    name: "Latte + Syrup",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 20000,
    recPrior: 7,
    categories: ["coffee", "hot", "ice"],
  },
  {
    id: 9,
    name: "Cappucino",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 17000,
    recPrior: 6,
    categories: ["coffee", "hot", "ice"],
  },
  {
    id: 10,
    name: "Mochacino",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 17000,
    recPrior: 6,
    categories: ["coffee", "hot", "ice"],
  },
  {
    id: 11,
    name: "Matcha Coffee Milk",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 20000,
    recPrior: 6,
    categories: ["coffee", "ice"],
  },
  {
    id: 12,
    name: "Redvelvet Coffee Milk",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 20000,
    recPrior: 6,
    categories: ["coffee", "ice"],
  },
  {
    id: 13,
    name: "Oreo Coffee Milk",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 20000,
    recPrior: 6,
    categories: ["coffee", "ice"],
  },
  {
    id: 14,
    name: "Matcha Latte",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "hot", "ice"],
  },
  {
    id: 15,
    name: "Redvelvet Latte",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "hot", "ice"],
  },
  {
    id: 16,
    name: "Taro Latte",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "hot", "ice"],
  },
  {
    id: 17,
    name: "Chocolatte",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "hot", "ice"],
  },
  {
    id: 18,
    name: "Vanilla Milk Original",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["non-coffee", "hot", "ice"],
  },
  {
    id: 19,
    name: "Vanilla Caramel",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "ice"],
  },
  {
    id: 20,
    name: "Vanilla Hazelnut",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "ice"],
  },
  {
    id: 21,
    name: "Vanilla Oreo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 16000,
    recPrior: 6,
    categories: ["non-coffee", "ice"],
  },
  {
    id: 22,
    name: "Choco Hazelnut",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 18000,
    recPrior: 6,
    categories: ["non-coffee", "ice"],
  },
  {
    id: 23,
    name: "Choco Oreo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 18000,
    recPrior: 6,
    categories: ["non-coffee", "ice"],
  },
  {
    id: 24,
    name: "Tea",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 6000,
    recPrior: 6,
    categories: ["others", "hot", "ice"],
  },
  {
    id: 25,
    name: "Leci Tea",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["others", "hot", "ice"],
  },
  {
    id: 26,
    name: "Lemon Tea",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["others", "hot", "ice"],
  },
  {
    id: 27,
    name: "Strawberry Tea",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["others", "hot", "ice"],
  },
  {
    id: 28,
    name: "Virgin Squash",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["others", "ice"],
  },
  {
    id: 29,
    name: "Strawberry Squash",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["others", "ice"],
  },
  {
    id: 30,
    name: "Lemon Squash",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["others", "ice"],
  },
  {
    id: 31,
    name: "Leci Squash",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["others", "ice"],
  },
  {
    id: 32,
    name: "Mineral Water",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 5000,
    recPrior: 6,
    categories: ["others", "hot", "ice"],
  },
  {
    id: 33,
    name: "Nasi Goreng",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 15000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 34,
    name: "Mie Instan Goreng Lengkap",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 12000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 35,
    name: "Mie Instan Kuah Lengkap",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 12000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 36,
    name: "Nasi Putih",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 5000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 37,
    name: "Telur",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 5000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 38,
    name: "Kentang Goreng",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 39,
    name: "Roti Panggang",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["food"],
  },
  {
    id: 40,
    name: "Pisang Goreng",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: 10000,
    recPrior: 6,
    categories: ["food"],
    variants: [
      {
        name: "coklat",
        add: 0,
      },
      {
        name: "keju",
        add: 0,
      },
      {
        name: "mix",
        add: 2000,
      },
    ],
  },
];

// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(" ");
// }

export default function SarkaraMenu() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [selectedProducts, setSelectedProducts] = useState(sarkaraProducts);
  const [filterArray, setFilterArray] = useState<string[]>([]);

  useEffect(() => {
    function filterProductsByActiveFilters(
      products: any,
      activeFilters: string[]
    ) {
      return products.filter((product: any) => {
        // Check if all active filters are present in the product's categories
        return activeFilters.every((filter) =>
          product.categories.includes(filter)
        );
      });
    }

    const updatedFilterArray = selectedFilters.reduce(
      (acc: any, filter: any) => {
        return [
          ...acc,
          ...filter.options
            .filter((option: any) => option.checked)
            .map((option: any) => option.value),
        ];
      },
      []
    );

    setFilterArray(updatedFilterArray);
    const filteredProducts = filterProductsByActiveFilters(
      sarkaraProducts,
      updatedFilterArray
    );

    setSelectedProducts(filteredProducts);
  }, [selectedFilters]);

  return (
    <div className="bg-white">
      <Header />
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul> */}

                {selectedFilters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  // defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() => {
                                    setSelectedFilters((prevFilters) =>
                                      prevFilters.map((filter) =>
                                        filter.id === section.id
                                          ? {
                                              ...filter,
                                              options: filter.options.map(
                                                (optionNow) =>
                                                  optionNow.value ===
                                                  option.value
                                                    ? {
                                                        ...optionNow,
                                                        checked:
                                                          !option.checked,
                                                      }
                                                    : optionNow
                                              ),
                                            }
                                          : filter
                                      )
                                    );
                                    console.log(filterArray);
                                  }}
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-sarkara-sign-1 checked:bg-sarkara-sign-1 indeterminate:border-sarkara-sign-1 indeterminate:bg-sarkara-sign-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-1 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Sarkara Menu
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                {/* <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems> */}
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {selectedFilters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  // defaultValue={option.value}
                                  checked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={() => {
                                    setSelectedFilters((prevFilters) =>
                                      prevFilters.map((filter) =>
                                        filter.id === section.id
                                          ? {
                                              ...filter,
                                              options: filter.options.map(
                                                (optionNow) =>
                                                  optionNow.value ===
                                                  option.value
                                                    ? {
                                                        ...optionNow,
                                                        checked:
                                                          !option.checked,
                                                      }
                                                    : optionNow
                                              ),
                                            }
                                          : filter
                                      )
                                    );
                                    console.log(selectedFilters);
                                    console.log(filterArray);
                                  }}
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-sarkara-sign-1 checked:bg-sarkara-sign-1 indeterminate:border-sarkara-sign-1 indeterminate:bg-sarkara-sign-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sarkara-sign-1 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <Image
                        alt={product.name}
                        src={product.imageSrc}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                      />
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-md font-bold text-sarkara-sign-1">
                            <a
                              href={
                                "menu/" +
                                product.name.toLowerCase().replace(/\s+/g, "-")
                              }
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {product.categories[0]}
                          </p>
                        </div>
                        <p className="text-md md:text-sm font-medium text-sarkara-sign">
                          {formatToIDR(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
