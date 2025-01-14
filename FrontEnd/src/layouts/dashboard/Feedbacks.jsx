import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableFeedback from '../../components/admin/feedbacks/TableFeedback.jsx';

const Feedbacks = () => {
    const [search, setSearch] = useState('');
    const [checkedStatus, setCheckedStatus] = useState('');
    const [fromDate, setFromDate] = useState(null); 
    const [toDate, setToDate] = useState(null); 

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCheckedStatusChange = (e) => {
        setCheckedStatus(e.target.value);
    };

    const handleFromDateChange = (date) => {
        setFromDate(date);
    };

    const handleToDateChange = (date) => {
        setToDate(date);
    };

    // Format Date object to "dd/MM/yyyy" string
    const formatDateString = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formattedFromDate = formatDateString(fromDate);
    const formattedToDate = formatDateString(toDate);

    return (
        <>
            <div className="h-[90.2vh]">
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Quản lý feedback của khách hàng
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end justify-between sm:divide-x sm:divide-gray-100 dark:divide-gray-700">
                            <div className="flex items-end mb-4 sm:mb-0 space-x-4">
                                <form className="sm:pr-3" action="#" method="GET">
                                    <div className="relative w-full sm:w-64 xl:w-96">
                                        <input
                                            type="text"
                                            name="search"
                                            id="feedback-search"
                                            value={search}
                                            onChange={handleSearchChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Tìm kiếm theo tiêu đề"
                                        />
                                    </div>
                                </form>
                                <div className="flex flex-col space-y-3">
                                    <label htmlFor="checkedStatus" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Tình trạng
                                    </label>
                                    <select
                                        id="checkedStatus"
                                        name="checkedStatus"
                                        value={checkedStatus}
                                        onChange={handleCheckedStatusChange}
                                        className="mt-1 block w-full max-w-[200px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Tất cả</option>
                                        <option value="true">Đã xem</option>
                                        <option value="false">Chưa xem</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-4 sm:space-x-3 md:pl-2 mt-4 sm:mt-0">
                                <div className="flex-1">
                                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Từ ngày
                                    </label>
                                    <DatePicker
                                        id="fromDate"
                                        name="fromDate"
                                        selected={fromDate}
                                        onChange={handleFromDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        placeholderText="Định dạng dd/MM/yyyy"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Đến ngày
                                    </label>
                                    <DatePicker
                                        id="toDate"
                                        name="toDate"
                                        selected={toDate}
                                        onChange={handleToDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Định dạng dd/MM/yyyy"

                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TableFeedback
                    search={search}
                    isChecked={checkedStatus}
                    from={formattedFromDate}
                    to={formattedToDate}
                />
            </div>
        </>
    );
};

export default Feedbacks;
