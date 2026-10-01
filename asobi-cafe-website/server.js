const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'ASOBI Cafe backend', time: new Date().toISOString() });
});

app.get('/api/menu', (req, res) => {
  res.json([
    { name: 'ASOBI Signature Cold Coffee', price: 149, category: 'coffee' },
    { name: 'Caramel Latte', price: 169, category: 'coffee' },
    { name: 'Hazelnut Mocha', price: 189, category: 'coffee' },
    { name: 'Classic Masala Fries', price: 129, category: 'bites' },
    { name: 'Loaded Cheese Fries', price: 179, category: 'bites' },
    { name: 'Crispy Paneer Wrap', price: 199, category: 'bites' },
    { name: 'Chocolate Brownie', price: 139, category: 'dessert' },
    { name: 'Oreo Shake', price: 199, category: 'dessert' }
  ]);
});

app.post('/api/contact', (req, res) => {
  const { name, phone, message } = req.body || {};
  if (!name || !phone || !message) return res.status(400).json({ ok: false, message: 'Name, phone and message are required.' });
  const contactsFile = path.join(DATA_DIR, 'messages.json');
  let messages = [];
  try { messages = JSON.parse(fs.readFileSync(contactsFile, 'utf8')); } catch {}
  messages.push({ id: Date.now(), name: String(name).trim(), phone: String(phone).trim(), message: String(message).trim(), createdAt: new Date().toISOString() });
  fs.writeFileSync(contactsFile, JSON.stringify(messages, null, 2));
  res.status(201).json({ ok: true, message: 'Message sent successfully.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`ASOBI Cafe running on port ${PORT}`));
