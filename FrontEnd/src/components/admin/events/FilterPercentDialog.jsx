import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';


import '../style.css'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FilterPercentDialog = ({ isOpen, handleOpen, onChangeFilterValue }) => {
    const [minPercent, setMinPercent] = useState(0);
    const [maxPercent, setMaxPercent] = useState(0);
    const [error, setError] = useState('');


    const onSubmit = () => {
        let valid = true;


        if (parseFloat(minPercent) >= parseFloat(maxPercent)) {
            setError('% thấp phải nhỏ hơn % cao');
            valid = false;
        }




        if (valid) {
            onChangeFilterValue(prev => ({
                ...prev,
                minPercent: parseFloat(minPercent),
                maxPercent: parseFloat(maxPercent)
            }));

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
            <DialogTitle className='text-center'>Lọc theo phần trăm giảm</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="min">Từ %</label>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                className='rounded-md no-spinner w-[10rem]'
                                min={0}
                                max={100}
                                placeholder='Nhập số 0 - 100'
                                value={minPercent}
                                onChange={(e) => setMinPercent(e.target.value)}
                            />
                            <span className='text-black font-semibold'>%</span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="max">Đến %</label>
                        <div className='flex items-center gap-2'>
                            <input
                                type="number"
                                className='rounded-md no-spinner w-[10rem]'
                                placeholder='Nhập số 0 - 100'

                                min={0}
                                max={100}
                                value={maxPercent}
                                onChange={(e) => setMaxPercent(e.target.value)}
                            />
                            <span className='text-black font-semibold'>%</span>
                        </div>

                    </div>
                </div>

                {error && <p className='text-rose-500'>{error}</p>}

                <button
                    type="button"
                    className="w-full flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                    onClick={onSubmit}
                >
                    Lọc
                </button>

            </DialogContent>
        </Dialog>
    );
}

export default FilterPercentDialog;
