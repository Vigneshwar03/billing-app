import { useState, useEffect } from 'react';
import { getInvoices, getCustomers, getProducts, addInvoice } from '../api';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1, price: 0 }]);

  useEffect(() => {
    getInvoices().then(res => setInvoices(res.data));
    getCustomers().then(res => setCustomers(res.data));
    getProducts().then(res => setProducts(res.data));
  }, []);

  const fetchInvoices = async () => {
    const res = await getInvoices();
    setInvoices(res.data);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    if (field === 'product_id') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) updated[index].price = product.price;
    }
    setItems(updated);
  };

  const addItem = () => setItems([...items, { product_id: '', quantity: 1, price: 0 }]);

  const handleSubmit = async () => {
    if (!customerId) return alert('Select a customer');
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const invoice_number = 'INV-' + Date.now();
    await addInvoice({ invoice_number, customer_id: customerId, items, total });
    setCustomerId('');
    setItems([{ product_id: '', quantity: 1, price: 0 }]);
    fetchInvoices();
  };

  return (
    <div>
      <h2>Invoices</h2>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Create New Invoice</h3>
        <select value={customerId} onChange={e => setCustomerId(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px', width: '250px' }}>
          <option value="">Select Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <select value={item.product_id} onChange={e => handleItemChange(i, 'product_id', e.target.value)}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}>
              <option value="">Select Product</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>)}
            </select>
            <input type="number" value={item.quantity} min="1"
              onChange={e => handleItemChange(i, 'quantity', parseInt(e.target.value))}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '80px' }} />
            <span style={{ padding: '8px', color: '#64748b' }}>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={addItem}
            style={{ padding: '8px 16px', background: '#64748b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            + Add Item
          </button>
          <button onClick={handleSubmit}
            style={{ padding: '8px 20px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Create Invoice
          </button>
        </div>
      </div>
      <h3>All Invoices</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['Invoice No', 'Customer', 'Total', 'Status', 'Date'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', border: '1px solid #e2e8f0' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{inv.invoice_number}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{inv.customers?.name}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>₹{inv.total}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{
                  padding: '3px 10px',
                  background: inv.status === 'paid' ? '#dcfce7' : '#fef9c3',
                  color: inv.status === 'paid' ? '#16a34a' : '#ca8a04',
                  borderRadius: '20px', fontSize: '13px'
                }}>
                  {inv.status}
                </span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
                {new Date(inv.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}