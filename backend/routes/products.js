const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('products').insert([req.body]).select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('products').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error });
  res.json({ success: true });
});

module.exports = router;