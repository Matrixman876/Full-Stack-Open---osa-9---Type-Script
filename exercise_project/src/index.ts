
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const nums = daily_exercises.map(n => Number(n));
  if (nums.some(n => isNaN(n))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const periodLength = nums.length;
  const trainingDays = nums.filter(n => n > 0).length;
  const average = nums.reduce((a,b)=>a+b,0) / periodLength;

  let rating = 1;
  let ratingDescription = "bad";
  const success = average >= Number(target);

  if (average >= Number(target)) { rating = 3; ratingDescription = "great"; }
  else if (average >= Number(target) * 0.75) { rating = 2; ratingDescription = "not too bad"; }

  return res.json({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: Number(target),
    average
  });
});

app.listen(3003, () => {
  console.log('Server running on port 3003');
});
