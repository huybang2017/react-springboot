import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getShoeSizesApiThunk } from '../../../reducers/productReducer/ShoeSizeSlice';

const SizeSelected = ({
    open,
    handleOpen,
    shoeId,
    setSizeSelected
}) => {

    if (!shoeId) {
        return null;
    }

    const dispatch = useDispatch();
    const sizes = useSelector(state => state.shoeSizeReducer.data);
    const [shoeSizeSelected, setShoeSizeSelected] = useState('');
    const [messageError, setMessageError] = useState({
        message: '',
        status: false
    });

    useEffect(() => {
        dispatch(getShoeSizesApiThunk(shoeId));
    }, [shoeId, dispatch]);

    const handleSubmit = () => {
        if (shoeSizeSelected === '') {
            setMessageError({ message: 'Vui lòng chọn size', status: true });
            return;
        }

        setMessageError({ message: '', status: false });
        setSizeSelected((prev)=> [...prev, shoeSizeSelected]);
        handleOpen();
    };

    return (
        <Dialog open={open}>
            <div className='relative w-[35rem] space-y-4 pb-3 px-2'>
                <button 
                    className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' 
                    onClick={handleOpen}>
                    <IoMdClose className='text-2xl' />
                </button>
                <DialogTitle className='text-center'>
                    Chọn size cho sản phẩm
                </DialogTitle>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold' htmlFor="shoeTypeId">Size</label>
                    <select
                        id="shoeTypeId"
                        className='rounded-md'
                        value={shoeSizeSelected}
                        onChange={(e) => setShoeSizeSelected(e.target.value)}
                    >
                        <option value=""></option>
                        {sizes.map((item) => (
                            <option key={item.size} value={item.size}>{item.size}</option>
                        ))}
                    </select>

                    {messageError.status && <span className='text-xs font-semibold text-rose-500'>{messageError.message}</span>}
                </div>

                <button 
                    onClick={handleSubmit} 
                    className='bg-blue-600 w-full text-white rounded-md py-2 hover:bg-blue-700 transition'>
                    Lưu
                </button>
            </div>
        </Dialog>
    )
}

export default SizeSelected;
