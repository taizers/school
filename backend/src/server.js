require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error.middleware');
const router = require('./routes/index');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.use(errorMiddleware);

// app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
