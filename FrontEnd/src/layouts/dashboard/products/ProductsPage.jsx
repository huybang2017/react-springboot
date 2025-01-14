import { useEffect, useState, useCallback } from "react";
import { useProductBrandsQuery } from "../../../hook/useProductBrandsQuery";
import { useProductTypesQuery } from "../../../hook/useProductTypesQuery";
import { LuLoader2 } from "react-icons/lu";
import TableProduct from "./components/TableProduct";
import { Pagination, Stack } from "@mui/material";
import debounce from 'lodash.debounce';
import { ProductQuery } from './components/ProductQuery'
import { useNavigate } from "react-router-dom";

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

export default function ProductsPage() {
    const { data: types, isLoading: isLoadingProductTypes, error: errorProductTypes } = useProductTypesQuery();
    const { data: brands, isLoading: isLoadingProductBrands, error: errorProductBrands } = useProductBrandsQuery();

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("");

    const [filterValues, setFilterValues] = useState({
        search: "",
        brandId: "",
        shoeTypeId: "",
        priority: "",
        minCreateDate: "",
        maxCreateDate: "",
        sort: "shoeId,asc",
        pageNumber: DEFAULT_PAGE,
        pageSize: ITEM_PER_PAGE,
    });

    const params = Object.fromEntries(Object.entries(filterValues).filter(([_, v]) => v));

    const { data: dataProducts, isLoading: isLoadingProducts, error: errorProducts } = ProductQuery(params);

    const debouncedSearch = useCallback(
        debounce((value) => {
            setFilterValues((prev) => ({ ...prev, search: value, pageNumber: DEFAULT_PAGE }));
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleChangePage = (e, p) => {
        setFilterValues((prev) => ({ ...prev, pageNumber: p }));
    };


    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    if (isLoadingProductTypes || isLoadingProductBrands || isLoadingProducts) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <LuLoader2 size={30} className="animate-spin" />
            </div>
        );
    }

    if (errorProductTypes || errorProductBrands || errorProducts) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-zinc-400 font-semibold text-md">
                    {(errorProductTypes || errorProductBrands || errorProducts)?.message}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-screen">
            <div className="w-full h-full space-y-4 ">
                <div className="block sm:flex items-center bg-[#f6f8fa] box-border p-3 rounded-md justify-between lg:mt-1.5 dark:bg-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Quản lý sản phẩm</h1>
                        </div>
                        <div className="items-center justify-between flex gap-4 ">
                            <form className="sm:pr-3 w-full">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="search"
                                        id="products-search"
                                        value={searchInput}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tìm sản phẩm ... "
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </form>

                            {/* Select for brands */}
                            <div className="flex items-center gap-2 w-full">
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Thương hiệu</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-4 focus:outline-none"
                                    value={filterValues.brandId}
                                    onChange={(e) => setFilterValues({ ...filterValues, brandId: e.target.value })}
                                >
                                    <option value="">Tất cả</option>
                                    {brands?.map((brand, index) => (
                                        <option key={index} className="text-sm pr-2" value={brand.brandId}>
                                            {brand.brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select for types */}
                            <div className="flex items-center gap-2 w-full">
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Loại</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-4 focus:outline-none"
                                    value={filterValues.shoeTypeId}
                                    onChange={(e) => setFilterValues({ ...filterValues, shoeTypeId: e.target.value })}
                                >
                                    <option value=""> Tất cả</option>
                                    {types?.map((type, index) => (
                                        <option key={index} value={type.shoeTypeId} className="text-sm pr-2">
                                            {type.shoeTypeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Priority Select */}
                            <div className="flex items-center gap-2 w-full ">
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Ưu tiên</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-4 focus:outline-none"
                                    value={filterValues.priority}
                                    onChange={(e) => setFilterValues({ ...filterValues, priority: e.target.value })}
                                >
                                    <option value="" className="text-sm pr-2">Tất cả</option>
                                    <option value="true" className="text-sm pr-2">Có</option>
                                    <option value="false" className="text-sm pr-2">Không</option>
                                </select>
                            </div>

                            {/* Button to add new product */}
                            <div className="ml-1 sm:ml-2">
                                <button
                                    onClick={() => navigate(`/dashboard/products/new`)}
                                    className="flex items-center justify-center h-12 bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-lg w-full py-2 px-4 focus:outline-none"
                                    
                                >
                                    <i className="fa-solid fa-plus text-center mr-2"></i>
                                    <span className="whitespace-nowrap tracking-tight font-semibold">Thêm sản phẩm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <hr className="border-t border-gray-300" />

                {/* Render product table */}
                <TableProduct products={dataProducts?.content} filterValues={filterValues} onChangeFilter={setFilterValues} />


                <div className="w-full flex items-center justify-center pb-5">
                    <Stack spacing={2} >
                        <Pagination
                            count={dataProducts?.totalPages}
                            page={filterValues.pageNumber}
                            shape="rounded"
                            variant="outlined"
                            onChange={handleChangePage}
                        />



                    </Stack>

                </div>
            </div>
        </div>
    );
}
