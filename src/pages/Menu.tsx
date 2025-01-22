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
  MenuItem,
  MenuItems,
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
import Footer from "@/components/Footer";
import { MenuSarkara } from "@/types/MenuSarkara";
import ProductModal from "@/components/ProductModal";
import OrderList from "@/components/OrderList";

const sortOptions = [
  { name: "Kategori" },
  { name: "Rekomendasi" },
  { name: "Termurah" },
  { name: "Termahal" },
];
// const subCategories = [
//   { name: "Sarkara Signature", href: "#" },
//   { name: "", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];

const kategori = [
  { value: "signature", label: "Sarkara Signature" },
  { value: "espresso", label: "Base Espresso" },
  { value: "coffee", label: "Coffee" },
  { value: "non-coffee", label: "Non Coffee" },
  { value: "others", label: "Tea & Squash & Others" },
  { value: "food", label: "Food & Snacks" },
];

const filters = [
  {
    id: "varian",
    name: "Varian",
    options: [
      { value: "new", label: "Menu Baru", checked: false },
      { value: "hot", label: "Hot / Panas", checked: false },
      { value: "ice", label: "Ice / Dingin", checked: false },
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
    imageSrc: "original.jpg",
    price: 16000,
    recPrior: 10,
    menuType: "signature",
    categories: ["ice"],
    productDetail:
      "Kopi khas Sarkara dengan perpaduan rasa unik dan menyegarkan.",
  },
  {
    id: 2,
    name: "Sarkara Speciality Mocktail",
    imageSrc: "mocktail.jpg",
    price: 18000,
    recPrior: 10,
    menuType: "signature",
    categories: ["ice"],
    productDetail:
      "Minuman tanpa alkohol dengan kombinasi rasa istimewa dan menyegarkan.",
  },
  {
    id: 3,
    name: "Espresso Single",
    imageSrc: "single.webp",
    price: 10000,
    recPrior: 10,
    menuType: "espresso",
    categories: ["hot"],
    productDetail: "Espresso klasik dengan cita rasa kuat dan aroma khas kopi.",
  },
  {
    id: 4,
    name: "Espresso Double",
    imageSrc: "double.webp",
    price: 12000,
    recPrior: 6,
    menuType: "espresso",
    categories: ["hot"],
    productDetail: "Espresso ganda dengan intensitas rasa yang lebih kuat.",
  },
  {
    id: 5,
    name: "Americano",
    imageSrc: "americano.webp",
    price: 15000,
    recPrior: 6,
    menuType: "espresso",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso yang diencerkan dengan air panas atau dingin, cocok bagi pencinta kopi hitam.",
  },
  {
    id: 6,
    name: "Kopi Susu",
    imageSrc: "kopisusu.webp",
    price: 15000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Perpaduan kopi dengan susu, menghasilkan rasa yang lembut dan nikmat.",
  },
  {
    id: 7,
    name: "Latte",
    imageSrc: "latte.webp",
    price: 15000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso dengan susu kukus, menghasilkan rasa yang creamy dan lembut.",
  },
  {
    id: 8,
    name: "Latte + Syrup",
    imageSrc: "lattesyr.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Latte dengan tambahan sirup pilihan, memberikan variasi rasa yang menarik.",
  },
  {
    id: 9,
    name: "Cappucino",
    imageSrc: "cappucino.webp",
    price: 17000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso dengan susu kukus dan buih susu yang lembut, menghasilkan rasa yang kaya.",
  },
  {
    id: 10,
    name: "Mochacino",
    imageSrc: "mochaccino.jpg",
    price: 17000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Cappucino dengan tambahan cokelat, menghasilkan rasa yang manis dan nikmat.",
  },
  {
    id: 11,
    name: "Matcha Coffee Milk",
    imageSrc: "matchacoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail:
      "Perpaduan matcha dengan kopi dan susu, menghasilkan rasa unik dan menyegarkan.",
  },
  {
    id: 12,
    name: "Redvelvet Coffee Milk",
    imageSrc: "redvelvetcoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail: "Kopi dengan cita rasa red velvet yang lembut dan creamy.",
  },
  {
    id: 13,
    name: "Oreo Coffee Milk",
    imageSrc: "redvelvetcoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail:
      "Kopi dengan tambahan biskuit Oreo, menghadirkan rasa yang unik dan renyah.",
  },
  {
    id: 14,
    name: "Matcha Latte",
    imageSrc: "matchalatte.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Minuman hangat atau dingin dengan teh hijau matcha yang lembut dan menyegarkan.",
  },
  {
    id: 15,
    name: "Redvelvet Latte",
    imageSrc: "redvelvetlatte.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Latte dengan cita rasa red velvet yang lembut dan creamy.",
  },
  {
    id: 16,
    name: "Taro Latte",
    imageSrc: "tarolatte.webp",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Latte dengan rasa taro yang unik dan eksotis.",
  },
  {
    id: 17,
    name: "Chocolatte",
    imageSrc: "chocolatte.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Minuman cokelat hangat atau dingin yang kaya dan lembut.",
  },
  {
    id: 18,
    name: "Vanilla Milk Original",
    imageSrc: "vanillamilk.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Susu segar dengan aroma dan rasa vanilla yang lembut.",
  },
  {
    id: 19,
    name: "Vanilla Caramel",
    imageSrc: "vanillacaramel.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail:
      "Susu vanilla dengan tambahan saus karamel, menghasilkan rasa yang manis dan karamelis.",
  },
  {
    id: 20,
    name: "Vanilla Hazelnut",
    imageSrc: "vanillahazelnut.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Susu vanilla dengan aroma dan rasa hazelnut yang khas.",
  },
  {
    id: 21,
    name: "Vanilla Oreo",
    imageSrc: "vanillaoreo.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Susu vanilla dengan campuran biskuit Oreo yang renyah.",
  },
  {
    id: 22,
    name: "Choco Hazelnut",
    imageSrc: "chocohazelnut.jpg",
    price: 18000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Minuman cokelat dengan aroma dan rasa hazelnut yang khas.",
  },
  {
    id: 23,
    name: "Choco Oreo",
    imageSrc: "chocooreo.webp",
    price: 18000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Minuman cokelat dengan campuran biskuit Oreo yang renyah.",
  },
  {
    id: 24,
    name: "Tea",
    imageSrc: "tea.jpg",
    price: 6000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh panas atau dingin yang menyegarkan.",
  },
  {
    id: 25,
    name: "Leci Tea",
    imageSrc: "lycheetea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh dengan rasa leci yang manis dan menyegarkan.",
  },
  {
    id: 26,
    name: "Lemon Tea",
    imageSrc: "lemontea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail:
      "Teh dengan perasan lemon, memberikan rasa yang segar dan asam.",
  },
  {
    id: 27,
    name: "Strawberry Tea",
    imageSrc: "strawberrytea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh dengan rasa stroberi yang manis dan menyegarkan.",
  },
  {
    id: 28,
    name: "Virgin Squash",
    imageSrc: "virginsquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa buah-buahan.",
  },
  {
    id: 29,
    name: "Strawberry Squash",
    imageSrc: "strawberrysquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail:
      "Minuman segar dengan rasa stroberi yang manis dan menyegarkan.",
  },
  {
    id: 30,
    name: "Lemon Squash",
    imageSrc: "lemonsquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa lemon yang asam dan menyegarkan.",
  },
  {
    id: 31,
    name: "Leci Squash",
    imageSrc: "lycheesquash.jpeg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa leci yang manis dan menyegarkan.",
  },
  {
    id: 32,
    name: "Mineral Water",
    imageSrc: "mineralwater.jpeg",
    price: 5000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Air mineral untuk menemani hidangan Anda.",
  },
  {
    id: 33,
    name: "Nasi Goreng",
    imageSrc: "nasgor.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Nasi goreng yang lezat dan mengenyangkan.",
  },
  {
    id: 34,
    name: "Mie Instan Goreng Lengkap",
    imageSrc: "miegoreng.jpg",
    price: 12000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Mie instan goreng yang lengkap dengan bumbu dan topping.",
  },
  {
    id: 35,
    name: "Mie Instan Kuah Lengkap",
    imageSrc: "miekuah.jpeg",
    price: 12000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Mie instan kuah yang lengkap dengan bumbu dan topping.",
  },
  {
    id: 36,
    name: "Nasi Putih",
    imageSrc: "nasiputih.webp",
    price: 5000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Nasi putih hangat yang siap disajikan.",
  },
  {
    id: 37,
    name: "Telur",
    imageSrc: "telur.jpg",
    price: 5000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Telur sebagai lauk pendamping.",
  },
  {
    id: 38,
    name: "Kentang Goreng",
    imageSrc: "kentanggoreng.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Kentang goreng renyah dan gurih.",
  },
  {
    id: 39,
    name: "Roti Panggang",
    imageSrc: "ropang.webp",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Roti panggang yang hangat dan lezat.",
  },
  {
    id: 40,
    name: "Pisang Goreng",
    imageSrc: "pisanggoreng.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    variants: [
      { name: "coklat", add: 0 },
      { name: "keju", add: 0 },
      { name: "mix", add: 2000 },
    ],
    productDetail:
      "Pisang goreng renyah dengan pilihan topping cokelat, keju, atau mix.",
  },
];

