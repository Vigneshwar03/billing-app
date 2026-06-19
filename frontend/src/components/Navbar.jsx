import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#1e293b', padding: '15px 30px',
      display: 'flex', gap: '30px', alignItems: 'center'
    }}>
      <span style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '18px' }}>
        BillingApp
      </span>
      {[['/', 'Dashboard'], ['/customers', 'Customers'],
        ['/products', 'Products'], ['/invoices', 'Invoices']
      ].map(([path, label]) => (
        <Link key={path} to={path}
          style={{ color: 'white', textDecoration: 'none' }}>
          {label}
        </Link>
      ))}
    </nav>
  );
}