import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post('/tracker', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(9527, () => {
    console.log('Server is running on port 9527');
});