export default function SarkaraMenu() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [activeMenuType, setActiveMenuType] = useState("none");
  const [selectedProducts, setSelectedProducts] = useState(sarkaraProducts);
  const [filterArray, setFilterArray] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuSarkara>();
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeSort, setActiveSort] = useState("Kategori");
  const [showOrderList, setShowOrderList] = useState(false);

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

    function sortProducts(productsObj: any) {
      if (activeSort != "Kategori") {
        if (activeSort === "Termahal") {
          return [...productsObj].sort((a, b) => b.price - a.price);
        } else if (activeSort === "Termurah") {
          return [...productsObj].sort((a, b) => a.price - b.price);
        } else if (activeSort === "Rekomendasi") {
          return [...productsObj].sort((a, b) => b.recPrior - a.recPrior);
        }
      } else {
        return productsObj;
      }
    }

    //filter based on menutype
    const filteredFirst =
      activeMenuType === "none"
        ? sortProducts(sarkaraProducts)
        : sortProducts(sarkaraProducts).filter(
            (product: any) => product.menuType === activeMenuType
          );

    setFilterArray(updatedFilterArray);
    const filteredProducts = filterProductsByActiveFilters(
      filteredFirst,
      updatedFilterArray
    );

    setSelectedProducts(filteredProducts);
  }, [selectedFilters, activeMenuType, activeSort]);

  const dataToDefault = () => {
    setActiveMenuType("none");
    setSelectedFilters(filters);
  };

  return (
    <div className="bg-white">
      <Header active="Menu" />
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
                <h3 className="sr-only">Categories</h3>
                <div className="flex flex-row px-4 py-3 items-center justify-between">
                  <p className="text-lg font-bold text-black ">Kategori</p>
                  <p
                    className="text-xs font-bold text-sarkara-sign-2 cursor-pointer"
                    onClick={() => dataToDefault()}
                  >
                    Reset All
                  </p>
                </div>
                <ul role="list" className="px-2 font-medium text-gray-900">
                  {kategori.map((category) => (
                    // <li key={category.name}>
                    //   <a href={category.href} className="block px-2 py-3">
                    //     {category.name}
                    //   </a>
                    // </li>
                    <li
                      key={category.value}
                      onClick={() => setActiveMenuType(category.value)}
                      className={`cursor-pointer block px-2 py-3 ${
                        category.value === activeMenuType
                          ? "font-bold text-sarkara-sign-1"
                          : null
                      }`}
                    >
                      <p>{category.label}</p>
                    </li>
                  ))}
                </ul>

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

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <div
                          onClick={() => setActiveSort(option.name)}
                          className={`
                            ${
                              option.name === activeSort
                                ? "font-bold text-sarkara-sign-1"
                                : "text-gray-500"
                            }
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          `}
                        >
                          {option.name}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
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
              <form className="hidden lg:block mt-6">
                <h3 className="sr-only">Categories</h3>
                <div className="flex flex-row mb-4 items-center justify-between">
                  <p className="text-lg font-bold text-black ">Kategori</p>
                  <p
                    className="text-xs font-bold text-sarkara-sign-2 cursor-pointer"
                    onClick={() => dataToDefault()}
                  >
                    Reset All
                  </p>
                </div>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {kategori.map((category) => (
                    <li
                      key={category.value}
                      onClick={() => setActiveMenuType(category.value)}
                      className={`cursor-pointer ${
                        category.value === activeMenuType
                          ? "font-bold text-sarkara-sign-1"
                          : null
                      }`}
                    >
                      <p>{category.label}</p>
                    </li>
                  ))}
                </ul>

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
              <div className="lg:col-span-3 col-span-2">
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative cursor-pointer"
                      onClick={() => {
                        setSelectedMenu(product);
                        setShowMenuModal(true);
                      }}
                    >
                      <img
                        alt={product.name}
                        src={`images/products/${product.menuType}/${product.imageSrc}`}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                      />
                      <div className="mt-4">
                        <h3 className="text-md font-bold text-sarkara-sign-1">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </h3>
                        <p className="text-lg md:text-md font-bold text-sarkara-sign mt-1">
                          {formatToIDR(product.price)}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          {product.menuType === "food"
                            ? "Food & Snacks "
                            : product.menuType === "others"
                            ? "Tea & Squash & Others"
                            : product.menuType}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowOrderList(true)}>
                    liatin list
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {selectedMenu && (
        <ProductModal
          isVisible={showMenuModal}
          onClose={() => setShowMenuModal(false)}
          product={selectedMenu}
        />
      )}
      <OrderList
        isVisible={showOrderList}
        onClose={() => setShowOrderList(false)}
      />
      <Footer />
    </div>
  );
}
