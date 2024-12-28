import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js'; // Import routes
// import userRoutes from './routes/userRoutes.js'; // Import user routes
import sequelize from './config/sequelize.js';
// import impRoute from './routes/impRoute.js';
import dotenv from 'dotenv';
import './model/associations.js'; // Import associations to ensure they are defined


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api', routes); // Use the main routes
// app.use('/api/users', userRoutes); // Use the user routes
// app.use('/api', impRoute);

sequelize.sync().then(() => {
    app.listen(8081, () => {
        console.log('Server is running on port 8081');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});