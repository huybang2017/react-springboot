



import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const DeleteVoucherDialog = ({
    isOpen,
    handleOpen,
    values
}) => {


    const onClick = () => {
        console.log(values)
    }
    return (
        <div>
            <Dialog open={isOpen}>
                <DialogTitle>Delete Voucher</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete voucher with code {values.voucherCode}?
                </DialogContent>
                <DialogActions>
                    <button onClick={onClick}>Delete</button>
                    <button onClick={handleOpen}>Cancel</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteVoucherDialog