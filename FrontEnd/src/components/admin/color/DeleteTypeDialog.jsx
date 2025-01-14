import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, Button } from '@mui/material';

import { useDispatch } from 'react-redux';

import toast from 'react-hot-toast';
import { deleteColorApiThunk } from '../../../reducers/productReducer/ColorSlice';


const DeleteColorDialog = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteColorApiThunk(data.id))
      .unwrap()
      .then(() => {
        toast.success('Màu này đã được xóa thành công!');
        handleClose(); 

        window.location.reload()
      })
      .catch((error) => {
        toast.error(`Xóa màu không thành công: ${error}`);
        console.error(error);
      });
  };



  return (
    <Dialog open={open} >
      <div className='relative w-[35rem] p-4'>
        
        <DialogTitle className='text-center'>
          Xóa màu
        </DialogTitle>
        <DialogContent>
          <div className='text-center'>
            <p>Bạn có chắc chắn muốn xóa màu "{data.colorName}"?</p>
            <div className='flex justify-center gap-4 mt-4'>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Xóa
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteColorDialog;
