import { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', unit: 'pcs' });

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleAdd = async () => {
    if (!form.name || !form.price) return alert('Name and price are required');
    await addProduct(form);
    setForm({ name: '', price: '', unit: 'pcs' });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input placeholder="Product name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '180px' }} />
        <input placeholder="Price" value={form.price} type="number"
          onChange={e => setForm({ ...form, price: e.target.value })}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '120px' }} />
        <input placeholder="Unit (pcs, kg...)" value={form.unit}
          onChange={e => setForm({ ...form, unit: e.target.value })}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '130px' }} />
        <button onClick={handleAdd}
          style={{ padding: '8px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Product
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['Name', 'Price', 'Unit', 'Action'].map(h => (
              <th key={h} style={{ padding: '10px', textAlign: 'left', border: '1px solid #e2e8f0' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{p.name}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>₹{p.price}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{p.unit}</td>
              <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
                <button onClick={() => handleDelete(p.id)}
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