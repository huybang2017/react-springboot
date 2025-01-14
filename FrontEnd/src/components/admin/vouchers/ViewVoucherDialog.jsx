import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewVoucherDialog = ({ isOpen, handleOpen, data }) => {
  return (
    <div>
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

        <div className='w-[35rem]'>
          <DialogTitle className='text-center font-semibold text-3xl'>Thông tin voucher</DialogTitle>
          <DialogContent className='space-y-2'>
          <div className='flex flex-col items-start gap-4'>
              <div className='font-semibold flex flex-col gap-2 w-full'>
                <label htmlFor="title">Tiêu đề</label>
                <input type="text" name="title" value={data.title} readOnly className='w-full rounded-md' />
              
              </div>
              <div className='font-semibold flex flex-col gap-2 w-full'>
                <label htmlFor="code">Mã giảm giá</label>
                <input type="text" name="code" value={data.code} readOnly className='w-full rounded-md' />
                
              </div>
              <div className='font-semibold flex flex-col gap-2 w-full'>
                <label htmlFor="expirationTime">Thời gian hết hạn</label>
                <input type="text" name="expirationTime" value={data.expirationTime} readOnly className='w-full rounded-md' />
                
              </div>
              <div className='font-semibold flex flex-col gap-2 w-full'>
                <label htmlFor="condition">Điều kiện giảm giá</label>
                <div className='flex items-center justify-center gap-2 w-full'>
                  <input type="number" name="condition" value={data.condition} readOnly className='w-full rounded-md'  />
                  <span>VNĐ</span>
                </div>
                
              </div>
              <div className='font-semibold flex flex-col gap-2 w-full'>
                <label htmlFor="discountAmount">Gía được giảm</label>
                <div className='flex items-center justify-center gap-2 w-full'>
                  <input type="number" name="discountAmount" value={data.discountAmount} readOnly className='w-full rounded-md'  />
                  <span>VNĐ</span>
                </div>
                
              </div>
              <div className='flex gap-4 items-center'>
                <label htmlFor="isFreeShip">FreeShip</label>
               
                <input type="text" name="discountAmount" value={data.isFreeShip ? 'Có' : 'Không'} readOnly className='w-full rounded-md'  />

                
              </div>
              <div className='flex gap-4 items-center '>
                <label htmlFor="status">Trạng thái</label>
                
                
                <input type="text" name="discountAmount" value={data.status ? 'Công khai ': 'Ẩn'} readOnly className='w-full rounded-md'  />

                
              </div>
             
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewVoucherDialog;
