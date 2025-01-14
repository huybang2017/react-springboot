import { DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import "../style.css";

const ViewInventoryDialog = ({
    open,
    handleOpen,
    inventory
}) => {
    if (!inventory) {
        return null;
    }

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [unitPrice, setUnitPrice] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        if (inventory) {
            setSelectedProduct(inventory.inventoryReportDetails.map((detail) => ({
                shoeId: detail.shoeId,
                shoeName: detail.shoeName
            })));
            setUnitPrice(inventory.inventoryReportDetails.map(detail => detail.unitPrice));
            setQuantity(inventory.inventoryReportDetails.map(detail => detail.quantity));
            setTotal(inventory.inventoryReportDetails.map(detail => detail.total));
            setSelectedSize(inventory.inventoryReportDetails.map(detail => detail.size));
        }
    }, [inventory]);

    const finalTotal = () => {
        const totalFinal = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return totalFinal;
    }

    return (
        <div className={open ? 'w-full h-screen animation animate-dropdown fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}>
            <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md overflow-y-auto'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>
                <DialogTitle className='text-center'>
                    Xem phiếu nhập
                </DialogTitle>

                <DialogContent>
                    <div className='space-y-4 max-h-[500px] pb-10' >
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="supplier">Nhà cung cấp</label>
                            <input value={inventory.supplier} className='rounded-md' type="text" readOnly />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="supplierPhone">Số điện thoại nhà cung cấp</label>
                            <input value={inventory.supplierPhone} className='rounded-md' type="text" readOnly />
                        </div>

                        {selectedProduct.length > 0 && selectedProduct.map((product, index) => (
                            <div key={index} className='space-y-4 border relative p-2 rounded-md'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <input type="text" className='rounded-md' value={product.shoeName} readOnly />
                                </div>

                                <input readOnly value={selectedSize[index]} className='rounded-md w-full' type='text' />

                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="unitPrice">Đơn giá</label>
                                    <input className='rounded-md' value={(unitPrice[index] || '').toLocaleString()} type="text" readOnly />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                                    <input className='rounded-md' value={quantity[index] || ''} type="number" readOnly />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="total">Tổng</label>
                                    <span>{ (total[index] ? total[index] : '0').toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        ))}

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
                            <span className='flex items-center gap-2'>
                                {finalTotal().toLocaleString()} VNĐ
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </div>
    )
}

export default ViewInventoryDialog;
