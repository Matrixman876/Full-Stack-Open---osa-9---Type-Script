export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100) ** 2);
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

if (require.main === module) {
  const h = Number(process.argv[2]);
  const w = Number(process.argv[3]);
  if (!h || !w) {
    console.log("malformatted parameters");
    process.exit(1);
  }
  console.log(calculateBmi(h,w));
}
