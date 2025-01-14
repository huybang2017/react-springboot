import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { IoMdClose } from 'react-icons/io'

const ViewBrandDialog = ({ open, handleOpen, data }) => {
  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="relative w-[35rem] space-y-2">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">Thông tin thương hiệu</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="brandName" className="font-semibold">
                  Tên thương hiệu
                </label>
                <input
                  value={data.brandName}
                  type="text"
                  className="rounded-md w-full"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="brandLogo" className="font-semibold">
                  Logo thương hiệu
                </label>
                <div className="flex items-center justify-center">
                  <div className="relative h-20 w-20">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/Brand/Image/${data.logo}`}
                      alt="BrandImage"
                      className="rounded-md w-[5rem] h-[5rem] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default ViewBrandDialog
