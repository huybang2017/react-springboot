import AxiosAdmin from '../AxiosAdmin'; // Adjust import paths as necessary

// Fetch all inventory reports with additional filter parameters
const getInventoryReportsAPI = async ({ pageSize, pageNumber, sort, from, to, search, status }) => {
    const params = {};

    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
    if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
    if (sort !== null && sort !== undefined) params.sort = sort;
    if (from) params.from = from; // Include the parameter only if it is defined and not null
    if (to) params.to = to; // Include the parameter only if it is defined and not null
    if (search !== null && search !== undefined) params.search = search;
    if (status !== undefined && status !== null) params.status = status; // Include status only if defined

    try {
        const response = await AxiosAdmin.get('/InventoryReport', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory reports:', error);
        throw error;
    }
};

// Fetch inventory report by ID
const getInventoryReportByIdAPI = async (id) => {
    try {
        const response = await AxiosAdmin.get(`/InventoryReport/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory report by ID:', error);
        throw error;
    }
};

// Create a new inventory report
const createInventoryReportAPI = async (newInventoryReport) => {
    try {
        const response = await AxiosAdmin.post('/InventoryReport', newInventoryReport);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory report:', error);
        throw error;
    }
};

// Update inventory report
const updateInventoryReportAPI = async (id, updatedInventoryReport) => {
    try {
        const response = await AxiosAdmin.patch(`/InventoryReport/${id}`, updatedInventoryReport);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory report:', error);
        throw error;
    }
};

export {
    getInventoryReportsAPI,
    getInventoryReportByIdAPI,
    createInventoryReportAPI,
    updateInventoryReportAPI,
};
