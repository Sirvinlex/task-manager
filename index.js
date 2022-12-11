const Auth = require('./routes/auth')
const Tasks = require('./routes/tasks')

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = ('helmet');
const mongoose = require('mongoose')

const app = express();


app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
// app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.use('/api/v1/auth', Auth);
app.use('/api/v1/tasks', Tasks);

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

