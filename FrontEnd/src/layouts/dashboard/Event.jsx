import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../reducers/eventReducer/EventSlice';
import TableEvent from '../../components/admin/events/TableEvent';
import AddEventDialog from '../../components/admin/events/AddEventDialog';
import FilterPercentDialog from '../../components/admin/events/FilterPercentDialog';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { LuLoader2 } from 'react-icons/lu';

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};


const builderQueryString = (filters, page, itemsPerPage) => {
    const params = new URLSearchParams();
    Object.entries({
        ...filters,
        pageNumber: page || '',
        pageSize: itemsPerPage || '',
    }).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });
    return params.toString();
}

const Event = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [isPercentOpen, setIsPercentOpen] = useState(false);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const events = useSelector((state) => state.events.data.content || []);
    const totalPages = useSelector((state) => state.events.data.totalPages);
    const status = useSelector((state) => state.events.status);

    const [searchValue, setSearchValue] = useState('');

    const [filterValues, setFilterValues] = useState({
        status: '',
        search: '',
        minPercent: '',
        maxPercent: '',
        eventTime: '',
        sort: ''
    });

    useEffect(() => {
        const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE);
        dispatch(fetchEvents(query));
    }, [dispatch, filterValues, currentPage]);


    const onSubmit = (e) => {
        e.preventDefault();
        setIsFilter(true);
        setFilterValues({
            ...filterValues,
            search: searchValue
        });
    }

    const handlePercentOpen = () => {
        setIsPercentOpen(!isPercentOpen);
    }

    const handleAddEventOpen = () => {
        setIsAddEventOpen(!isAddEventOpen);
    }

    const handleChangePage = (e, p) => {
        setCurrentPage(p);
    }

    const handleStatusChange = useCallback((e) => {
        setIsFilter(true);
        setFilterValues(prev => ({ ...prev, status: e.target.value }));
    }, []);

    const handleDateChange = useCallback((e) => {
        const dateValue = e.target.value ? formatDate(e.target.value) : '';
        setFilterValues(prev => ({ ...prev, eventTime: dateValue }));
    }, []);

    const handleReload = () => {
        setIsFilter(false);
        setFilterValues({
            status: '',
            search: '',
            minPercent: '',
            maxPercent: '',
            eventTime: '',
            sort: ''
        });
        setCurrentPage(DEFAULT_PAGE);
    }

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

    return (
        <div className="h-[90.2vh] space-y-4">
            <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Quản lý sự kiện
                        </h1>
                    </div>
                    <div className="w-full items-center flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="w-full flex items-center mb-4 sm:mb-0 gap-4">
                            <form className="flex gap-2 items-center justify-center w-full" onSubmit={onSubmit}>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="search"
                                        id="products-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nhập tên sự kiện"
                                        value={filterValues.search}
                                        onChange={(e) => {
                                            setFilterValues({ ...filterValues, search: e.target.value })

                                        }}
                                    />
                                </div>
                            </form>

                            <div className="w-full mb-5">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                <select
                                    name="Status"
                                    id="status"
                                    className="px-4 py-2 rounded-md w-full border border-gray-300"
                                    onChange={handleStatusChange}
                                >
                                    <option value="">Tất cả</option>
                                    <option value="true">Hiển thị</option>
                                    <option value="false">Ẩn</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center gap-2 w-72">
                                <input
                                    type="date"
                                    className="rounded-md w-full border border-gray-300 px-4 py-2"
                                    onChange={handleDateChange}
                                />
                            </div>

                            <button onClick={() => setIsPercentOpen(true)} className="bg-sky-600 hover:bg-sky-700 transition text-white rounded-lg py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-800 w-48">
                                <span className="whitespace-nowrap font-semibold">Lọc theo phần trăm</span>
                            </button>

                            <button onClick={() => setIsAddEventOpen(true)} className="bg-sky-600 hover:bg-sky-700 transition text-white rounded-lg py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-800 w-48">
                                <span className="whitespace-nowrap font-semibold">Thêm sự kiện</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TableEvent events={events || []} filterValues={filterValues} onFilterchange={setFilterValues} status={status} />

            <div className="flex items-center justify-center mb-5 mt-10 pb-10">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>

            {isAddEventOpen && <AddEventDialog isOpen={isAddEventOpen} handleOpen={handleAddEventOpen} />}
            {isPercentOpen && <FilterPercentDialog isOpen={isPercentOpen} onChangeFilterValue={setFilterValues} handleOpen={handlePercentOpen} handleReload={handleReload} />}
        </div>
    );
}

export default Event;
