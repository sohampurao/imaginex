import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('Server is active!');
});

// represents the port on which sever will run
const port = 4000;
app.listen(port, () => {
  console.log(`Serve at: http://localhost:${port}`);
});
