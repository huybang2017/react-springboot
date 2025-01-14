import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const VoucherDiscountAmountDialog = ({
    isOpen,
    handleOpen,
    onChangeFilterValue,
    filterValue
}) => {
    const [minDiscountAmount, setMinDiscountAmount] = useState(0);
    const [maxDiscountAmount, setMaxDiscountAmount] = useState(0);
    const [error, setError] = useState('');
    useEffect(()=> {
        setMinDiscountAmount(filterValue.minDiscountAmount ? filterValue.minDiscountAmount : 0)
        setMaxDiscountAmount(filterValue.maxDiscountAmount ? filterValue.maxDiscountAmount : 0)
    },[filterValue.minDiscountAmount, filterValue.maxDiscountAmount]) 
 
    const onSubmit = () => {
        let valid = true;
        setError('');

        if (parseFloat(minDiscountAmount) >= parseFloat(maxDiscountAmount)) {
            setError('Giá thấp phải nhỏ hơn giá cao');
            valid = false;
        }else{
            setError('')
        }
        if(parseFloat(minDiscountAmount) > 1000000000){
            setError('Giá thấp phải nhỏ hơn 1 tỷ');
            valid = false
        }else{
            setError('')
        }

        if(parseFloat(maxDiscountAmount) > 1000000000){
            setError('Giá cao phải nhỏ hơn 1 tỷ');
            valid = false
        }else{
            setError('')
        }


        if (valid) {
            onChangeFilterValue(prev => ({
                ...prev,
                minDiscountAmount: parseFloat(minDiscountAmount),
                maxDiscountAmount: parseFloat(maxDiscountAmount)
            }));

            handleOpen();
        }
    };




    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpen}
            aria-describedby="alert-dialog-slide-description"
            className='relative'
        >
            <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                <CloseIcon className='text-2xl' />
            </button>
            <DialogTitle className='text-center'>Lọc theo giá giảm</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="min">Từ giá</label>
                        <div className='flex items-center gap-2 '>
                            <input
                                type="number"
                                className='rounded-md'
                                value={minDiscountAmount}
                                onChange={(e) => setMinDiscountAmount(e.target.value)}
                                min={0}
                            />
                            <span className='text-black font-semibold'>VNĐ</span>
                        </div>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="min">Đến giá</label>

                        <div className='flex items-center gap-2 '>
                            <input
                                type="number"
                                className='rounded-md'
                                value={maxDiscountAmount}
                                onChange={(e) => setMaxDiscountAmount(e.target.value)}
                                min={0}
                            />
                            <span className='text-black font-semibold'>VNĐ</span>
                        </div>

                    </div>
                </div>


                {error && <p className='text-rose-500'>{error}</p>}




                <button
                    className="flex items-center justify-center h-12 bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-lg w-full py-2 px-4 focus:outline-none"
                    onClick={onSubmit}
                >
                    Lọc
                </button>

            </DialogContent>
        </Dialog>
    );
}

export default VoucherDiscountAmountDialog;
