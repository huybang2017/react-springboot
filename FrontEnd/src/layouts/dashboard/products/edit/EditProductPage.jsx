import { useProductTypesQuery } from "../../../../hook/useProductTypesQuery";
import { useProductBrandsQuery } from '../../../../hook/useProductBrandsQuery';
import { useProductColorsQuery } from "../../../../hook/useProductColorsQuery";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { LuLoader2 } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from "react";
import { ProductIdQuery } from '../components/ProductIdQuery.jsx'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosAdmin from "../../../../apis/AxiosAdmin.jsx";




export default function EditProductPage() {
    const { data: types, isLoading: isLoadingTypes, error: errorTypes } = useProductTypesQuery();
    const { data: brands, isLoading: isLoadingBrands, error: errorBrands } = useProductBrandsQuery();
    const { data: colors, isLoading: isLoadingColors, error: errorColors } = useProductColorsQuery();
    const params = useParams()
    const navigate = useNavigate()
    const { data: product, isLoading: isLoadingProduct, error: errorProduct } = ProductIdQuery(params?.id)


    if (errorProduct && !product) {
        return navigate('/dashboard/products')
    }
    const queryClient = useQueryClient()

    const { register, formState: { errors }, handleSubmit, setValue, watch, getValues, setError, setFocus } = useForm({
        defaultValues: {
            name: '',
            description: '',
            priority: product?.priority ? product?.priority : 'true',
            status: product?.status ? product?.status : 'true',
            brandId: product?.brandId ? product?.brandId : '',
            shoeTypeId: product?.shoeTypeId ? product?.shoeTypeId : '',
            colorIds: [],
            sizes: [{ size: '', price: '', quantity: '', status: '', isAdd: 'false' }],
        }
    });
    const [isEditSizeOpenIndex, setIsEditSizeOpenIndex] = useState(null);



    useEffect(() => {
        if (product) {
            setValue('name', product.shoeName);
            setValue('description', product.description);
            setValue('priority', product.priority);
            setValue('status', product.status);

            const brand = brands?.find(brand => brand?.brandName === product?.brand?.brandName);
            if (brand) {
                setValue('brandId', brand.brandId);
            }

            const type = types?.find(type => type?.shoeTypeName === product?.shoeType?.shoeTypeName);
            if (type) {
                setValue('shoeTypeId', type.shoeTypeId);
            }

            const selectedColorIds = product?.shoeColors.map(color => {
                const foundColor = colors?.find(c => c?.colorName === color?.colorName);
                return foundColor ? foundColor?.id : null;
            }).filter(Boolean);
            setValue('colorIds', selectedColorIds);

            const sizeData = product?.shoeSizes.map(size => ({
                size: size?.size,
                price: size?.price,
                quantity: size?.quantity,
                status: size?.status,
                isAdd: false
            }));
          
            setValue('sizes', sizeData);
        }
    }, [product, brands, types, colors]);


    const colorIds = watch('colorIds');
    const sizes = watch('sizes');

    const addSize = () => {
        setValue('sizes', [...sizes, { size: '', price: '', quantity: '', status: '', isAdd: true }]);
    };

    const mutationSetThumbailImage = useMutation({
        mutationFn: ({ imageId, formData }) => {
            return AxiosAdmin.patch(`/ShoeImage/${imageId}`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success("Đặt thumbail thành công.");

        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi đặt thumbail");
        },
    });



    const onDrop = (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {

            formData.append('shoeImage', file)
            formData.append('priority', false)
        });

        mutationPostImage.mutate({ shoeId: product.shoeId, formData });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop })




    // mutation


    const mutationPatch = useMutation({
        mutationFn: (formData) => {
            return AxiosAdmin.patch('/Shoe', formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId']);
            toast.success("Thông tin sản phẩm đã được sửa thành công.");

        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi sửa sản phẩm.");
        },
    });
    const mutationSetStatus = useMutation({
        mutationFn: (formData) => {
            return AxiosAdmin.patch(`${import.meta.env.VITE_API_URL}/ShoeSize`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId']);
            toast.success("Chỉnh sửa trạng thái của size thảnh công.");
        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi sửa trạng thái của size.");
        },
    })
    const mutationDeleteImage = useMutation({
        mutationFn: (id) => {
            return AxiosAdmin.delete(`/ShoeImage/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId']);
            toast.success("Xóa ảnh thành công");

        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Xóa ảnh thất bại");
        },
    });

    const mutationPostImage = useMutation({
        mutationFn: ({ shoeId, formData }) => {
            return AxiosAdmin.post(`/ShoeImage/${shoeId}`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId']);
            toast.success("Ảnh thêm thành công.");

        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi thêm ảnh.");
        },
    });

    const mutationColorDelete = useMutation({
        mutationFn: ({ shoeId, colorId }) => {
            return AxiosAdmin.delete(`${import.meta.env.VITE_API_URL}/ShoeColor?colorId=${colorId}&shoeId=${shoeId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId'])
            toast.success('Xóa màu thành công')
        },
        onError: (error) => {
            console.error("Error", error)
            toast.error("Đã xảy ra lỗi khi xóa màu");
        }
    })
    const mutationColorPost = useMutation({
        mutationFn: (formData) => {
            return AxiosAdmin.post(`${import.meta.env.VITE_API_URL}/ShoeColor`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId'])
            toast.success('Thêm màu thành công')
        },
        onError: (error) => {
            console.error("Error", error)
            toast.error("Đã xảy ra lỗi khi Thêm màu");
        }
    })

    const mutationSizeEdit = useMutation({
        mutationFn: (formData) => {
            return AxiosAdmin.patch(`${import.meta.env.VITE_API_URL}/ShoeSize`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId'])
            toast.success('Sửa size thành công')
            setIsEditSizeOpenIndex(null)
        },
        onError: (error) => {
            console.error("Error", error)
            toast.error("Sửa size thất bại");
        }
    })
    const mutationSizePost = useMutation({
        mutationFn: ({ shoeId, formData }) => {
            return AxiosAdmin.post(`${import.meta.env.VITE_API_URL}/ShoeSize/${shoeId}`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['productId'])
            toast.success('Thêm size thành công')
            setIsEditSizeOpenIndex(null)
        },
        onError: (error) => {
            console.error("Error", error)
            toast.error("Thêm size thất bại");
        }
    })

    // on event
    const onSubmit = (data) => {
        const formData = new FormData()
        const currentBrandName = brands.find((e) => e?.brandId === data?.brandId)?.brandName
        const currentTypeName = types.find((e) => e?.shoeTypeId === data?.shoeTypeId)?.shoeTypeName

        if (parseInt(data.name) === parseInt(product.name)
            && parseInt(data.description) === parseInt(product?.description)
            && parseInt(data.priority) === parseInt(product?.priority)
            && parseInt(data.status) === parseInt(product?.status)
            && parseInt(currentBrandName) === parseInt(product?.brand?.brandName)
            && parseInt(currentTypeName) === parseInt(product?.shoeType?.shoeTypeName)
        ) {
            toast.error("Bạn chưa thay đổi gì")
        } else {
            formData.append('shoeId', product.shoeId)
            if (data.name) {
                formData.append('shoeName', data.name)
            }
            if (data.description) {
                formData.append('description', data.description)
            }
            if (data.priority) {
                formData.append('priority', data.priority)
            }
            if (data.status) {
                formData.append('status', data.status)
            }
            if (data.brandId) {
                formData.append('brandId', data.brandId)
            }
            if (data.shoeTypeId) {
                formData.append('shoeTypeId', data.shoeTypeId)
            }
            mutationPatch.mutate(formData);
        }
    };

    const onDeleteImage = (id) => {
        mutationDeleteImage.mutate(id)
    }
    const checkDuplicateSizes = (sizes) => {
        for (let i = 0; i < sizes.length; i++) {
            for (let j = i + 1; j < sizes.length; j++) {
                if (parseInt(sizes[i].size) === parseInt(sizes[j].size)) {
                    return true;
                }
            }
        }
        return false;
    };


    const onEditSize = (index) => {
        const sizeArray = getValues(`sizes`)

        if (parseInt(sizeArray[index].size) === parseInt(product?.shoeSizes[index]?.size)
            && parseInt(sizeArray[index].price) === parseInt(product?.shoeSizes[index]?.price)
            && parseInt(sizeArray[index].quantity) === parseInt(product?.shoeSizes[index]?.quantity)
        ) {
            toast.error("Bạn chưa thay đổi gì")
            // setIsEditSizeOpen(false)
        }
        else {
            const formData = new FormData()

            if (sizeArray[index].size < 0) {
                toast.error('Size phải là số dương')
            }
            else if (sizeArray[index].price < 0) {
                toast.error('Giá phải là số dương')
            } else if (sizeArray[index].quantity < 0 && !sizeArray[index].isAdd) {
                toast.error('Số lượng phải là số dương')
            } else if (!sizeArray[index].price) {
                toast.error('Giá không được để trống')
            } else if (!sizeArray[index].quantity && !sizeArray[index].isAdd) {
                toast.error('Số lượng không được để trống')
            } else if (!sizeArray[index].size) {
                toast.error('Size không được để trống')
            }
            else {
                if (sizeArray[index].isAdd) {
                    formData.append('size', sizeArray[index].size)
                    formData.append('price', sizeArray[index].price)
                    if (checkDuplicateSizes(sizes)) {
                        toast.error("Không thể thêm size trùng nhau")
                    } else {
                        mutationSizePost.mutate({ shoeId: product.shoeId, formData })
                    }

                } else {
                    formData.append('idSize', sizeArray[index].size)
                    formData.append('idShoeId', product.shoeId)
                    if (sizeArray[index].quantity) {
                        formData.append('quantity', sizeArray[index].quantity)
                    }
                    if (sizeArray[index].price) {
                        formData.append('price', sizeArray[index].price)
                    }

                    mutationSizeEdit.mutate(formData)
                }
            }
        }
    }



    const onSetThumbnail = (imageId) => {
        const formData = new FormData()
        formData.append('priority', 'true')
        mutationSetThumbailImage.mutate({ imageId, formData })
    }


    const onSetStatusFalse = (index) => {
        const sizeArray = getValues(`sizes`)
        const formData = new FormData()
        formData.append('idSize', sizeArray[index].size)
        formData.append('idShoeId', product.shoeId)
        formData.append('status', false)
        mutationSetStatus.mutate(formData)
    }

    const onSetStatusTrue = (index) => {
        const sizeArray = getValues(`sizes`)
        const formData = new FormData()
        formData.append('idSize', sizeArray[index].size)
        formData.append('idShoeId', product.shoeId)
        formData.append('status', true)
        mutationSetStatus.mutate(formData)
    }



    if (isLoadingBrands || isLoadingColors || isLoadingTypes || isLoadingProduct) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LuLoader2 size={30} className="animate-spin" />
            </div>
        )
    }

    if (errorBrands || errorColors || errorTypes) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h2>Some things went wrong! :(( </h2>
            </div>
        )
    }



    return (
        <div className="">
            <IoMdArrowRoundBack className='cursor-pointer mb-4' size={30} onClick={() => navigate('/dashboard/products')} />

            <div className="flex w-full h-auto bg-[#f6f8fa] p-4">

                {/* image area */}
                <div className="w-1/2 h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h2>

                    {/* Hiển thị thumbnail */}
                    <div className="mt-4 grid grid-cols-3 gap-2">

                        {
                            product.shoeImages && product.shoeImages.sort((a, b) => { if (a.priority) { return -1 } if (b.priority) { return 1 } return 0 }).map((image, index) => (
                                <div key={index} className={`relative`}>
                                    {image.priority ? (
                                        <div className='border-gray-300 w-full rounded-md flex items-center justify-center cursor-pointer' >
                                            <div className="w-full aspect-square overflow-hidden relative">
                                                <img src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                                                    alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-full aspect-square overflow-hidden relative">
                                                <img src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                                                    alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                            </div>
                                            <button type="button" onClick={() => onDeleteImage(image.shoeImageId)} className="absolute top-1 right-1 bg-rose-500 flex items-center justify-center p-1 rounded-sm shadow-lg">
                                                <IoMdClose size={16} className="text-white" />
                                            </button>
                                            <button type="button" onClick={() => onSetThumbnail(image.shoeImageId)} className={`absolute bottom-1 right-1 ${'bg-white text-blue-500'}`}>
                                                Đặt làm thumbnail
                                            </button>
                                        </div>
                                    )}

                                </div>
                            ))
                        }

                        <div>

                            <div {...getRootProps({ className: ' w-full border-2 border-dashed border-gray-300 aspect-square rounded-md flex items-center justify-center cursor-pointer' })}>
                                <input {...getInputProps()} />
                                <span className="text-gray-400">Kéo và thả hình ảnh vào đây hoặc nhấp để tải lên</span>
                            </div>
                        </div>


                    </div>


                </div>


                {/* product info */}
                <div className="w-1/2 h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
                    <form className="bg-white rounded-md p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>

                        {/* field name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                            <input
                                id="name"
                                placeholder="Tên..."
                                {...register('name', { required: 'Tên sản phẩm không được để trống' })}
                                type="text"
                                className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>

                        {/* field description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                            <textarea
                                id="description"
                                placeholder="Mô tả..."
                                {...register('description', { required: 'Mô tả sản phẩm không được để trống' })}
                                className={`mt-1 p-2 border rounded-md w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.description && (
                                <span className="text-red-500">{errors.description.message}</span>
                            )}
                        </div>

                        {/* field priority */}
                        <div className='mb-4'>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Ưu tiên</label>
                            <select
                                id="priority"
                                className={`mt-1 p-2 border rounded-md w-full ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('priority')}
                            >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>

                        {/* field status */}
                        <div className='mb-4'>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <select
                                id="status"
                                className={`mt-1 p-2 border rounded-md w-full ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('status')}
                            >
                                <option value="true">Hiển thị</option>
                                <option value="false">Ẩn</option>
                            </select>
                        </div>

                        {/* field brand */}
                        <div className='mb-4'>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Thương hiệu</label>
                            <select
                                id="brand"
                                className={`mt-1 p-2 border rounded-md w-full ${errors.brandId ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('brandId', { required: "Thương hiệu phải được lựa chọn" })}
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brands && brands.map((brand) => (
                                    <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                                ))}
                            </select>
                            {errors.brandId && (
                                <span className="text-red-500">{errors.brandId.message}</span>
                            )}
                        </div>

                        {/* field types */}
                        <div className='mb-4'>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loại</label>
                            <select
                                id="type"
                                className={`mt-1 p-2 border rounded-md w-full ${errors.shoeTypeId ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('shoeTypeId', { required: 'Loại giày phải được lựa chọn' })}
                            >
                                <option value="">Chọn loại</option>
                                {types && types.map((type) => (
                                    <option key={type.shoeTypeId} value={type.shoeTypeId}>{type.shoeTypeName}</option>
                                ))}
                            </select>
                            {errors.shoeTypeId && (
                                <span className="text-red-500">{errors.shoeTypeId.message}</span>
                            )}
                        </div>

                        {/* field colors */}
                        <div className='mb-4'>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc</label>
                            <Select
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
                                className={`mt-1 border rounded-md w-full ${errors.colorIds ? 'border-red-500' : 'border-gray-300'}`}
                                label="Màu sắc"
                                {...register('colorIds', { required: "Màu sắc không được để trống" })}
                                options={colors?.map((color) => ({
                                    value: color.id,
                                    label: color.colorName
                                }))}

                                onChange={(selectedOptions) => {
                                    const selectedColorIds = selectedOptions ? selectedOptions.map(option => option.value) : [];

                                    // Lấy danh sách các màu hiện tại
                                    const differenceToDelete = colorIds.filter(x => !selectedColorIds.includes(x));
                                    const differenceToAdd = selectedColorIds.filter(x => !colorIds.includes(x));

                                    if (differenceToDelete.length > 0) {
                                        console.log("ColorId: " + differenceToDelete[0]);
                                        console.log("ShoeId: " + product?.shoeId);

                                        mutationColorDelete.mutate({ shoeId: product?.shoeId, colorId: differenceToDelete[0] });

                                    }

                                    if (differenceToAdd.length > 0) {
                                        // Xử lý khi có phần tử được thêm
                                        const formDataAdd = new FormData();
                                        formDataAdd.append('colorId', differenceToAdd[0]);
                                        formDataAdd.append('shoeId', product?.shoeId);
                                        formDataAdd.forEach((value, key) => {
                                            console.log(`Thêm: ${key}, ${value}`);
                                        });
                                        mutationColorPost.mutate(formDataAdd);
                                    }

                                    // Cập nhật giá trị mới cho `colorIds`
                                    setValue('colorIds', selectedColorIds, {
                                        shouldValidate: true
                                    });
                                }}

                                value={colorIds.map(id => ({ value: id, label: colors.find(color => color.id === id)?.colorName }))}
                                isMulti
                                isClearable
                            />
                            {errors.colorIds && (
                                <span className="text-red-500">{errors.colorIds.message || 'Màu sắc phải được chọn'}</span>
                            )}
                        </div>

                        {/* field sizes and prices */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Kích thước, số lượng, giá</label>
                            {sizes?.map((sizeItem, index) => (
                                <div key={index} className="flex mb-2 items-center gap-2">
                                    <div className="w-full flex flex-col gap-2">
                                        <input
                                            onClick={() => setIsEditSizeOpenIndex(index)} 
                                            placeholder="Size chỉ được nhập số"
                                            type="number"
                                            disabled={!Boolean(sizes?.[index]?.isAdd)}
                                            {...register(`sizes.${index}.size`, { required: 'Kích thước không được để trống' })}
                                            className={`mt-1 p-2 border rounded-md w-full ${Boolean(sizes?.[index]?.isAdd) ? 'bg-transparent' : 'bg-slate-300'} ${errors.sizes?.[index]?.size ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.sizes?.[index]?.size && (
                                            <span className="text-red-500">{errors.sizes[index].size.message}</span>
                                        )}
                                    </div>

                                    {
                                        !sizes[index].isAdd && (
                                            <div className="w-full flex flex-col gap-2">
                                                <input
                                                    onClick={() => setIsEditSizeOpenIndex(index)}
                                                    placeholder="Số lượng chỉ được nhập số"
                                                    type="number"
                                                    {...register(`sizes.${index}.quantity`, { required: 'Số lượng không được để trống' })}
                                                    className={`mt-1 p-2 border rounded-md w-full ${errors.sizes?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.sizes?.[index]?.quantity && (
                                                    <span className="text-red-500">{errors.sizes[index].quantity.message}</span>
                                                )}
                                            </div>
                                        )
                                    }

                                    <div className="w-full flex flex-col gap-2">
                                        <input
                                            onClick={() => setIsEditSizeOpenIndex(index)} 
                                            placeholder="Giá chỉ được nhập số"
                                            type="number"
                                            {...register(`sizes.${index}.price`, { required: 'Giá không được để trống', min: {} })}
                                            className={`mt-1 p-2 border rounded-md w-full ${errors.sizes?.[index]?.price ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.sizes?.[index]?.price && (
                                            <span className="text-red-500">{errors.sizes[index].price.message}</span>
                                        )}
                                    </div>
                                    <div className="pl-4">
                                        {isEditSizeOpenIndex === index ? ( 
                                            <button type="button" onClick={() => onEditSize(index)} className="w-8 h-8 rounded-sm flex items-center justify-center bg-sky-500 hover:bg-sky-600 transition">
                                                <FaCheck size={16} className="text-white" />
                                            </button>
                                        ) : (
                                            <div>
                                                {sizes[index].status ? (
                                                    <button type="button" onClick={() => onSetStatusFalse(index)} className="w-8 h-8 rounded-sm flex items-center justify-center bg-sky-600">
                                                        <FaRegEyeSlash size={20} className="text-white" />
                                                    </button>
                                                ) : (
                                                    <button type="button" onClick={() => onSetStatusTrue(index)} className="w-8 h-8 rounded-sm flex items-center justify-center bg-sky-600">
                                                        <FaRegEye size={20} className="text-white" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addSize} className="text-blue-600">Thêm kích thước</button>
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Lưu</button>
                    </form>


                </div>
            </div>
        </div>
    );
}
