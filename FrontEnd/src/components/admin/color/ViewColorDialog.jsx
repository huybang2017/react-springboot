import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

const ViewColorDialog = ({ open, handleOpen, data }) => {

    const [formValues, setFormValues] = useState({
        id: '',
        colorName: ''
    });

    useEffect(() => {
        setFormValues({
            id: data.id,
            colorName: data.colorName
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
                    Xem màu 
                </DialogTitle>
                <DialogContent>
                    <div className="space-y-5" >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="colorName" className="font-semibold">Tên màu </label>
                            <input
                                type="text"
                                placeholder="Nhập tên màu"
                                className="rounded-md"
                                name="colorName"
                                value={formValues.colorName}
                                readOnly
                            />

                        </div>

                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default ViewColorDialog;
