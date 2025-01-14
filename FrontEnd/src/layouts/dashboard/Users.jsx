import TableUser from '../../components/admin/user/TableUser';
import FormUser from '../../components/admin/user/FormUser';
import { useState } from 'react';

const Users = () => {
    const [openModal, setOpenModal] = useState(true);
    const [search, setSearch] = useState(''); // Local state for search input

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div className="h-[90.2vh]">
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Danh sách tài khoản trên hệ thống
                            </h1>
                        </div>
                        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <form className="sm:pr-3" action="#" method="GET">
                                    <label htmlFor="products-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                        <input
                                            type="text"
                                            name="email"
                                            id="products-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search for email"
                                            value={search}
                                            onChange={handleSearchChange} // Handle input change
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pass the search term as a prop */}
                <TableUser search={search} />
                <FormUser openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </>
    );
};

export default Users;
