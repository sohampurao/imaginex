import express from 'express';
import dotenv from 'dotenv';
import data from './data/CarouselData.js';
import cors from 'cors';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/carousel', (req, res) => {
  res.send(data.items);
});

app.get('/', (req, res) => {
  res.send('Server is active!');
});

// represents the port on which sever will run
const port = 5000;
app.listen(port, () => {
  console.log(`Serve at: http://localhost:${port}`);
});
