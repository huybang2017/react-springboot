import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaEdit, FaEye, FaSortUp, FaSortDown } from "react-icons/fa";
import EditVoucherDialog from './EditVoucherDialog';
import ViewVoucherDialog from './ViewVoucherDialog';
import { LuLoader2 } from 'react-icons/lu';

export default function TableVoucher({ vouchers, filterValues, onChangeFilter, status }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const [isViewVoucher, setIsViewVoucher] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen);
    };

    const handleViewOpen = () => {
        setIsViewVoucher(!isViewVoucher);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        onChangeFilter({ ...filterValues, sort: `${key},${direction}` });
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        {[
                            { label: 'Id', key: 'voucherId', width: '10%' },
                            { label: 'Tiêu đề', key: 'title', width: '20%' },
                            { label: 'Mã', key: 'code', width: '15%' },
                            { label: 'Trạng thái', key: 'status', width: '10%' },
                            { label: 'Thời gian hết hạn', key: 'expirationTime', width: '15%' },
                            { label: 'Free Ship', key: 'isFreeShip', width: '10%' },
                            { label: 'Giá điều kiện', key: 'condition', width: '10%' },
                            { label: 'Giá giảm', key: 'discountAmount', width: '10%' },
                        ].map(({ label, key, width }) => (
                            <TableCell
                                key={key}
                                style={{
                                    width,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word'
                                }}
                                className='cursor-pointer flex items-center'
                                onClick={() => handleSort(key)}
                            >
                                <div className='flex items-center gap-2'>
                                    {label} {getSortIcon(key)}
                                </div>
                            </TableCell>
                        ))}
                        <TableCell style={{ width: '5%' }}>Sửa</TableCell>
                        <TableCell style={{ width: '5%' }}>Xem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {status !== 'loading' && vouchers && vouchers.map((voucher, index) => (
                        <TableRow key={index} hover role="checkbox">
                            <TableCell>{voucher.voucherId}</TableCell>
                            <TableCell
                                className='max-w-sm'
                                style={{
                                    overflow: 'visible',
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word'
                                }}
                            >
                                {voucher.title}
                            </TableCell>

                            <TableCell className='truncate max-w-sm' style={{
                                overflow: 'visible',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word'
                            }}>{voucher.code}</TableCell>
                            <TableCell >{voucher.status ? 'Công khai' : 'Ẩn'}</TableCell>
                            <TableCell>{voucher.expirationTime}</TableCell>
                            <TableCell>{voucher.isFreeShip ? 'Có' : 'Không'}</TableCell>
                            <TableCell style={{
                                overflow: 'visible',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word'
                            }} className=' max-w-sm'>{voucher.condition}</TableCell>
                            <TableCell style={{
                                overflow: 'visible',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word'
                            }} className=' max-w-sm'>{voucher.discountAmount}</TableCell>
                            <TableCell>
                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                    onClick={() => { setIsEditOpen(true); setCurrentVoucher(voucher); }}>
                                    <FaEdit size={20} />
                                </button>
                            </TableCell>
                            <TableCell>
                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                    onClick={() => { setIsViewVoucher(true); setCurrentVoucher(voucher); }}>
                                    <FaEye size={20} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {status !== 'loading' && vouchers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                                Không tìm thấy bất cứ Voucher nào.
                            </TableCell>
                        </TableRow>
                    )}
                    {status === 'loading' && (
                        <TableRow>
                            <TableCell className='flex items-center justify-center w-full' colSpan={10} style={{ textAlign: 'center' }}>
                                <LuLoader2 size={30} className='animate-spin' />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {currentVoucher && (
                <EditVoucherDialog
                    isOpen={isEditOpen}
                    handleOpen={handleEditOpen}
                    data={currentVoucher}
                />
            )}

            {currentVoucher && (
                <ViewVoucherDialog
                    isOpen={isViewVoucher}
                    handleOpen={handleViewOpen}
                    data={currentVoucher}
                />
            )}
        </div>
    );
}
