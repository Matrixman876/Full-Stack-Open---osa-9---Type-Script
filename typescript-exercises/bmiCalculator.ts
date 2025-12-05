
export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100) ** 2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

if (process.argv.length > 2) {
  const h = Number(process.argv[2]);
  const w = Number(process.argv[3]);
  if (isNaN(h) || isNaN(w)) throw new Error('Invalid numbers');
  console.log(calculateBmi(h, w));
} else {
  console.log(calculateBmi(180, 74));
}
