import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getCustomers = () => API.get('/customers');
export const addCustomer = (data) => API.post('/customers', data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

export const getProducts = () => API.get('/products');
export const addProduct = (data) => API.post('/products', data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getInvoices = () => API.get('/invoices');
export const addInvoice = (data) => API.post('/invoices', data);