const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const MONGODB_URI = 'mongodb+srv://mihaikenj_db_user:nAi6SAhWctAJpjCM@cyberfall.z47ozeb.mongodb.net/CyberFallDB?appName=cyberfall';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectat la MongoDB.'))
  .catch(err => console.error('Eroare la conectare:', err));

const FormularDataSchema = new mongoose.Schema({
  nume: { type: String, required: true },
  prenume: { type: String, required: true },
  facultate: { type: String, required: true },
  universitate: { type: String, required: true },
  telefon: { type: String, required: true },
  email: { type: String, required: true },
  sursa: { type: String },
  raspuns: { type: String },
  data_inregistrare: { type: Date, default: Date.now }
});

const FormularData = mongoose.models.FormularData || mongoose.model('FormularData', FormularDataSchema, 'FORMULAR_DATA');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/formular.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formular.html'));
});

app.post('/submit', async (req, res) => {
  const { nume, prenume, facultate, universitate, telefon, email, sursa, raspuns } = req.body;

  if (!nume || !prenume || !email) {
    return res.status(400).send('Date incomplete!');
  }

  try {
    const nouaInregistrare = new FormularData({
      nume, prenume, facultate, universitate, telefon, email, sursa, raspuns
    });

    await nouaInregistrare.save();
    
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ro">
      <head><title>Succes</title></head>
      <body>
          <h1 style="color: green;">INREGISTRARE REUSITA!</h1>
      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send(`
        <!DOCTYPE html>
        <html lang="ro">
        <head><title>Eroare</title></head>
        <body>
            <h1 style="color: red;">EROARE SERVER!</h1>
        </body>
        </html>
    `);
  }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log(`Serverul ruleaza pe http://localhost:3000`);
    });
}

module.exports = app;