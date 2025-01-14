import { DialogContent } from '@mui/material'
import { FormatPrice } from '../../FormatPrice'

import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

import { MdOutlineCancel } from 'react-icons/md'
import '../style.css'
import AxiosAdmin from '../../../apis/AxiosAdmin'
import toast from 'react-hot-toast'

const EditInventoryDialog = ({ open, handleOpen, inventoryProps }) => {
  if (!inventoryProps) {
    return null
  }
  const dispatch = useDispatch()
  const [inventory, setInventory] = useState(inventoryProps)

  const [selectedProduct, setSelectedProduct] = useState([])
  const [selectedSize, setSelectedSize] = useState([])
  const [isSubEdit, setIsSubEdit] = useState([])
  const [shoeSizes, setShoeSizes] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [total, setTotal] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [status, setStatus] = useState('')

  const [formValues, setFormValues] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    inventoryReportDetailCreateFormList: [],
  })
  const [formErrors, setFormErrors] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    size: '',
    products: '',
    inventoryReportDetailCreateFormList: [],
  })

  useEffect(() => {
    if (inventoryProps) {
      setSelectedProduct(
        inventoryProps.inventoryReportDetails.map((detail) => ({
          shoeId: detail.shoeId,
          shoeName: detail.shoeName,
        })),
      )
      setIsSubEdit(
        inventoryProps.inventoryReportDetails.map((detail, index) => false),
      )

      setOriginalData(
        inventoryProps.inventoryReportDetails.map((detail) => {
          return {
            unitPrice: detail.unitPrice,
            quantity: detail.quantity,
            total: detail.total,
          }
        }),
      )

      setUnitPrice(
        inventoryProps.inventoryReportDetails.map((detail) => detail.unitPrice),
      )
      setQuantity(
        inventoryProps.inventoryReportDetails.map((detail) => detail.quantity),
      )
      setTotal(
        inventoryProps.inventoryReportDetails.map((detail) => detail.total),
      )
      setFormValues({
        totalPrice: inventoryProps.totalPrice,
        supplier: inventoryProps.supplier,
        supplierPhone: inventoryProps.supplierPhone,
        inventoryReportDetailCreateFormList: inventory.inventoryReportDetails,
      })
      setSelectedSize(
        inventoryProps.inventoryReportDetails.map((detail) => detail.size),
      )

      setStatus(
        inventoryProps?.inventoryReportStatuses[
          inventoryProps.inventoryReportStatuses.length - 1
        ].status,
      )
    }
  }, [dispatch, inventoryProps])

  const handleUnitPriceChange = (index, value) => {
    setUnitPrice((prev) => {
      const newPrices = [...prev]
      newPrices[index] = value
      return newPrices
    })
  }

  const handleQuantityChange = (index, value) => {
    const price = shoeSizes[index].filter(
      (item) => item.size === selectedSize[index],
    )[0].price

    const total = price * parseInt(value)

    selectedProduct.forEach((product, index) => {
      if (!selectedSize[index]) {
        setFormErrors({ ...formErrors, size: 'Bạn phải chọn size trước' })
      }
    })

    setTotal((prev) => {
      const newTotal = [...prev]
      newTotal[index] = total
      return newTotal
    })
    setQuantity((prev) => {
      const newQuantities = [...prev]
      newQuantities[index] = value
      return newQuantities
    })
  }

  const validateForm = () => {
    let valid = true
    let errors = {
      totalPrice: '',
      supplier: '',
      supplierPhone: '',
      size: '',
      products: '',
      inventoryReportDetailCreateFormList: [],
    }

    if (!formValues.supplier) {
      errors.supplier = 'Nhà cung cấp không được để trống'
      valid = false
    }

    if (!formValues.supplierPhone) {
      errors.supplierPhone = 'Số điện thoại nhà cung cấp không được để trống'
      valid = false
    } else if (!/^\d{10,15}$/.test(formValues.supplierPhone)) {
      errors.supplierPhone = 'Số điện thoại không hợp lệ'
      valid = false
    }

    setFormErrors(errors)
    return valid
  }
  const validateFormDetail = () => {
    let valid = true
    let errors = {
      totalPrice: '',
      supplier: '',
      supplierPhone: '',
      size: '',
      products: '',
      inventoryReportDetailCreateFormList: [],
    }

    selectedProduct.forEach((product, index) => {
      let productErrors = {
        unitPrice: '',
        quantity: '',
        total: '',
      }

      if (!unitPrice[index]) {
        productErrors.unitPrice = 'Đơn giá không được để trống'
        valid = false
      } else if (isNaN(unitPrice[index]) || parseFloat(unitPrice[index]) <= 0) {
        productErrors.unitPrice = 'Đơn giá phải là số dương'
        valid = false
      }

      if (!quantity[index]) {
        productErrors.quantity = 'Số lượng không được để trống'
        valid = false
      } else if (isNaN(quantity[index]) || parseInt(quantity[index], 10) <= 0) {
        productErrors.quantity = 'Số lượng phải là số dương'
        valid = false
      }

      errors.inventoryReportDetailCreateFormList[index] = productErrors
    })

    setFormErrors(errors)
    return valid
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    const newForm = new FormData()
    newForm.append('totalPrice', formValues.totalPrice)
    newForm.append('supplierPhone', formValues.supplierPhone)
    newForm.append('supplier', formValues.supplier)
    newForm.append('id', inventory.id)

    try {
      const response = await AxiosAdmin.patch(
        `${import.meta.env.VITE_API_URL}/InventoryReport`,
        newForm,
      )
      if (response.data) {
        toast.success('Sửa thông tin phiếu nhập thành công')
        handleOpen()
      }
    } catch (error) {
      toast.error('Sửa thông tin phiếu nhập thất bại')
    }
  }

  const handleStatusChange = async (value) => {
    setStatus(value)
    try {
      const newForm = new FormData()
      newForm.append('inventoryReportId', inventory.id)
      newForm.append('idStatus', value)
      const response = await AxiosAdmin.post(
        `${import.meta.env.VITE_API_URL}/InventoryReportStatus`,
        newForm,
      )
      if (response.data) {
        toast.success('Sửa trạng thái thành công')
        location.reload()
      }
    } catch (error) {
      toast.error('Sửa trạng thái thất bại')
    }
  }

  const handleSizeChange = (index, value) => {
    const price = shoeSizes[index].unitPrice
    const total = price * parseInt(quantity[index])

    setTotal((prev) => {
      const newTotal = [...prev]
      newTotal[index] = total
      return newTotal
    })

    setSelectedSize((prev) => {
      const newSizes = [...prev]
      newSizes[index] = value
      return newSizes
    })
  }

  const handleEditToggle = async (index) => {
    const newSubEdit = Array(isSubEdit.length).fill(false)

    newSubEdit[index] = true

    const product = inventory.inventoryReportDetails[index]
    const response = await AxiosAdmin.get(
      `${import.meta.env.VITE_API_URL}/ShoeSize/${product.shoeId}`,
    )

    setShoeSizes((prev) => {
      const newSize = [...prev]
      newSize[index] = response.data
      return newSize
    })

    setIsSubEdit(newSubEdit)
  }

  const handleSaveEdit = async (index) => {
    if (!validateFormDetail()) {
      return
    }

    const newForm = new FormData()
    newForm.append('idInventoryReportId', inventory.id)
    newForm.append('idShoeId', selectedProduct[index].shoeId)
    newForm.append('idSize', selectedSize[index])
    newForm.append('quantity', quantity[index])
    newForm.append('unitPrice', unitPrice[index])
    newForm.append('total', total[index])

    try {
      const response = await AxiosAdmin.patch(
        `${import.meta.env.VITE_API_URL}/InventoryReportDetail`,
        newForm,
      )
      if (response.data) {
        toast.success('Sửa thông tin sản phẩm thành công')
      }
    } catch (error) {
      toast.error('Sửa thông tin sản phẩm thất bại')
    }

    setIsSubEdit((prev) => {
      const newSubEdit = [...prev]
      newSubEdit[index] = false
      return newSubEdit
    })
  }

  const handleCancelEdit = (index) => {
    setQuantity((prev) => {
      const newQuantities = [...prev]
      newQuantities[index] = originalData[index].quantity
      return newQuantities
    })

    setUnitPrice((prev) => {
      const newUnitPrices = [...prev]
      newUnitPrices[index] = originalData[index].unitPrice
      return newUnitPrices
    })

    setTotal((prev) => {
      const newTotal = [...prev]
      newTotal[index] = originalData[index].total
      return newTotal
    })

    setIsSubEdit((prev) => {
      const newSubEdit = [...prev]
      newSubEdit[index] = !newSubEdit[index]
      return newSubEdit
    })
  }

  const handleDeleteProduct = async (idShoeId, idSize) => {
    const newForm = new FormData()
    newForm.append('idInventoryReportId', inventory.id)
    newForm.append('idShoeId', idShoeId)
    newForm.append('idSize', idSize)
    newForm.forEach((value, key) => {
      console.log(key + ' = ' + value)
    })
    try {
      const response = await AxiosAdmin.delete(
        `${import.meta.env.VITE_API_URL}/InventoryReportDetail`,
        newForm,
      )
      if (response.status === 204) {
        toast.success('Xóa sản phẩm thành công')
        handleOpen()
        setInventory((prev) => {
          const newInventory = { ...prev }
          newInventory.inventoryReportDetails =
            newInventory.inventoryReportDetails.filter(
              (item) => item.shoeId !== idShoeId || item.size !== idSize,
            )
          return newInventory
        })
      }
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại')
      console.log(error)
    }
  }

  const finalTotal = () => {
    const totalFinal = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )

    return totalFinal
  }

  return (
    <div
      className={
        open
          ? 'w-full h-screen animation animate-dropdown fixed left-0 top-0 overflow-hidden flex items-center justify-center '
          : 'hidden'
      }
    >
      <div className="relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">Sửa phiếu nhập</DialogTitle>

        <DialogContent>
          <div className="space-y-4 max-h-[500px] pb-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="supplier">
                Nhà cung cấp
              </label>
              <input
                value={formValues.supplier}
                onChange={(e) =>
                  setFormValues({ ...formValues, supplier: e.target.value })
                }
                className="rounded-md"
                type="text"
                placeholder="Tên nhà cung cấp"
              />
              {formErrors.supplier && (
                <p className="text-red-500 text-sm">{formErrors.supplier}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="supplierPhone">
                Số điện thoại nhà cung cấp
              </label>
              <input
                value={formValues.supplierPhone}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    supplierPhone: e.target.value,
                  })
                }
                className="rounded-md"
                type="text"
                placeholder="Sdt"
              />
              {formErrors.supplierPhone && (
                <p className="text-red-500 text-sm">
                  {formErrors.supplierPhone}
                </p>
              )}
            </div>

            {selectedProduct.length > 0 &&
              selectedProduct.map((product, index) => (
                <div
                  key={index}
                  className="space-y-4 border relative p-2 rounded-md"
                >
                  <div className="flex items-center relative justify-end gap-2 ">
                    {/* <button
                                        className={`${isSubEdit[index] ? 'hidden' : 'flex'} top-1 right-1 bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition`}
                                        onClick={() => handleEditToggle(index)}
                                    >
                                        <FaRegEdit size={16} />
                                    </button>
                                    <button
                                        className={`top-1 right-1 bg-rose-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition`}
                                        onClick={() => handleDeleteProduct(product.shoeId, selectedSize[index])}
                                    >
                                        <FaTrash size={16} />
                                    </button> */}

                    <button
                      className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-rose-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition`}
                      onClick={() => handleCancelEdit(index)}
                    >
                      <MdOutlineCancel size={16} />
                    </button>

                    <button
                      className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-sky-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-sky-700 transition`}
                      onClick={() => handleSaveEdit(index)}
                    >
                      <FaCheck size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                      type="text"
                      className="rounded-md"
                      value={product.shoeName}
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="size">Size</label>

                    {isSubEdit[index] ? (
                      <div>
                        {shoeSizes.length > 0 && (
                          <select
                            value={selectedSize[index]}
                            className="rounded-md w-full"
                            onChange={(e) =>
                              handleSizeChange(index, e.target.value)
                            }
                          >
                            {shoeSizes[index].map((item) => (
                              <option value={item.size}>{item.size}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ) : (
                      <input
                        readOnly
                        value={selectedSize[index]}
                        className="rounded-md w-full"
                        type="text"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="unitPrice">
                      đơn vị giá
                    </label>
                    {isSubEdit[index] ? (
                      <input
                        className="rounded-md"
                        value={unitPrice[index] || ''}
                        onChange={(e) =>
                          handleUnitPriceChange(index, e.target.value)
                        }
                        type="text"
                        placeholder="Đơn vị giá"
                      />
                    ) : (
                      <input
                        className="rounded-md"
                        readOnly
                        value={unitPrice[index] || ''}
                        onChange={(e) =>
                          handleUnitPriceChange(index, e.target.value)
                        }
                        type="text"
                        placeholder="Đơn vị giá"
                      />
                    )}
                    {formErrors.inventoryReportDetailCreateFormList[index]
                      ?.unitPrice && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.inventoryReportDetailCreateFormList[index]
                            ?.unitPrice
                        }
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="quantity">
                      Số lượng
                    </label>
                    {isSubEdit[index] ? (
                      <input
                        className="rounded-md"
                        value={quantity[index] || ''}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        type="number"
                        min={0}
                        placeholder="0"
                      />
                    ) : (
                      <input
                        className="rounded-md"
                        readOnly
                        value={quantity[index] || ''}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        type="number"
                        min={0}
                        placeholder="0"
                      />
                    )}
                    {formErrors.inventoryReportDetailCreateFormList[index]
                      ?.quantity && (
                      <p className="text-red-500 text-sm">
                        {
                          formErrors.inventoryReportDetailCreateFormList[index]
                            ?.quantity
                        }
                      </p>
                    )}
                  </div>
                  {formErrors.size && (
                    <p className="text-red-500 text-sm">{formErrors.size}</p>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="total">
                      Tổng
                    </label>
                    <span>
                      {total[index] ? FormatPrice(total[index]) : '0đ'}
                    </span>
                  </div>
                </div>
              ))}

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="totalPrice">
                Trạng thái
              </label>
              <select
                className="rounded-md"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="ChoNhapKho">Chờ nhập kho</option>
                <option value="DaNhapKho">Đã nhập kho</option>
                <option value="Huy">Hủy</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="totalPrice">
                Tổng giá
              </label>
              <span className="flex items-center gap-2">
                {FormatPrice(finalTotal())}
              </span>
            </div>

            {formErrors.theSame && (
              <p className="text-red-500 text-sm">{formErrors.theSame}</p>
            )}
            <button
              onClick={() => handleSubmit()}
              className="w-full flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
            >
              Lưu
            </button>
          </div>
        </DialogContent>
      </div>
    </div>
  )
}

export default EditInventoryDialog
