export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h>0).length;
  const average = hours.reduce((a,b)=>a+b,0) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = "not good";
  if (average >= target) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

if (require.main === module) {
  const args = process.argv.slice(2).map(Number);
  const target = args.shift();
  if (!target || args.some(isNaN)) {
    console.log("malformatted parameters");
    process.exit(1);
  }
  console.log(calculateExercises(args, target));
}
