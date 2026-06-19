const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, customers(name)')
    .order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { invoice_number, customer_id, items, total } = req.body;

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert([{ invoice_number, customer_id, total }])
    .select();
  if (error) return res.status(400).json({ error });

  const invoiceId = invoice[0].id;
  const itemsWithId = items.map(item => ({ ...item, invoice_id: invoiceId }));
  await supabase.from('invoice_items').insert(itemsWithId);

  res.json(invoice[0]);
});

module.exports = router;