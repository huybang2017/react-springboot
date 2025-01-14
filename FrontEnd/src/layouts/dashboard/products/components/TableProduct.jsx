import * as React from 'react';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const TableProduct = ({
  products,
  filterValues,
  onChangeFilter,
}) => {
  if (!products) {
    return null;
  }
  const navigate = useNavigate();

  const handleSort = (field) => {
    onChangeFilter((prev) => {
      const [currentField, currentDirection] = prev.sort.split(',');
      const newDirection = currentField === field && currentDirection === 'asc' ? 'desc' : 'asc';
      return { ...prev, sort: `${field},${newDirection}` };
    });
  };

  const renderSortButton = (field, label) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-x-2">
      {label}
      {filterValues?.sort.startsWith(field) && (
        <span className={`ml-2 ${filterValues?.sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
          {filterValues?.sort.endsWith('asc') ? '▲' : '▼'}
        </span>
      )}
    </button>
  );

  const handleRedirect = (status, shoeId) => {
    if (status && shoeId) {
      const url = `${window.location.origin}/products/${shoeId}`; 
      const newTab = window.open(url, '_blank', 'noopener,noreferrer'); 
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        toast.error("Trình duyệt đã chặn cửa sổ bật lên. Vui lòng kiểm tra cài đặt trình duyệt.");
      }
    } else {
      toast.error("Sản phẩm không được hiển thị");
    }
  };

  return (
    <>
      <section className="w-full px-4 mx-auto inline-block bg-[#f6f8fa] box-border p-3 rounded-md">
        <div className="flex flex-col w-full">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 cursor-pointer text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '80px' }}>
                        {renderSortButton('shoeId', 'Id')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100px' }}>
                        Ảnh
                      </th>
                      <th className="px-4 py-3.5 cursor-pointer text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '250px' }}>
                        {renderSortButton('shoeName', 'Tên sản phẩm')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '120px' }}>
                        {renderSortButton('status', 'Trạng thái')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '120px' }}>
                        {renderSortButton('createDate', 'Ngày tạo')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100px' }}>
                        {renderSortButton('priority', 'Ưu tiên')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '150px' }}>
                        {renderSortButton('brand', 'Thương hiệu')}
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100px' }}>
                        {renderSortButton('shoeType', 'Loại')}
                      </th>
                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400" style={{ width: '80px' }}>
                        Xem
                      </th>
                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400" style={{ width: '80px' }}>
                        Sửa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {products?.length > 0 ? products.map((product) => (
                      <tr key={product.shoeId}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{product?.shoeId}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product?.defaultImage}`}
                            alt=""
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                          <span onClick={()=> handleRedirect(product?.status, product?.shoeId)} className='cursor-pointer hover:underline transition'>{product?.shoeName}</span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${product.status ? "text-emerald-500" : "bg-red-500 text-white"} bg-emerald-100/60 dark:bg-gray-800`}>
                            <span className="text-sm font-normal">
                              {product.status ? 'Hiển thị' : 'Ẩn'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{product?.createDate}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.priority ? (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                              <span>Có</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                              <span>Không</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{product?.brand?.brandName}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{product?.shoeType?.shoeTypeName}</span>
                        </td>
                        <td className="relative py-3.5 px-4">
                          <button
                            type="button"
                            className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                            onClick={() => navigate(`/dashboard/products/${product?.shoeId}`)}
                          >
                            <FaEye size={20} />
                          </button>
                        </td>
                        <td className="relative py-3.5 px-4">
                          <button
                            type="button"
                            className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                            onClick={() => navigate(`/dashboard/products/edit/${product?.shoeId}`)}
                          >
                            <FaEdit size={20} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr className='w-full flex items-center justify-center text-center py-4'>
                        <td colSpan={10}>
                          <p className='text-zinc-400'>Không có sản phẩm nào</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableProduct;
