import { useProductTypesQuery } from "../../../../hook/useProductTypesQuery";
import { useProductBrandsQuery } from '../../../../hook/useProductBrandsQuery';
import { useProductColorsQuery } from "../../../../hook/useProductColorsQuery";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { LuLoader2 } from "react-icons/lu";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductIdQuery } from "../components/ProductIdQuery.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ProductIdPage() {
    const { data: types, isLoading: isLoadingTypes, error: errorTypes } = useProductTypesQuery();
    const { data: brands, isLoading: isLoadingBrands, error: errorBrands } = useProductBrandsQuery();
    const { data: colors, isLoading: isLoadingColors, error: errorColors } = useProductColorsQuery();
    const params = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading: isLoadingProduct, error: errorProduct } = ProductIdQuery(params?.id);

    useEffect(() => {
        if (!product && !isLoadingProduct) {
            navigate('/dashboard/products');
        }
    }, [product, isLoadingProduct, navigate]);

    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            name: '',
            description: '',
            priority: 'true',
            status: 'true',
            brandId: '',
            shoeTypeId: '',
            colorIds: [],
            sizes: [{ size: '', price: '', quantity: '', status: '' }],
            imageFiles: []
        }
    });

    useEffect(() => {
        if (product) {
            setValue('name', product.shoeName);
            setValue('description', product.description);
            setValue('priority', product.priority);
            setValue('status', product.status);

            const brand = brands?.find(brand => brand.brandName === product.brand.brandName);
            if (brand) setValue('brandId', brand.brandId);

            const type = types?.find(type => type.shoeTypeName === product.shoeType.shoeTypeName);
            if (type) setValue('shoeTypeId', type.shoeTypeId);

            const selectedColorIds = product.shoeColors.map(color => {
                const foundColor = colors?.find(c => c.colorName === color.colorName);
                return foundColor ? foundColor.id : null;
            }).filter(Boolean);
            setValue('colorIds', selectedColorIds);

            const sizeData = product.shoeSizes.map(size => ({
                size: size.size,
                price: size.price,
                quantity: size.quantity,
                status: size.status,
            }));
            setValue('sizes', sizeData);

            const imageFiles = product.shoeImages.map(image => ({
                preview: `${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`,
                priority: image.priority
            }))

            setValue('imageFiles', imageFiles)
        }
    }, [product, brands, types, colors]);

    const colorIds = watch('colorIds');
    const sizes = watch('sizes');
    const imageFiles = watch('imageFiles').sort((a, b) => (a.priority === true ? -1 : b.priority === false ? 1 : 0));

    if (isLoadingBrands || isLoadingColors || isLoadingTypes || isLoadingProduct) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LuLoader2 size={30} className="animate-spin" />
            </div>
        );
    }

    if (errorBrands || errorColors || errorTypes || errorProduct) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h2>Some things went wrong! :(( </h2>
            </div>
        );
    }

    function formatPrice(price) {
        const priceString = price.toString();

        const formattedPrice = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return formattedPrice + " ₫";
    }




    return (
        <div>
            <IoMdArrowRoundBack className='cursor-pointer mb-4' size={30} onClick={() => navigate('/dashboard/products')} />
            <div className="flex w-full h-auto bg-[#f6f8fa] p-4">
                
                {/* Image area */}
                <div className="w-1/2 h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h2>
                    {/* Thumbnail display */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {imageFiles.map((image, index) => (
                            <div key={index} className="relative">
                                {image.priority ? (
                                    <div className='border-gray-300 w-full rounded-md flex items-center justify-center cursor-pointer'>
                                        <div className="w-full aspect-square overflow-hidden relative">
                                            <img src={image.preview} alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                        </div>

                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-full aspect-square overflow-hidden relative">
                                            <img src={image.preview} alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}

                    </div>


                </div>

                {/* Product info */}
                <div className="w-1/2 h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
                    <form className="bg-white rounded-md p-4 shadow-md">
                        {/* Field name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                            <input
                                id="name"
                                placeholder="Tên..."
                                value={product?.shoeName || ''}
                                readOnly
                                className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        {/* Field description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                            <textarea
                                id="description"
                                placeholder="Mô tả..."
                                value={product?.description || ''}
                                readOnly
                                className={`mt-1 p-2 border rounded-md w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        {/* Additional fields */}
                        <div className="mb-4">
                            <label htmlFor="brandId" className="block text-sm font-medium text-gray-700">Thương hiệu</label>
                            <select id="brandId" {...register('brandId')} disabled className={`mt-1 p-2 border rounded-md w-full`}>
                                {brands?.map((brand) => (
                                    <option key={brand.brandId} value={brand.brandId}>
                                        {brand.brandName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="shoeTypeId" className="block text-sm font-medium text-gray-700">Loại giày</label>
                            <select id="shoeTypeId" {...register('shoeTypeId')} disabled className={`mt-1 p-2 border rounded-md w-full `}>
                                {types?.map((type) => (
                                    <option key={type.shoeTypeId} value={type.shoeTypeId}>
                                        {type.shoeTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
                            <Select
                                className={`mt-1 p-2 border rounded-md w-full `}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        border: 'none',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            border: 'none',
                                        },
                                    }),
                                }}
                                value={colorIds.map(id => ({ value: id, label: colors.find(color => color.id === id)?.colorName }))}
                                isMulti
                                {...register('colorIds')}
                                isDisabled
                            />
                        </div>

                        {/* Sizes */}
                        <div className="mb-4">
                            <h3 className="text-md font-semibold">Kích thước, số lượng, giá</h3>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex mb-2 items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Kích thước"
                                        value={size.size}
                                        readOnly
                                        className="border rounded-md w-full p-2 "
                                    />
                                    <input
                                        type="text"
                                        placeholder="Giá"
                                        value={formatPrice(size.price)}
                                        readOnly
                                        className="border rounded-md w-full p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Giá"
                                        value={size.quantity}
                                        readOnly
                                        className="border rounded-md w-full p-2"
                                    />
                                    <div className="pl-4">
                                        {sizes[index].status ? (
                                            <button type="button" className="w-8 h-8 rounded-sm flex items-center justify-center bg-sky-600">
                                                <FaRegEyeSlash size={20} className="text-white" />
                                            </button>
                                        ) : (
                                            <button type="button" className="w-8 h-8 rounded-sm flex items-center justify-center bg-sky-600">
                                                <FaRegEye size={20} className="text-white" />
                                            </button>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>


                    </form>
                </div>
            </div>
        </div>
        
    );
}
