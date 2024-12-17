interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter((exercise) => exercise > 0).length;
    const average = dailyExercises.reduce((acc, cur) => acc + cur, 0) / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average < target) {
      rating = 1;
      ratingDescription = 'bad';
    } else if (average === target) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    } else {
      rating = 3;
      ratingDescription = 'good';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };
  