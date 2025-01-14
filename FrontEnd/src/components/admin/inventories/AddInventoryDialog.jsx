import { Checkbox, DialogContent, IconButton, Tooltip } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getInventoryProducts, getProducts } from '../../../reducers/productReducer/ProductsSlice';
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice';
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice';
import ProductsSelectedIventory from './ProductsSelectedIventory';
import { FormatPrice } from '../../FormatPrice'

import { createInventoryReportApiThunk } from '../../../reducers/inventoryReducers/InventoryReportSlice';
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import '../style.css'


const builderQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams();
  Object.entries({
    ...filters,
    pageNumber: page || ' ',
    pageSize: itemsPerPage || ' ',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}


const DEFAULT_PAGE = 1
const ITEM_PER_PAGE = 10
const AddInventoryDialog = ({
  open,
  handleOpen
}) => {

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productOpen, setProductOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [finalTotal, setFinalTotal] = useState(0)
  const productRef = useRef(null)

  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const shoetypes = useSelector(state => state.shoeTypeReducer)
  const brands = useSelector(state => state.brandReducer)


  const totalPages = products.data.totalPages

  if (!products || !shoetypes || !brands) {
    return <div>loading... </div>
  }

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)




  const [formValues, setFormValues] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    inventoryReportDetailCreateFormList: []
  })


  const [filterValues, setFilterValues] = useState({
    search: '',
    brandId: '',
    shoeTypeId: '',
    priority: '',
    minCreateDate: '',
    maxCreateDate: '',
  });
  const [formErrors, setFormErrors] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    size: '',
    products: '',
    inventoryReportDetailCreateFormList: []
  });




  useEffect(() => {
    const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE)


    dispatch(getInventoryProducts(query))
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())

  }, [dispatch, filterValues, currentPage])







  const handleSizeChange = (index, size) => {
    setSelectedSize(prev => {
      const newSelectedSize = { ...prev };
      if (!newSelectedSize[index]) {
        newSelectedSize[index] = [];
      }

      const sizeIndex = newSelectedSize[index].findIndex(item => item.size === size.size);
      if (sizeIndex >= 0) {
        newSelectedSize[index].splice(sizeIndex, 1);
      } else {
        newSelectedSize[index].push({ ...size, unitPrice: 0 });
      }

      return newSelectedSize;
    });



  };

  const handleUnitPriceChange = (size, product) => {
    let totalPrice = 0

    const quantity = document.getElementById(`quantity-${product.shoeId}-${size.size}`).value
    const unitPrice = document.getElementById(`unitPrice-${product.shoeId}-${size.size}`).value

    const total_render = document.getElementById(`total-${product.shoeId}-${size.size}`)


    let total = parseInt(quantity) * parseInt(unitPrice)
    total_render.innerText = total ? FormatPrice(total) : '0đ'

    selectedProduct.forEach((product, index) => {
      selectedSize[index].forEach((item, indexS) => {
        const getTotal = document.getElementById(`total-${product.shoeId}-${item.size}`).textContent
        console.log(getTotal)
        const numberTotal = parseInt(getTotal.replace(/\D/g, '')) || 0;
        totalPrice += numberTotal
      })
    })

    setFinalTotal(totalPrice)


  }
  const handleQuantityChange = (size, product) => {
    let totalPrice = 0

    const quantity = document.getElementById(`quantity-${product.shoeId}-${size.size}`).value
    const unitPrice = document.getElementById(`unitPrice-${product.shoeId}-${size.size}`).value

    const total_render = document.getElementById(`total-${product.shoeId}-${size.size}`)


    let total = parseInt(quantity) * parseInt(unitPrice)
    total_render.innerText = total ? FormatPrice(total) : '0đ'


    selectedProduct.forEach((product, index) => {
      selectedSize[index].forEach((item, indexS) => {
        const getTotal = document.getElementById(`total-${product.shoeId}-${item.size}`).textContent
        console.log(getTotal)
        const numberTotal = parseInt(getTotal.replace(/\D/g, '')) || 0;
        totalPrice += numberTotal
      })
    })

    setFinalTotal(totalPrice)


  }




  const handleProductOpen = () => {
    setProductOpen(!productOpen)
  }



  const validateForm = () => {
    let valid = true;
    let errors = {
      totalPrice: '',
      supplier: '',
      supplierPhone: '',
      size: '',
      products: '',
      inventoryReportDetailCreateFormList: []
    };


    if (!formValues.supplier) {
      errors.supplier = 'Nhà cung cấp không được để trống';
      valid = false;
    }

    if (!formValues.supplierPhone) {
      errors.supplierPhone = 'Số điện thoại nhà cung cấp không được để trống';
      document.getElementById('supplier_name').focus()
      valid = false;
    } else if (!/^\d{10,15}$/.test(formValues.supplierPhone)) {
      errors.supplierPhone = 'Số điện thoại không hợp lệ';
      document.getElementById('supplier_phone_number').focus()
      valid = false;
    }

    if (selectedProduct.length === 0) {
      errors.products = 'Bạn phải chọn sản phẩm';
      productRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      valid = false;
    }

    selectedProduct.forEach((product, index) => {
      let productErrors = {
        unitPrice: '',
        quantity: '',
        total: ''
      };

      selectedSize[index].forEach((item, indexS) => {

        const getUnitPrice = document.getElementById(`unitPrice-${product.shoeId}-${item.size}`).value
        const getQuantity = document.getElementById(`quantity-${product.shoeId}-${item.size}`).value
        const getTotal = document.getElementById(`total-${product.shoeId}-${item.size}`).textContent
        const unitPriceErr = document.getElementById(`unitPrice-${product.shoeId}-${item.size}-err`)
        const quantityErr = document.getElementById(`quantity-${product.shoeId}-${item.size}-err`)

        if (!getUnitPrice) {
          unitPriceErr.innerText = "Đơn giá không được để trống"
        } else {
          unitPriceErr.innerText = ""
        }
        if (!getQuantity) {
          quantityErr.innerText = "Số lượng không được để trống"
        } else {
          quantityErr.innerText = ""
        }

      })
      errors.inventoryReportDetailCreateFormList[index] = productErrors;
    });

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    let totalPrice = 0

    const newForm = new FormData()

    newForm.append('supplierPhone', formValues.supplierPhone)
    newForm.append('supplier', formValues.supplier)


    selectedProduct.forEach((product, index) => {
      selectedSize[index].forEach((item, indexS) => {

        const getUnitPrice = document.getElementById(`unitPrice-${product.shoeId}-${item.size}`).value
        const getQuantity = document.getElementById(`quantity-${product.shoeId}-${item.size}`).value
        const getTotal = document.getElementById(`total-${product.shoeId}-${item.size}`).textContent
        const numberTotal = parseInt(getTotal.replace(/\D/g, ''));

        newForm.append(`inventoryReportDetailCreateFormList[${indexS}].idShoeId`, product.shoeId)
        newForm.append(`inventoryReportDetailCreateFormList[${indexS}].idSize`, item.size)
        newForm.append(`inventoryReportDetailCreateFormList[${indexS}].quantity`, getQuantity)
        newForm.append(`inventoryReportDetailCreateFormList[${indexS}].unitPrice`, getUnitPrice)
        newForm.append(`inventoryReportDetailCreateFormList[${indexS}].total`, numberTotal)

        totalPrice += numberTotal
      })
    })
    newForm.append('totalPrice', totalPrice)

    newForm.forEach((value, key) => {
      console.log(key, value)
    })

    dispatch(createInventoryReportApiThunk(newForm))
      .unwrap()
      .then(() => {
        toast.success('Thêm phiếu nhập kho thành công');

        location.reload()


      })
      .catch((error) => {
        toast.error(`Thêm phiếu nhập kho thất bại: ${error}`);

        console.error(error)
      });
  }

  const handleRemoveProduct = (index) => {

    const newSelectedProduct = [...selectedProduct];
    let totalPrice = finalTotal;


    newSelectedProduct.splice(index, 1);

    setSelectedProduct(newSelectedProduct);


    selectedProduct.forEach((product, indexP) => {
      selectedSize[indexP].forEach((item, indexS) => {
        if (indexP === index) {
          const getTotal = document.getElementById(`total-${product.shoeId}-${item.size}`).textContent
          const numberTotal = parseInt(getTotal.replace(/\D/g, '')) || 0;
          totalPrice -= numberTotal
        }

      })
    })

    setFinalTotal(totalPrice)


  };




  return (
    <div className={open ? 'w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
      open={open}
    >
      <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto'>
        <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
          <CloseIcon className='text-2xl' />
        </button>
        <DialogTitle className='text-center'>
          Thêm phiếu nhập
        </DialogTitle>

        <DialogContent>
          <div className='space-y-4 max-h-[30rem] pb-10' >

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplier">Nhà cung cấp</label>
              <input id='supplier_name' value={formValues.supplier} onChange={(e) => setFormValues({ ...formValues, supplier: e.target.value })} className='rounded-md' type="text" placeholder='Tên nhà cung cấp' />
              {formErrors.supplier && <p className='text-red-500 text-sm'>{formErrors.supplier}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplierPhone">Số điện thoại nhà cung cấp</label>
              <input id='supplier_phone_number' value={formValues.supplierPhone} onChange={(e) => setFormValues({ ...formValues, supplierPhone: e.target.value })} className='rounded-md' type="text" placeholder='Số điện thoại nhà cung cấp' />
              {formErrors.supplierPhone && <p className='text-red-500 text-sm'>{formErrors.supplierPhone}</p>}
            </div>

            <div className='flex items-center justify-between' ref={productRef}>
              <label className='font-semibold' htmlFor="product">Sản phẩm</label>
              <Tooltip title="Thêm sản phẩm">
                <IconButton onClick={() => setProductOpen(true)}>
                  <IoMdAdd size={20} />
                </IconButton>
              </Tooltip>
            </div>

            {
              selectedProduct.length === 0 && (
                <p className='text-center text-gray-500'>Chưa chọn sản phẩm</p>
              )
            }

            {selectedProduct.length > 0 && selectedProduct.map((product, index) => (
              <div key={index} className='space-y-4 border relative p-2 rounded-md'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={() => handleRemoveProduct(index)}>
                  <CloseIcon className='text-2xl' />
                </button>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Tên sản phẩm</label>
                  <input type="text" className='rounded-md' value={product.shoeName} readOnly />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Chọn size</label>
                  {product.shoeSizes.map((item) => (
                    <div key={item.size} className='flex gap-2 items-center'>
                      <Checkbox
                        value={item}
                        onChange={() => handleSizeChange(index, item)}
                      />
                      <label className='block text-sm'>{item.size}</label>
                    </div>
                  ))}
                </div>
                {/* Hiển thị ô nhập đơn giá và số lượng cho từng size đã chọn */}
                {selectedSize[index] && selectedSize[index].map((size, idx) => (
                  <div key={size.size} className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2 border p-3 rounded-md' >
                      <p className='font-semibold text-lg'>size {size.size}</p>
                      <label className='font-semibold' htmlFor={`unitPrice-${index}-${idx}`}>Đơn giá</label>
                      <input
                        id={`unitPrice-${product.shoeId}-${size.size}`}
                        className='rounded-md'
                        type="number"
                        min={0}
                        placeholder='Đơn giá'
                        onChange={() => handleUnitPriceChange(size, product)}
                      />
                      <p id={`unitPrice-${product.shoeId}-${size.size}-err`} className='text-red-500 text-sm'></p>
                      <label className='font-semibold' htmlFor={`quantity-${index}-${idx}`}>Số lượng</label>
                      <input
                        id={`quantity-${product.shoeId}-${size.size}`}
                        className='rounded-md'
                        type="number"
                        min={0}
                        placeholder='0'
                        onChange={() => handleQuantityChange(size, product)}
                      />
                      <p id={`quantity-${product.shoeId}-${size.size}-err`} className='text-red-500 text-sm'></p>
                      {formErrors.inventoryReportDetailCreateFormList[index]?.quantity && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.quantity}</p>}
                      <label className='font-semibold' htmlFor={`total-${product.shoeId}-${size.size}`}>Tổng</label>
                      <span id={`total-${product.shoeId}-${size.size}`}> 0 vnd</span>

                    </div>
                  </div>
                ))}
              </div>
            ))}


            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
              <span className='flex items-center gap-2'>
                {FormatPrice(finalTotal)}
                
              </span>
            </div>

            {formErrors.products && <p className='text-red-500 text-sm'>{formErrors.products}</p>}
            <button onClick={handleSubmit} className="w-full flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
            >Thêm phiếu Nhập</button>
          </div>
        </DialogContent>
      </div>

      <div>
        <ProductsSelectedIventory
          isOpen={productOpen}
          products={products.data.content}
          handleOpen={handleProductOpen}
          productTypes={shoetypes.data}
          filterValues={filterValues}
          onFilterSelect={setFilterValues}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ProductBrands={brands.data}
          selectedProducts={selectedProduct}
          setSelectedProducts={setSelectedProduct}

        />

      </div>
    </div>
  )
}

export default AddInventoryDialog