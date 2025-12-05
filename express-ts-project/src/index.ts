import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const h = Number(height);
  const w = Number(weight);
  if (!h || !w) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  return res.json({ weight: w, height: h, bmi: calculateBmi(h,w) });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
