import React, { useState } from 'react';
import '../style.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StatisticDetailProduct from './StatisticDetailProduct';
import { FormatPrice } from '../../../components/FormatPrice';

const TableProduct = ({ topProducts, productsData, minDate, maxDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState();

    return (
        <div className='space-y-10'>
            {topProducts?.length === 0 && productsData?.length === 0 && (
                <div className='text-center text-red-500'>
                    Không tìm thấy sản phẩm nào
                </div>
            )}
            <div className="award-podium">
                {productsData?.length > 0 && topProducts?.map((product, index) => (
                    <div key={product?.id} className={`podium podium-${index + 1} cursor-pointer`}>
                        <div className="person">
                            {index === 0 && <span role="img" aria-label="gold-cup">🏆</span>}
                            {index === 1 && <span role="img" aria-label="silver-cup">🥈</span>}
                            {index === 2 && <span role="img" aria-label="bronze-cup">🥉</span>}
                        </div>
                        <div className="brand overflow-hidden text-sm font-semibold">
                            <div className='tracking-tighter max-h-10 overflow-hidden box-border'>
                                <p className='whitespace-normal break-words'>{product?.shoeName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <Table className='border'>
                    {productsData?.length > 0 && (
                        <TableHead className='bg-[#f9fafb]'>
                            <TableRow>
                                <TableCell className='w-10'>STT</TableCell>
                                <TableCell className='w-64'>Tên sản phẩm</TableCell>
                                <TableCell className='w-32'>Số lượng bán</TableCell>
                                <TableCell className='w-32'>Tổng thu nhập</TableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {productsData?.length > 0 && productsData?.map((product, index) => (
                            <TableRow 
                                className='hover:bg-zinc-300 transition cursor-pointer' 
                                key={product.shoeId} 
                                onClick={() => { setIsOpen(true); setCurrentProduct(product); }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <div className='max-h-20 overflow-hidden'>
                                        <p className='whitespace-normal break-words'>{product.shoeName}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{FormatPrice(product.total)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                {currentProduct && (
                    <StatisticDetailProduct
                        isOpen={isOpen}
                        handleOpen={() => setIsOpen(!isOpen)}
                        data={currentProduct}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                )}
            </div>
        </div>
    );
};

export default TableProduct;
