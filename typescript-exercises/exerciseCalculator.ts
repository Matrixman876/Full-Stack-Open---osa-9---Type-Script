
interface Result {
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
  const trainingDays = hours.filter(h => h > 0).length;
  const average = hours.reduce((a,b)=>a+b,0)/periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'you need to do better';

  if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, target met!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv.length > 2) {
  const args = process.argv.slice(2).map(a => Number(a));
  const target = args[0];
  const hours = args.slice(1);

  if (args.some(isNaN)) throw new Error('Invalid numbers');

  console.log(calculateExercises(hours, target));
} else {
  console.log(calculateExercises([3,0,2,4.5,0,3,1],2));
}
