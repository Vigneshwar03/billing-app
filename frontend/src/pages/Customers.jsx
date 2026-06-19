import { useState, useEffect } from 'react';
import { getCustomers, addCustomer, deleteCustomer } from '../api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    getCustomers().then(res => setCustomers(res.data));
  }, []);

  const fetchCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  const handleAdd = async () => {
    if (!form.name) return alert('Name is required');
    await addCustomer(form);
    setForm({ name: '', email: '', phone: '', address: '' });
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    await deleteCustomer(id);
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['name', 'email', 'phone', 'address'].map(field => (
          <input key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '180px' }}
          />
        ))}
        <button onClick={handleAdd}
          style={{ padding: '8px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Customer
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['Name', 'Email', 'Phone', 'Address', 'Action'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', border: '1px solid #e2e8f0' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              {['name', 'email', 'phone', 'address'].map(f => (
                <td key={f} style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{c[f]}</td>
              ))}
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
                <button onClick={() => handleDelete(c.id)}
                  style={{ padding: '5px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}