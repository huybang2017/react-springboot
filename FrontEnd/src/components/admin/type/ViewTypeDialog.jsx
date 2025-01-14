import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

const ViewTypeDialog = ({ open, handleOpen, data }) => {

  const [formValues, setFormValues] = useState({
    shoeTypeId: '',
    shoeTypeName: ''
  });

  useEffect(() => {
    setFormValues({
      shoeTypeId: data.shoeTypeId,
      shoeTypeName: data.shoeTypeName
    });
  }, [data]);

  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="relative w-[35rem]">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">
          Xem loại sản phẩm {data.shoeTypeName}
        </DialogTitle>
        <DialogContent>
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="shoeTypeName" className="font-semibold">Tên loại sản phẩm</label>
              <input
                type="text"
                placeholder="Tên loại sản phẩm"
                className="rounded-md"
                name="shoeTypeName"
                value={formValues.shoeTypeName}
                readOnly
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ViewTypeDialog;
