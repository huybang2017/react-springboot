import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VoucherConditionDialog = ({ isOpen, handleOpen, onChangeFilterValue, filterValue }) => {
    const [minCondition, setMinCondition] = useState(0);
    const [maxCondition, setMaxCondition] = useState(0);
    const [error, setError] = useState('');


    useEffect(()=> {
        setMinCondition(filterValue.minCondition ? filterValue.minCondition : 0)
        setMaxCondition(filterValue.maxCondition ? filterValue.maxCondition : 0)
    },[filterValue.maxCondition, filterValue.minCondition]) 

    const onSubmit = () => {
        let valid = true

        if (parseFloat(minCondition) >= parseFloat(maxCondition)) {
            setError('`Từ giá` phải thấp hơn `Đến giá`');
            valid = false
        }else{
            setError('')
        }

        if(parseFloat(minCondition) > 1000000000){
            setError('Giá trị bộ lọc phải nhỏ hơn 1 tỷ');
            valid = false
        }else{
            setError('')
        }

        if(parseFloat(maxCondition) > 1000000000){
            setError('Giá trị bộ lọc phải nhỏ hơn 1 tỷ');
            valid = false
        }else{
            setError('')
        }


        if (valid) {
            onChangeFilterValue(prev => ({
                ...prev,
                minCondition: parseFloat(minCondition),
                maxCondition: parseFloat(maxCondition)
            }));

            handleOpen()
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
            <button
                className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition'
                onClick={handleOpen}
            >
                <CloseIcon className='text-2xl' />
            </button>
            <DialogTitle className='text-center'>Lọc theo điều kiện giá</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="min">Từ giá</label>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                className='rounded-md'
                                min={0}
                                value={minCondition}
                                onChange={(e) => setMinCondition(e.target.value)}
                            />
                            <span className='text-black font-semibold'>VNĐ</span>
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="max">Đến giá</label>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                className='rounded-md'
                                min={0}
                                value={maxCondition}
                                onChange={(e) => setMaxCondition(e.target.value)}
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

export default VoucherConditionDialog;
