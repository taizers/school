import express from 'express';

import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import cors = require('cors');
import path = require('path');
import cookieParser = require('cookie-parser');
import router from './routes/index';
import logger from './helpers/logger';
import morganMiddleware from './middlewares/morgan.middleware';
import errorMiddleware from './middlewares/error.middleware';
import { customResponse } from './helpers/responce';
import { createUser } from './services/db/auth.services';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors({ 
//   origin: 'http://localhost:3000', 
//   credentials: true, 
//   methods: ["PUT", "OPTIONS", "GET", "DELETE", "POST"],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
// }));

// app.use(cors({origin:true,credentials: true}));

// app.use(function(req, res, next) {
//   console.log(req);
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'PUT');
//   res.header('Access-Control-Max-Age', '86400');
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//      next();
// });


app.use(morganMiddleware);

app.use('/api/v1', router);
app.use(errorMiddleware);

app.post('/add-admin', async (req, res) => {
  const user = await createUser({
    username: 'Александр Сачок',
    role: 'admin',
    activationkey: '1',
  });
  res.send(user);
});

//global error handler

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req: express.Request, res: express.Response) =>
  customResponse(res, 404, { code: 404, message: 'Not Found' })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
