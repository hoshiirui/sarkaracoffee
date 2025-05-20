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
  ShoppingBagIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Header from "@/components/Header";
import { formatToIDR } from "@/helper/idrFormatter";
import Image from "next/image";
import Footer from "@/components/Footer";
import { MenuSarkara } from "@/types/MenuSarkara";
import ProductModal from "@/components/ProductModal";
import OrderList from "@/components/OrderList";
import { createClient } from "@/helper/supabase/client";
import { ToastError } from "@/helper/Toast";
import { PromoWithMenu } from "@/types/Promo";

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
  { value: "signature", label: "XYZ Signature" },
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

export default function SarkaraMenu() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [activeMenuType, setActiveMenuType] = useState("none");
  const [defaultProducts, setDefaultProducts] = useState<MenuSarkara[]>();
  const [selectedProducts, setSelectedProducts] = useState<MenuSarkara[]>();
  const [filterArray, setFilterArray] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuSarkara>();
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeSort, setActiveSort] = useState("Kategori");
  const [showOrderList, setShowOrderList] = useState(false);

  const [promoList, setPromoList] = useState<PromoWithMenu[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: dataPromo, error: errorPromo } = await supabase
        .from("promo")
        .select(`*`)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching data:", error.message);
      } else if (errorPromo) {
        console.error("Error fetching data:", errorPromo.message);
      } else {
        setDefaultProducts(data);
        setSelectedProducts(data);
        console.log(data);

        const menuMap = new Map(data.map((menu) => [menu.id, menu]));

        const updatedPromos = dataPromo.map((promo) => ({
          ...promo,
          menuBerlaku: promo.menuB
            ? promo.menuB.map((menuId: any) => menuMap.get(menuId))
            : null,
        }));

        setPromoList(updatedPromos);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    if (defaultProducts) {
      const filteredFirst =
        activeMenuType === "none"
          ? sortProducts(defaultProducts)
          : sortProducts(defaultProducts).filter(
              (product: any) => product.menuType === activeMenuType
            );

      setFilterArray(updatedFilterArray);
      const filteredProducts = filterProductsByActiveFilters(
        filteredFirst,
        updatedFilterArray
      );

      setSelectedProducts(filteredProducts);
    }
  }, [selectedFilters, activeMenuType, activeSort]);

  const dataToDefault = () => {
    setActiveMenuType("none");
    setSelectedFilters(filters);
  };

  return (
    <div className="bg-white min-h-screen">
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              XYZ Menu
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
              {!isLoading && selectedProducts ? (
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
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menuimages//${product.imageSrc}`}
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

                    <button
                      onClick={() => setShowOrderList(true)}
                      className="fixed bottom-8 right-8 bg-sarkara-sign-1 hover:bg-sarkara-sign text-white font-bold py-4 px-4 rounded-full shadow-lg"
                    >
                      <ShoppingBagIcon width={24} height={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <p>loading...</p>
              )}
            </div>
          </section>
        </main>
      </div>
      {selectedMenu && (
        <ProductModal
          isVisible={showMenuModal}
          onClose={() => setShowMenuModal(false)}
          product={selectedMenu}
          promoAvailable={promoList}
        />
      )}
      <OrderList
        isVisible={showOrderList}
        onClose={() => setShowOrderList(false)}
        promoAvailable={promoList}
      />
      <Footer />
    </div>
  );
}
